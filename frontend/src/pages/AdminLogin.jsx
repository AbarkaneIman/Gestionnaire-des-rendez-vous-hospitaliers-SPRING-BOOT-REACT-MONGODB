import React, { useState } from "react";
import { Button, Typography, Box, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Veuillez remplir tous les champs !");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate("/admin-home");
      } else {
        setErrorMsg(data.message || "Erreur inconnue");
      }

    } catch (error) {
      setErrorMsg("Erreur de connexion au serveur : " + error.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: 'url("/backgd2.jpg")',
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 4,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: 5,
          borderRadius: 5,
          width: 450,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#037e8bff" }}>
          BIENVENUE
        </Typography>

        <Typography sx={{ mb: 3, color: "#333" }}>
          Veuillez vous identifier pour accéder à votre espace
        </Typography>

        {errorMsg && (
          <Typography sx={{ color: "red", mb: 2 }}>{errorMsg}</Typography>
        )}

        <Box sx={{ textAlign: "left" }}>
          <TextField
            label="Nom D'utilisateur"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            fontWeight: "bold",
            py: 1.2,
            background: "linear-gradient(45deg, #0077b6, #00b4d8)",
            color: "white",
            borderRadius: 3,
            "&:hover": { background: "linear-gradient(45deg, #005f8a, #0092ad)" },
          }}
        >
          S'identifier
        </Button>
      </Paper>
    </Box>
  );
}
