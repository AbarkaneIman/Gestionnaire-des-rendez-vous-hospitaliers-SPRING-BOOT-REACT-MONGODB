import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreerComptePatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    cin: "",
    age: "",
    address: "",
    
    sexe: "",
    maladie: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/patients/register", form)
      .then(() => navigate("/patient-login"))
      .catch((err) => console.error(err));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
        padding: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 700,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color="#00796b"
          mb={3}
        >
          Créer un Compte Patient
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Nom */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="firstName"
                label="Prénom"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Prénom */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Nom"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Mot de passe */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Téléphone */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="phone"
                label="Téléphone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* CIN */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="cin"
                label="CIN"
                value={form.cin}
                onChange={handleChange}
              />
            </Grid>

            {/* Age */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="age"
                label="Âge"
                type="number"
                value={form.age}
                onChange={handleChange}
              />
            </Grid>

            {/* Sexe */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="sexe"
                label="Sexe (H/F)"
                value={form.sexe}
                onChange={handleChange}
              />
            </Grid>

            {/* Adresse */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Adresse"
                value={form.address}
                onChange={handleChange}
              />
            </Grid>

            {/* Maladie */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="maladie"
                label="Maladie / Antécédents médicaux"
                multiline
                rows={4}
                value={form.maladie}
                onChange={handleChange}
              />
            </Grid>

            {/* Button */}
            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ backgroundColor: "#00796b", px: 6, py: 1.5 }}
              >
                Créer le compte
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
