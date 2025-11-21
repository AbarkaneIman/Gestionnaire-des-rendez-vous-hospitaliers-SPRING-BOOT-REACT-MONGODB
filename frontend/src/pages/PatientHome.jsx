import React from "react";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";

export default function PatientHome() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 5,
          width: "100%",
          maxWidth: 750,
          borderRadius: "25px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          textAlign: "center",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textShadow: "0 0 12px rgba(255,255,255,0.7)",
          }}
        >
          Bienvenue dans votre Espace Patient
        </Typography>

        <Grid container spacing={3}>
          {/* Profil */}
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              sx={{
                py: 3,
                borderRadius: "18px",
                background: "linear-gradient(45deg, #6dd5ed, #2193b0)",
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
                display: "flex",
                gap: 1,
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                "&:hover": {
                  transform: "scale(1.03)",
                  background: "linear-gradient(45deg, #5cc4dc, #197a94)",
                },
              }}
              onClick={() => navigate("/patient-profile")}
            >
              <PersonIcon /> Mon Profil
            </Button>
          </Grid>

          {/* Réserver RDV */}
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              sx={{
                py: 3,
                borderRadius: "18px",
                background: "linear-gradient(45deg, #f7971e, #ffd200)",
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
                display: "flex",
                gap: 1,
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                "&:hover": {
                  transform: "scale(1.03)",
                  background: "linear-gradient(45deg, #e18c18, #f2c700)",
                },
              }}
              onClick={() => navigate("/patient-rdv")}
            >
              <EventIcon /> Réserver Rendez-vous
            </Button>
          </Grid>

          {/* Mes rendez-vous */}
          <Grid item xs={12}>
            <Button
              fullWidth
              sx={{
                py: 3,
                borderRadius: "18px",
                background: "linear-gradient(45deg, #8360c3, #2ebf91)",
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
                display: "flex",
                gap: 1,
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
              onClick={() => navigate("/mes-rdv")}
            >
              <ListAltIcon /> Mes Rendez-vous
            </Button>
          </Grid>

          {/* Logout */}
          <Grid item xs={12}>
            <Button
              fullWidth
              sx={{
                py: 2,
                borderRadius: "18px",
                mt: 2,
                border: "2px solid white",
                color: "white",
                fontSize: "17px",
                "&:hover": {
                  background: "rgba(255,255,255,0.1)",
                },
              }}
              onClick={() => navigate("/")}
            >
              <LogoutIcon sx={{ mr: 1 }} /> Déconnexion
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
