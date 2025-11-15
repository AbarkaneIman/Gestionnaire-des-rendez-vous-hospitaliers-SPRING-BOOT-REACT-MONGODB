import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box, Grid, Paper } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HomePage() {
  const navigate = useNavigate();
  const menuColor = "#12a2bbff";

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: 'url("/backgd.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: menuColor }}>
            Gestionnaire RDV Hospitaliers
          </Typography>
          <Box>
            <Button sx={{ color: menuColor }}>About</Button>
            <Button sx={{ color: menuColor }}>Departments</Button>
            <Button sx={{ color: menuColor }}>Doctors</Button>
            <Button sx={{ color: menuColor }}>Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          px: 8,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            padding: 4,
            borderRadius: 5,
            maxWidth: 800,
            textAlign: "left",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#037e8bff",
              fontWeight: "bold",
              mb: 3,
              textShadow: "2px 2px 6px rgba(223, 251, 255, 0.6)",
            }}
          >
            Réservez vos consultations <br /> en quelques clics
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#175355ff", mb: 5, lineHeight: 1.6 }}
          >
            Organisez vos rendez-vous médicaux rapidement et facilement. <br />
            Notre application simplifie la gestion pour les patients et les administrateurs, <br />
            tout en garantissant sécurité et fiabilité.
          </Typography>

          <Grid container direction="column" spacing={3} alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                size="large"
                startIcon={<span role="img" aria-label="patient">🧑‍⚕️</span>}
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/patient-login")}
                sx={{
                  width: "60%",
                  px: 20,
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 10,
                  color: "#fff",
                  background: "linear-gradient(45deg, #1976d2, #13b1a4ff)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  "&:hover": { background: "linear-gradient(45deg, #1565c0, #0bb5bbff)" },
                }}
              >
                Patient
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                startIcon={<span role="img" aria-label="admin">🏥</span>}
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/admin-login")}
                sx={{
                  width: "60%",
                  px: 20,
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 10,
                  color: "#fff",
                  background: "linear-gradient(45deg, #067483ff, #7effeeff)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  "&:hover": { background: "linear-gradient(45deg, #7b1fa2, #0bb5bbff)" },
                }}
              >
                Admin
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
