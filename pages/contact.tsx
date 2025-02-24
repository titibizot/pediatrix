// pages/contact.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Background from "../components/Background";
import Footer from "../components/Footer";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/contact", formData);
      setStatus("Message envoyé avec succès.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Erreur lors de l'envoi du message.");
    }
  };

  return (
    <Background backgroundImage="/fonddiagnostix.jpeg">
      {/* Barre de navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link href="/" legacyBehavior>
              <a className="flex items-center">
                <Image
                  src="/logodiagnostix.jpg"
                  alt="Logo Diagnostix"
                  width={60}
                  height={60}
                  className="object-cover rounded-full"
                />
                <span className="text-2xl font-bold text-blue-700 ml-2">Diagnostix</span>
              </a>
            </Link>
          </div>
          <div className="hidden sm:flex">
            <Link href="/" legacyBehavior>
              <a className="text-sm font-medium text-gray-500 hover:text-gray-700">
                Retour à l'accueil
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-6 p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Contact</h1>
        <p className="mb-6 text-gray-700">
          Vous avez quelque chose à partager avec nous, deux solutions:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Utiliser la boîte de contact ci-dessous.</li>
          <li>Ou envoyer directement un mail à : <span className="font-bold">diagnostixgame@gmail.com</span></li>
        </ul>

        {/* Formulaire de contact */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nom :</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Message :</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows={5}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Envoyer
          </button>
        </form>

        {status && <p className="mt-4 text-center text-green-600">{status}</p>}
      </div>

      <Footer />
    </Background>
  );
}
