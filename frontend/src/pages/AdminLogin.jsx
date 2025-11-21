import React, { useState } from "react";
import { 
  Button, Typography, Box, Paper, TextField 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [patientId, setPatientId] = useState("");

  const handleLogin = () => {
    if (!email || !patientId) {
      alert("Veuillez remplir tous les champs !");
    } else {
      navigate("/admin-home"); 
    }
  };

  const goToRegister = () => {
    navigate("/register"); // Tu créeras cette page plus tard
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: 'url("/backgd2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#037e8bff",
          }}
        >
          BIENVENUE
        </Typography>

        <Typography sx={{ mb: 3, color: "#333" }}>
          Veuillez vous identifier pour accéder à votre espace
        </Typography>

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
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
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
            "&:hover": {
              background: "linear-gradient(45deg, #005f8a, #0092ad)",
            },
          }}
        >
          S'identifier
        </Button>

       
      </Paper>  
    
    </Box>
  );
}
