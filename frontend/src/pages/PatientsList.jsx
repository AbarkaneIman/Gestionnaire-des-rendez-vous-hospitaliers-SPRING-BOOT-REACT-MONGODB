import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function PatientsList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          👨‍⚕️ Liste des Patients
        </h1>

        <button
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg mb-6 font-semibold shadow"
          onClick={() => navigate("/patients/add")}
        >
          + Ajouter Patient
        </button>

        <table className="w-full border shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-3">Nom</th>
              <th className="p-3">Prénom</th>
              <th className="p-3">Téléphone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Aucun patient trouvé...
                </td>
              </tr>
            ) : (
              patients.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{p.lastName}</td>
                  <td className="p-3">{p.firstName}</td>
                  <td className="p-3">{p.phone}</td>
                  <td className="p-3">{p.email}</td>
                  
                  <td className="p-3 flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => navigate(`/patients/${p.id}/edit`)}
                    >
                      Modifier
                    </button>

                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() =>
                        axios.delete(`http://localhost:8080/api/patients/${p.id}`)
                          .then(() => setPatients(patients.filter(x => x.id !== p.id)))
                      }
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
