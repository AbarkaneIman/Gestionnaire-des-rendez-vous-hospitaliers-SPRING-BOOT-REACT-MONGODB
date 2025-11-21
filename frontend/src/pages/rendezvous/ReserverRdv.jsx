import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReserverRdv() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState([
    "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00",
    "14:00", "14:30", "15:00",
    "15:30", "16:00"
  ]);
  const [selectedTime, setSelectedTime] = useState("");

  // Load doctors from backend (or real API later)
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch(() => {
        // Fake doctors if backend not ready
        setDoctors([
          { id: "1", nom: "Dr Ahmed", specialite: "Cardiologue" },
          { id: "2", nom: "Dr Salma", specialite: "Dermatologue" },
          { id: "3", nom: "Dr Youssef", specialite: "Dentiste" },
        ]);
      });
  }, []);

  const handleSubmit = () => {
    if (!selectedDoctor || !date || !selectedTime) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const rdv = {
      doctorId: selectedDoctor,
      date: date,
      time: selectedTime,
      patientId: "TEMP_PATIENT", // réel après login backend
    };

    axios
      .post("http://localhost:8080/api/appointments", rdv)
      .then(() => {
        alert("Rendez-vous réservé avec succès !");
        navigate("/patient-home");
      })
      .catch(() => alert("Erreur lors de la réservation"));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 600,
          borderRadius: "20px",
          background: "rgba(255,255,255,0.9)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={3}
          color="#1e3c72"
        >
          Réserver un Rendez-vous
        </Typography>

        {/* Doctor selection */}
        <TextField
          select
          label="Choisir un médecin"
          fullWidth
          sx={{ mb: 3 }}
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          {doctors.map((d) => (
            <MenuItem value={d.id} key={d.id}>
              {d.nom} — {d.specialite}
            </MenuItem>
          ))}
        </TextField>

        {/* Date selection */}
        <TextField
          fullWidth
          type="date"
          label="Date"
          sx={{ mb: 3 }}
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          inputProps={{
            min: new Date().toISOString().split("T")[0], // prevent past
          }}
        />

        {/* Time slots */}
        <Typography mb={1} fontWeight="bold" color="#2a5298">
          Choisir l'heure :
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {times.map((t) => (
            <Grid item xs={4} key={t}>
              <Button
                fullWidth
                variant={selectedTime === t ? "contained" : "outlined"}
                sx={{
                  py: 1,
                  borderRadius: "10px",
                  borderColor: "#1e3c72",
                  color: selectedTime === t ? "white" : "#1e3c72",
                  background:
                    selectedTime === t
                      ? "linear-gradient(45deg, #1e3c72, #2a5298)"
                      : "transparent",
                }}
                onClick={() => setSelectedTime(t)}
              >
                {t}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Confirm */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            borderRadius: "12px",
            fontSize: "18px",
            background: "linear-gradient(45deg, #1e3c72, #2a5298)",
          }}
          onClick={handleSubmit}
        >
          Confirmer le Rendez-vous
        </Button>
      </Paper>
    </Box>
  );
}
