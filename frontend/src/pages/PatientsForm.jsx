import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function PatientsForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      axios
        .put(`http://localhost:8080/api/patients/${id}`, form)
        .then(() => navigate("/patients"));
    } else {
      axios
        .post("http://localhost:8080/api/patients", form)
        .then(() => navigate("/patients"));
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-green-600">
          {isEdit ? "📝 Modifier Patient" : "➕ Ajouter Patient"}
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            className="border p-3 rounded-lg"
            name="firstName"
            placeholder="Prénom"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            className="border p-3 rounded-lg"
            name="lastName"
            placeholder="Nom"
            value={form.lastName}
            onChange={handleChange}
          />
          <input
            className="border p-3 rounded-lg"
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            className="border p-3 rounded-lg"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="border p-3 rounded-lg"
            name="address"
            placeholder="Adresse"
            value={form.address}
            onChange={handleChange}
          />

          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-bold shadow">
            {isEdit ? "Enregistrer" : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
}
