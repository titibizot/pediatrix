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
      await axios.post("/api/contact", formData);
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
          <div className="flex items-center space-x-4">
            <Link href="/" legacyBehavior>
              <a className="flex items-center cursor-pointer focus:outline-none focus:ring">
                <Image
                  src="/logodiagnostix.jpg"
                  alt="Logo Diagnostix"
                  width={60}
                  height={60}
                  className="object-cover rounded-full"
                />
                <span className="text-3xl font-bold text-blue-900 ml-2">Diagnostix</span>
              </a>
            </Link>
          </div>
          <div className="hidden sm:flex">
            <Link href="/" legacyBehavior>
              <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                Retour à l'accueil
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 my-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-900">Contact</h1>
        <p className="mb-6 text-gray-800">
          Vous avez quelque chose à partager avec nous ? Vous disposez de deux solutions :
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-800">
          <li>Utiliser la boîte de contact ci-dessous.</li>
          <li>
            Ou envoyer directement un mail à : <span className="font-bold">diagnostixgame@gmail.com</span>
          </li>
        </ul>

        {/* Formulaire de contact */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-800 mb-1">
              Nom :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring focus:border-blue-800"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-800 mb-1">
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring focus:border-blue-800"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-800 mb-1">
              Message :
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring focus:border-blue-800"
              rows={5}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring"
          >
            Envoyer
          </button>
        </form>

        {status && <p className="mt-4 text-center text-green-700 font-medium">{status}</p>}
      </div>

      <Footer />
    </Background>
  );
}
