// components/TrainingYearModal.tsx
import React, { useEffect } from "react";

export type TrainingYearOption =
  | "DCEM"
  | "DFASM1"
  | "DFASM2"
  | "DFASM3"
  | "Internes"
  | "Docteur"
  | "Autre";

interface TrainingYearModalProps {
  onSave: (year: TrainingYearOption) => void;
}

export default function TrainingYearModal({ onSave }: TrainingYearModalProps) {
  // Affichage du log lors du rendu du composant
  useEffect(() => {
    console.log("Modal affiché");
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
          Sélectionnez votre année de formation
        </h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Vous pouvez ici récupérer la valeur sélectionnée et appeler onSave()
          const form = e.target as HTMLFormElement;
          const selected = (form.elements.namedItem("trainingYear") as HTMLSelectElement).value;
          onSave(selected as TrainingYearOption);
        }}>
          <label htmlFor="trainingYear" className="block text-gray-800 mb-2">
            Année de formation :
          </label>
          <select
            id="trainingYear"
            name="trainingYear"
            defaultValue="DCEM"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:border-blue-800"
          >
            <option value="DCEM">DCEM</option>
            <option value="DFASM1">DFASM1</option>
            <option value="DFASM2">DFASM2</option>
            <option value="DFASM3">DFASM3</option>
            <option value="Internes">Internes</option>
            <option value="Docteur">Docteur</option>
            <option value="Autre">Autre</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}
