import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PatientLogin from "./pages/PatientLogin";
import  AdminLogin from "./pages/AdminLogin";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";

import CreerComptePatient from "./pages/CreerComptePatient";
import PatientHome from "./pages/PatientHome";
import ReserverRdv from "./pages/rendezvous/ReserverRdv";
import MesRdv from "./pages/rendezvous/MesRdv";
import HomeAdmin from "./pages/HomeAdmin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/admin-home" element={<HomeAdmin />} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/register" element={<CreerComptePatient />} />
        <Route path="/patient-home" element={<PatientHome />} />
        <Route path="/patient-rdv" element={<ReserverRdv />} />
        <Route path="/mes-rdv" element={<MesRdv />} />



      </Routes>
    </BrowserRouter>
  );
}
export default App;
