import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import axios from "axios";

export default function MesRdv() {
  const [rdvs, setRdvs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appointments/patient/12345") 
      .then((res) => setRdvs(res.data))
      .catch(() => {
        // Fake data until backend ready
        setRdvs([
          {
            id: "1",
            doctorName: "Dr Ahmed",
            specialite: "Cardiologue",
            date: "2025-11-22",
            time: "10:00",
            status: "Confirmé",
          },
          {
            id: "2",
            doctorName: "Dr Salma",
            specialite: "Dermatologue",
            date: "2025-11-25",
            time: "14:00",
            status: "En attente",
          },
        ]);
      });
  }, []);

  const cancelRdv = (id) => {
    if (window.confirm("Voulez-vous annuler ce rendez-vous ?")) {
      axios
        .delete(`http://localhost:8080/api/appointments/${id}`)
        .then(() => setRdvs(rdvs.filter((r) => r.id !== id)))
        .catch(() => alert("Erreur lors de l'annulation."));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="white"
        mb={4}
      >
        Mes Rendez-vous
      </Typography>

      <Grid container spacing={3}>
        {rdvs.map((rdv) => (
          <Grid item xs={12} md={6} key={rdv.id}>
            <Paper
              elevation={8}
              sx={{
                padding: 3,
                borderRadius: "18px",
                background: "rgba(255,255,255,0.9)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="#2c3e50">
                {rdv.doctorName} – {rdv.specialite}
              </Typography>

              <Typography>Date : {rdv.date}</Typography>
              <Typography>Heure : {rdv.time}</Typography>

              <Chip
                label={rdv.status}
                sx={{
                  mt: 2,
                  background:
                    rdv.status === "Confirmé"
                      ? "green"
                      : rdv.status === "En attente"
                      ? "orange"
                      : "red",
                  color: "white",
                  fontWeight: "bold",
                }}
              />

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 3,
                  borderColor: "red",
                  color: "red",
                }}
                onClick={() => cancelRdv(rdv.id)}
              >
                Annuler le rendez-vous
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
