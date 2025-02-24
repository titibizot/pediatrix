// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }
  
  // Configurez le transporteur SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,      // Exemple: smtp.gmail.com
    port: Number(process.env.EMAIL_PORT), // Exemple: 587
    secure: process.env.EMAIL_PORT === "465", // true si 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  const mailOptions = {
    from: `"Diagnostix" <${process.env.EMAIL_USER}>`,
    to: "diagnostixgame@gmail.com", // Adresse de destination
    subject: `Nouveau message de ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
}
