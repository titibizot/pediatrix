# app.py

from flask import Flask, request, session, render_template, redirect, url_for, flash
import random
import numpy as np
import json
import re
from datetime import date, datetime
from sentence_transformers import SentenceTransformer
import os

app = Flask(__name__)
app.secret_key = 'votre_cle_secrete'  # Remplacez par une clé sécurisée ou utilisez une variable d'environnement

# Pour le compteur global en mode Challenge (prototype en mémoire)
challenge_success_count = {}

# Charger la base de données depuis le fichier diseases.json
with open("diseases.json", "r", encoding="utf-8") as f:
    diseases = json.load(f)

# Charger le modèle SentenceTransformer adapté pour le français
embedding_model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

# --- Fonctions utilitaires ---

def normalize_text(text):
    """
    Convertit le texte en minuscules, retire la ponctuation,
    et pour chaque mot (si longueur > 3) :
      - Si le mot se termine par 'ches', retire le dernier caractère (ex : 'hanches' -> 'hanche')
      - Sinon, s'il se termine par 's', retire le dernier caractère.
    """
    text = text.lower().strip()
    text = re.sub(r'[^\w\s]', '', text)
    words = text.split()
    normalized_words = []
    for w in words:
        if len(w) > 3:
            if w.endswith("ches"):
                normalized_words.append(w[:-1])
            elif w.endswith("s"):
                normalized_words.append(w[:-1])
            else:
                normalized_words.append(w)
        else:
            normalized_words.append(w)
    return " ".join(normalized_words)

def embed_text_fn(text):
    """Retourne l'embedding du texte après normalisation."""
    norm_text = normalize_text(text)
    return embedding_model.encode(norm_text)

def get_similarity_category(guess, target_name, target_keywords, semantic_threshold=0.5):
    """
    Catégorise la proposition (guess) par rapport au nom et aux mots-clés de la maladie.
    
    - Retourne ("green", 1.0) si la proposition normalisée correspond exactement au nom normalisé (bonne réponse).
    - Retourne ("light-green", 0.9) si la proposition correspond exactement à l'un des mots-clés normalisés.
    - Sinon, calcule la moyenne des similarités sémantiques entre l'embedding du guess et ceux de chaque mot-clé.
      Si la moyenne >= semantic_threshold, retourne ("yellow", moyenne_sim), sinon ("red", moyenne_sim).
    """
    norm_guess = normalize_text(guess)
    norm_target_name = normalize_text(target_name)
    norm_keywords = [normalize_text(kw) for kw in target_keywords.split(',')]
    
    if norm_guess == norm_target_name:
        return "green", 1.0
    if norm_guess in norm_keywords:
        return "light-green", 0.9

    guess_emb = embed_text_fn(guess)
    sims = []
    for kw in norm_keywords:
        kw_emb = embed_text_fn(kw)
        sim = np.dot(guess_emb, kw_emb) / (np.linalg.norm(guess_emb) * np.linalg.norm(kw_emb))
        sims.append(sim)
    avg_sim = np.mean(sims) if sims else 0.0
    if avg_sim >= semantic_threshold:
        return "yellow", avg_sim
    else:
        return "red", avg_sim

def calculate_time_left():
    """Calcule le temps restant en mode Libre si le timer est activé."""
    if "libre_total_time" in session and "libre_start_time" in session:
        total_time = session["libre_total_time"]
        elapsed = int(datetime.now().timestamp()) - session["libre_start_time"]
        return max(total_time - elapsed, 0)
    else:
        return None

def record_stats(mode, attempts, time_taken=None):
    """Enregistre les statistiques d'une partie dans la session."""
    stats = session.get("stats", [])
    entry = {
        "mode": mode,
        "attempts": attempts,
        "timestamp": datetime.now().isoformat()
    }
    if time_taken is not None:
        entry["time_taken"] = time_taken
    stats.append(entry)
    session["stats"] = stats

# --- Routes de l'application ---

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/settings", methods=["GET", "POST"])
def settings():
    if request.method == "POST":
        use_timer = request.form.get("use_timer") == "on"
        timer_duration = int(request.form.get("timer_duration", 600))
        session["use_timer"] = use_timer
        session["timer_duration"] = timer_duration
        flash("Paramètres mis à jour.", "info")
        return redirect(url_for("home"))
    return render_template("settings.html",
                           use_timer=session.get("use_timer", False),
                           timer_duration=session.get("timer_duration", 600))

@app.route("/stats")
def stats_page():
    stats_data = session.get("stats", [])
    total_games = len(stats_data)
    total_attempts = sum(s.get("attempts", 0) for s in stats_data)
    avg_attempts = total_attempts / total_games if total_games > 0 else 0
    libre_stats = [s for s in stats_data if s.get("mode") == "libre" and "time_taken" in s]
    total_time = sum(s.get("time_taken", 0) for s in libre_stats)
    libre_games = len(libre_stats)
    avg_time = total_time / libre_games if libre_games > 0 else 0
    return render_template("stats.html", stats=stats_data, total_games=total_games,
                           avg_attempts=avg_attempts, avg_time=avg_time)

@app.route("/challenge", methods=["GET", "POST"])
def challenge_mode():
    today_str = date.today().isoformat()
    if "challenge_target" not in session or session.get("challenge_date") != today_str:
        index_val = hash(today_str) % len(diseases)
        target = diseases[index_val]
        session["challenge_target"] = target
        session["challenge_date"] = today_str
        session["challenge_attempts"] = []
        session.pop("challenge_hints", None)
    else:
        target = session["challenge_target"]
    
    word_count = len(target["name"].split())
    hints = session.get("challenge_hints")
    if request.args.get("show_hint") and not hints:
        keywords_list = [kw.strip() for kw in target["keywords"].split(',')]
        hints = random.sample(keywords_list, 2) if len(keywords_list) >= 2 else keywords_list
        session["challenge_hints"] = hints

    message = ""
    if request.method == "POST":
        guess = request.form.get("guess", "").strip()
        category, sim_val = get_similarity_category(guess, target["name"], target["keywords"], semantic_threshold=0.5)
        attempts = session.get("challenge_attempts", [])
        attempts.append({"guess": guess, "similarity": float(sim_val), "category": category})
        session["challenge_attempts"] = attempts
        if category == "green":
            message = f"Bravo ! Vous avez trouvé la maladie : {target['name']} en {len(attempts)} tentative(s). "
            if len(attempts) < 5:
                message += "Exceptionnel 😄"
            elif len(attempts) < 10:
                message += "Excellent 😀"
            elif len(attempts) < 15:
                message += "Bon score 🙂"
            elif len(attempts) < 20:
                message += "Pas mal 😐"
            else:
                message += "Tu feras mieux la prochaine fois 😞"
            message += f' Consultez la fiche détaillée <a href="{target["link"]}" target="_blank">ici</a>.'
            record_stats("challenge", len(attempts))
            challenge_success_count[today_str] = challenge_success_count.get(today_str, 0) + 1
        else:
            message = "Proposition enregistrée."
    sorted_attempts = sorted(session.get("challenge_attempts", []), key=lambda x: x["similarity"], reverse=True)
    success_count = challenge_success_count.get(today_str, 0)
    return render_template("challenge.html", message=message, attempts=sorted_attempts,
                           target=target, word_count=word_count, hints=hints, success_count=success_count)

@app.route("/libre", methods=["GET", "POST"])
def libre_mode():
    use_timer = session.get("use_timer", False)
    timer_duration = session.get("timer_duration", 600)
    if use_timer:
        if "libre_start_time" not in session:
            session["libre_start_time"] = int(datetime.now().timestamp())
        time_left = max(timer_duration - (int(datetime.now().timestamp()) - session["libre_start_time"]), 0)
    else:
        time_left = None

    if "libre_target" not in session:
        target = random.choice(diseases)
        session["libre_target"] = target
        session["libre_attempts"] = []
        session.pop("libre_hints", None)
        if use_timer:
            session["libre_start_time"] = int(datetime.now().timestamp())
    else:
        target = session["libre_target"]

    word_count = len(target["name"].split())
    hints = session.get("libre_hints")
    if request.args.get("show_hint") and not hints:
        keywords_list = [kw.strip() for kw in target["keywords"].split(',')]
        hints = random.sample(keywords_list, 2) if len(keywords_list) >= 2 else keywords_list
        session["libre_hints"] = hints

    message = ""
    if request.method == "POST":
        guess = request.form.get("guess", "").strip()
        category, sim_val = get_similarity_category(guess, target["name"], target["keywords"], semantic_threshold=0.5)
        attempts = session.get("libre_attempts", [])
        attempts.append({"guess": guess, "similarity": float(sim_val), "category": category})
        session["libre_attempts"] = attempts
        if category == "green":
            message = f"Bravo ! Vous avez trouvé la maladie : {target['name']} en {len(attempts)} tentative(s). "
            if len(attempts) < 5:
                message += "Exceptionnel 😄"
            elif len(attempts) < 10:
                message += "Excellent 😀"
            elif len(attempts) < 15:
                message += "Bon score 🙂"
            elif len(attempts) < 20:
                message += "Pas mal 😐"
            else:
                message += "Tu feras mieux la prochaine fois 😞"
            message += f' Consultez la fiche détaillée <a href="{target["link"]}" target="_blank">ici</a>.'
            end_time = int(datetime.now().timestamp())
            start_time = session.get("libre_start_time", end_time)
            time_taken = end_time - start_time
            record_stats("libre", len(attempts), time_taken)
            # Réinitialiser pour un nouveau tour
            target = random.choice(diseases)
            session["libre_target"] = target
            session["libre_attempts"] = []
            session.pop("libre_hints", None)
            word_count = len(target["name"].split())
            if use_timer:
                session["libre_start_time"] = int(datetime.now().timestamp())
            time_left = timer_duration if use_timer else None
            return render_template("libre.html", message=message, attempts=[], target=target,
                                   word_count=word_count, hints=None, time_left=time_left, timer_active=use_timer)
        else:
            message = "Proposition enregistrée."
    sorted_attempts = sorted(session.get("libre_attempts", []), key=lambda x: x["similarity"], reverse=True)
    return render_template("libre.html", message=message, attempts=sorted_attempts,
                           target=target, word_count=word_count, hints=hints, time_left=time_left, timer_active=use_timer)

@app.route("/reveal_libre")
def reveal_libre():
    target = session.get("libre_target")
    if target:
        message = f"La réponse est : {target['name']}. Consultez la fiche détaillée <a href='{target['link']}' target='_blank'>ici</a>."
        return render_template("libre.html", message=message, attempts=session.get("libre_attempts", []),
                               target=target, word_count=len(target["name"].split()), hints=session.get("libre_hints"), time_left=0, timer_active=True)
    else:
        return redirect(url_for("libre_mode"))

@app.route("/reset")
def reset():
    session.pop("challenge_target", None)
    session.pop("challenge_attempts", None)
    session.pop("challenge_date", None)
    session.pop("challenge_hints", No
