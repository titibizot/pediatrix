# Dockerfile

# Utiliser une image Python légère
FROM python:3.10-slim

# Installer des dépendances système (pour PyTorch, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential wget curl git && \
    rm -rf /var/lib/apt/lists/*

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier les dépendances Python
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste des fichiers (app.py, templates, diseases.json, etc.)
COPY . .

# Exposer le port 8080 (utilisé par app.py)
EXPOSE 8080

# Lancer l'application Flask
CMD ["python", "app.py"]
