// src/pages/HomeAdmin.jsx
import React, { useState, useEffect } from "react";
import GestionDoctors from "./GestionDoctors";

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
  TextField,
  InputAdornment,
  Badge,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  ButtonGroup,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import EventIcon from "@mui/icons-material/Event";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TodayIcon from "@mui/icons-material/Today";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

// URL de base pour l'API Spring Boot
const API_BASE_URL = "http://localhost:8080/api";

/* ----------------- Component ----------------- */
export default function HomeAdmin() {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(true);
  const [collapsedOnMobile, setCollapsedOnMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    patients: { total: 0, today: 0, percentage: "+0%" },
    doctors: { total: 0, working: 0 },
    appointments: { today: 0, percentage: "+0%" },
    occupancy: "0%"
  });
  
  // États pour les nouveaux graphiques
  const [patientEvolutionPeriod, setPatientEvolutionPeriod] = useState("week");
  const [appointmentsEvolutionPeriod, setAppointmentsEvolutionPeriod] = useState("week");
  const [patientEvolutionData, setPatientEvolutionData] = useState([]);
  const [appointmentsEvolutionData, setAppointmentsEvolutionData] = useState([]);

  // Date actuelle formatée
  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const todayString = today.toISOString().split('T')[0];

  const menuItems = [
    { key: "Dashboard", icon: <DashboardIcon /> },
    { key: "Doctors", icon: <MedicalServicesIcon /> },
    { key: "Patients", icon: <PeopleIcon /> },
    { key: "Appointments", icon: <EventIcon /> },
    { key: "Departments", icon: <BusinessIcon /> },
    { key: "Reports", icon: <BarChartIcon /> },
    { key: "Settings", icon: <SettingsIcon /> },
  ];

  // Fonction pour générer les jours de la semaine actuelle
  const getCurrentWeekDays = () => {
    const days = [];
    const currentDay = today.getDay(); // 0 (dimanche) à 6 (samedi)
    
    // Ajuster pour commencer par lundi (1)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  // Calendrier de la semaine actuelle
  const renderWeekCalendar = () => {
    const weekDays = getCurrentWeekDays();
    const dayNames = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];

    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#037e8b', fontWeight: 600, fontSize: '1.1rem' }}>
          Semaine du {weekDays[0].getDate()} {weekDays[0].toLocaleDateString('fr-FR', { month: 'short' })}
        </Typography>
        
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {dayNames.map((dayName, index) => (
            <Grid item xs={12/7} key={dayName}>
              <Typography variant="caption" sx={{ 
                textAlign: 'center', 
                display: 'block', 
                fontWeight: 600, 
                color: '#037e8b',
                fontSize: '0.75rem'
              }}>
                {dayName}
              </Typography>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 1
        }}>
          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === today.toDateString();
            const isWeekend = index >= 5; // Samedi et dimanche
            
            return (
              <Box
                key={index}
                sx={{
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  background: isToday ? '#037e8b' : (isWeekend ? 'rgba(3, 126, 139, 0.05)' : 'transparent'),
                  color: isToday ? 'white' : (isWeekend ? '#037e8b' : 'text.primary'),
                  fontWeight: isToday ? 700 : 500,
                  fontSize: '0.9rem',
                  border: isToday ? '2px solid #037e8b' : '1px solid rgba(3, 126, 139, 0.2)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: isToday ? '#037e8b' : 'rgba(3, 126, 139, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'inherit', fontSize: 'inherit' }}>
                  {day.getDate()}
                </Typography>
                {isToday && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      mt: 0.5
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
        
        {/* Date d'aujourd'hui en bas */}
        <Box sx={{ mt: 2, p: 1.5, backgroundColor: 'rgba(3, 126, 139, 0.08)', borderRadius: 2 }}>
          <Typography variant="body2" sx={{ color: '#037e8b', fontWeight: 600 }}>
            Aujourd'hui
          </Typography>
          <Typography variant="h6" sx={{ color: '#037e8b', fontWeight: 700 }}>
            {today.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Typography>
        </Box>
      </Box>
    );
  };

  // Générer les données d'évolution des patients
  const generatePatientEvolutionData = (period) => {
    let data = [];
    
    if (period === "week") {
      const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
      data = days.map(day => ({
        jour: day,
        hommes: Math.floor(Math.random() * 20) + 10,
        femmes: Math.floor(Math.random() * 20) + 10,
      }));
    } else if (period === "month") {
      const weeks = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
      data = weeks.map(sem => ({
        jour: sem,
        hommes: Math.floor(Math.random() * 100) + 50,
        femmes: Math.floor(Math.random() * 100) + 50,
      }));
    } else if (period === "year") {
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
      data = months.map(mois => ({
        jour: mois,
        hommes: Math.floor(Math.random() * 300) + 200,
        femmes: Math.floor(Math.random() * 300) + 200,
      }));
    }
    
    setPatientEvolutionData(data);
  };

  // Générer les données d'évolution des rendez-vous
  const generateAppointmentsEvolutionData = (period) => {
    let data = [];
    
    if (period === "week") {
      const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
      data = days.map(day => ({
        periode: day,
        rendezvous: Math.floor(Math.random() * 30) + 20,
      }));
    } else if (period === "month") {
      const weeks = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
      data = weeks.map(sem => ({
        periode: sem,
        rendezvous: Math.floor(Math.random() * 150) + 100,
      }));
    } else if (period === "year") {
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
      data = months.map(mois => ({
        periode: mois,
        rendezvous: Math.floor(Math.random() * 400) + 300,
      }));
    }
    
    setAppointmentsEvolutionData(data);
  };

  // Charger les données depuis l'API Spring Boot
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const dashboardResponse = await fetch(`${API_BASE_URL}/dashboard/stats`);
        const dashboardData = await dashboardResponse.json();
        
        const doctorsResponse = await fetch(`${API_BASE_URL}/doctors`);
        const doctorsData = await doctorsResponse.json();

        const appointmentsResponse = await fetch(`${API_BASE_URL}/appointments`);
        const appointmentsData = await appointmentsResponse.json();

        updateStats(dashboardData, doctorsData, appointmentsData);
        
        // Générer les données des nouveaux graphiques
        generatePatientEvolutionData("week");
        generateAppointmentsEvolutionData("week");
        
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setDemoData();
        generatePatientEvolutionData("week");
        generateAppointmentsEvolutionData("week");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateStats = (dashboardData, doctors, appointments) => {
    const todayDoctors = doctors.filter(doctor => {
      const todayDay = today.toLocaleDateString('fr-FR', { weekday: 'long' });
      return doctor.working_days && doctor.working_days.includes(todayDay);
    }).length;

    const todayAppointments = appointments.filter(appt => 
      appt.date === todayString && appt.status === 'Confirmé'
    ).length;

    const occupancyRate = Math.min(100, Math.round((todayAppointments / (doctors.length * 8)) * 100)) + '%';

    setStats({
      patients: { 
        total: dashboardData.totalPatients || dashboardData.patients || 0, 
        today: dashboardData.newPatientsToday || 0, 
        percentage: dashboardData.patientGrowth || "+0%" 
      },
      doctors: { 
        total: dashboardData.totalDoctors || doctors.length, 
        working: todayDoctors 
      },
      appointments: { 
        today: dashboardData.todayAppointments || todayAppointments, 
        percentage: dashboardData.appointmentGrowth || "+0%" 
      },
      occupancy: occupancyRate
    });
  };

  const setDemoData = () => {
    setStats({
      patients: { total: 1240, today: 45, percentage: "+4.2%" },
      doctors: { total: 46, working: 38 },
      appointments: { today: 38, percentage: "+12%" },
      occupancy: "78%"
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Chargement des données...</Typography>
      </Box>
    );
  }

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
            src="/image.png"
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
          {menuItems.map((item) => (
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
          ml: { xs: 0, sm: 0 },
          transition: "margin 220ms",
        }}
      >
        {/* Header avec barre de recherche et notifications */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {active}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, maxWidth: 400 ,height:30}}>
            <TextField
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flexGrow: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'white',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <Badge badgeContent={3} color="error">
              <IconButton>
                <NotificationsIcon />
              </IconButton>
            </Badge>
          </Box>
        </Box>

        {/* Dashboard Content */}
        {active === "Dashboard" && (
          <>
            {/* Ligne avec Statistiques et Calendrier de la semaine */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {/* Cartes de statistiques - À GAUCHE */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  {/* Patients Card */}
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, borderLeft: '4px solid #037e8b', height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
                        Total Patients
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {stats.patients.total}
                        </Typography>
                        <Chip 
                          label={stats.patients.percentage} 
                          size="small" 
                          color="success" 
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {stats.patients.today} nouveaux aujourd'hui
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Doctors Card */}
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, borderLeft: '4px solid #00C49F', height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
                        Médecins
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {stats.doctors.total}
                        </Typography>
                        <Chip 
                          label={`${stats.doctors.working} actifs`} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {stats.doctors.working} en service aujourd'hui
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Appointments Card */}
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, borderLeft: '4px solid #FFBB28', height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
                        Rendez-vous Aujourd'hui
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {stats.appointments.today}
                        </Typography>
                        <Chip 
                          label={stats.appointments.percentage} 
                          size="small" 
                          color="success" 
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Gestion en temps réel
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Occupancy Card */}
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, borderLeft: '4px solid #FF8042', height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
                        Taux d'occupation
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.occupancy}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Capacité actuelle
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* DIAGRAMMES CÔTE À CÔTE */}
                <Grid container spacing={3} sx={{ mt: 7 }}>
                  {/* Diagramme 1: Évolution des patients par genre */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, height: 350 ,width: 450}}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#037e8b', fontSize: '1rem' }}>
                          📊 Patients par Genre
                        </Typography>
                        <ButtonGroup size="small" variant="outlined">
                          <Button 
                            onClick={() => {
                              setPatientEvolutionPeriod("week");
                              generatePatientEvolutionData("week");
                            }}
                            color={patientEvolutionPeriod === "week" ? "primary" : "inherit"}
                          >
                            Sem
                          </Button>
                          <Button 
                            onClick={() => {
                              setPatientEvolutionPeriod("month");
                              generatePatientEvolutionData("month");
                            }}
                            color={patientEvolutionPeriod === "month" ? "primary" : "inherit"}
                          >
                            Mois
                          </Button>
                          <Button 
                            onClick={() => {
                              setPatientEvolutionPeriod("year");
                              generatePatientEvolutionData("year");
                            }}
                            color={patientEvolutionPeriod === "year" ? "primary" : "inherit"}
                          >
                            An
                          </Button>
                        </ButtonGroup>
                      </Box>
                      <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={patientEvolutionData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="jour" stroke="#666" fontSize={12} />
                          <YAxis stroke="#666" fontSize={12} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="hommes" fill="#037e8b" name="Hommes" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="femmes" fill="#00C49F" name="Femmes" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Paper>
                  </Grid>

                  {/* Diagramme 2: Évolution des rendez-vous */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, height: 350 ,width: 450}}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#037e8b', fontSize: '1rem' }}>
                          📈 Évolution RDV
                        </Typography>
                        <ButtonGroup size="small" variant="outlined">
                          <Button 
                            onClick={() => {
                              setAppointmentsEvolutionPeriod("week");
                              generateAppointmentsEvolutionData("week");
                            }}
                            color={appointmentsEvolutionPeriod === "week" ? "primary" : "inherit"}
                          >
                            Sem
                          </Button>
                          <Button 
                            onClick={() => {
                              setAppointmentsEvolutionPeriod("month");
                              generateAppointmentsEvolutionData("month");
                            }}
                            color={appointmentsEvolutionPeriod === "month" ? "primary" : "inherit"}
                          >
                            Mois
                          </Button>
                          <Button 
                            onClick={() => {
                              setAppointmentsEvolutionPeriod("year");
                              generateAppointmentsEvolutionData("year");
                            }}
                            color={appointmentsEvolutionPeriod === "year" ? "primary" : "inherit"}
                          >
                            An
                          </Button>
                        </ButtonGroup>
                      </Box>
                      <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={appointmentsEvolutionData}>
                          <defs>
                            <linearGradient id="colorRendezvous" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#037e8b" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#037e8b" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="periode" stroke="#666" fontSize={12} />
                          <YAxis stroke="#666" fontSize={12} />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="rendezvous" 
                            stroke="#037e8b" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorRendezvous)" 
                            name="Rendez-vous"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              {/* Calendrier de la semaine - À DROITE */}
              <Grid item xs={12} md={4}>
                <Card 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2, 
                    boxShadow: 2, 
                    height: 'fit-content',
                    border: '1px solid #e0e0e0',
                    background: 'linear-gradient(135deg, #f8fdff 0%, #f0f9fa 100%)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <TodayIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#037e8b' }}>
                      Cette Semaine
                    </Typography>
                  </Box>
                  {renderWeekCalendar()}
                </Card>
              </Grid>
            </Grid>
          </>
        )}

        {/* Other Pages Content */}
        <Box sx={{ mt: 3 }}>
          {active === "Doctors" && <GestionDoctors />}
          {active === "Patients" && <Typography>Recherche et gestion des patients...</Typography>}
          {active === "Appointments" && <Typography>Gestion des rendez-vous...</Typography>}
          {active === "Departments" && <Typography>Gestion des départements...</Typography>}
          {active === "Reports" && <Typography>Export et rapports détaillés...</Typography>}
          {active === "Settings" && <Typography>Paramètres du système...</Typography>}
        </Box>
      </Box>
    </Box>
  );
}