// src/pages/HomeAdmin.jsx
import React, { useState } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/* ----------------- Mock data ----------------- */
const lineData = [
  { name: "Jan", appointments: 40 },
  { name: "Feb", appointments: 55 },
  { name: "Mar", appointments: 60 },
  { name: "Apr", appointments: 75 },
  { name: "May", appointments: 90 },
  { name: "Jun", appointments: 100 },
];

const pieData = [
  { name: "General", value: 400 },
  { name: "Cardio", value: 300 },
  { name: "Ortho", value: 200 },
  { name: "Pediatrie", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

/* ----------------- Component ----------------- */
export default function HomeAdmin() {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(true); // sidebar expanded
  const [collapsedOnMobile, setCollapsedOnMobile] = useState(false);

  const stats = {
    patients: 1240,
    appointmentsToday: 38,
    doctors: 46,
    occupancy: "78%",
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f6f8fa",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* ---------------- SIDEBAR ---------------- */}
      <Box
        component="aside"
        sx={(theme) => ({
          width: open ? 260 : 72,
          transition: "width 220ms ease",
          background: "#037e8b",
          color: "white",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          p: 2,
          // responsive: collapsed (icon-only) on small screens
          [theme.breakpoints.down("sm")]: {
            position: "fixed",
            zIndex: 1200,
            height: "100vh",
            left: collapsedOnMobile ? 0 : -300,
            transition: "left 220ms ease",
            width: 260,
          },
        })}
      >
        {/* Toggle + Profile */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: open ? "space-between" : "center" }}>
          {open ? (
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Gestionnaire RDV
            </Typography>
          ) : (
            <Box />
          )}

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton
              onClick={() => {
                // if small screen, toggle slide-in
                if (window.innerWidth < 600) {
                  setCollapsedOnMobile((s) => !s);
                } else {
                  setOpen((s) => !s);
                }
              }}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.06)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                width: 36,
                height: 36,
              }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Box>

        {/* Profile */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 3,
            mb: 1,
            px: open ? 0 : "6px",
            transition: "all 220ms",
          }}
        >
          <Avatar
            alt="Admin"
            src="/image.png" // place ton image dans public/image.png
            sx={{ width: 56, height: 56, border: "2px solid rgba(255,255,255,0.15)" }}
          />
          {open && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Iman Abarkane
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Administrateur
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 2 }} />

        {/* Menu items */}
        <List sx={{ flexGrow: 1 }}>
          {[
            { key: "Dashboard", icon: <DashboardIcon /> },
            { key: "Doctors", icon: <MedicalServicesIcon /> },
            { key: "Patients", icon: <PeopleIcon /> },
            { key: "Reports", icon: <BarChartIcon /> },
          ].map((item) => (
            <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => setActive(item.key)}
                sx={{
                  borderRadius: 2,
                  mx: open ? 0 : 0.5,
                  px: open ? 2 : 1,
                  py: 1.1,
                  backgroundColor: active === item.key ? "rgba(255,255,255,0.12)" : "transparent",
                  transition: "background-color 180ms, transform 180ms",
                  "&:hover": { transform: "translateY(-3px)", backgroundColor: "rgba(255,255,255,0.08)" },
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.key} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Footer small */}
        {open && (
          <Box sx={{ mt: "auto", pt: 2 }}>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
            <Typography variant="caption" sx={{ mt: 1, opacity: 0.9 }}>
              Version 1.0 — © {new Date().getFullYear()}
            </Typography>
          </Box>
        )}
      </Box>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4 },
          ml: { xs: 0, sm: 0 }, // sidebar is fixed on small screens so no ml here
          transition: "margin 220ms",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {active}
          </Typography>
          <Box>
            <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
              Bonjour, Iman
            </Typography>
          </Box>
        </Box>

        {/* Stats cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Patients
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stats.patients}
              </Typography>
              <Typography variant="caption" sx={{ color: "green" }}>
                +4.2% ce mois
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                RDV aujourd'hui
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stats.appointmentsToday}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Gestion en temps réel
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Médecins
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stats.doctors}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Disponibilité: 92%
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Taux d'occupation
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stats.occupancy}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Capacité actuelle
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts area */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ height: 320, p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Évolution des rendez-vous (6 mois)
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="appointments" stroke="#00b4d8" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ height: 320, p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Répartition par service
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Content examples */}
        <Box sx={{ mt: 3 }}>
          {active === "Dashboard" && <Typography>Résumé rapide et actions prioritaires...</Typography>}
          {active === "Doctors" && <Typography>Tableau des docteurs (ajouter / modifier / supprimer)...</Typography>}
          {active === "Patients" && <Typography>Recherche et gestion des patients...</Typography>}
          {active === "Reports" && <Typography>Export et rapports détaillés...</Typography>}
        </Box>
      </Box>
    </Box>
  );
}
