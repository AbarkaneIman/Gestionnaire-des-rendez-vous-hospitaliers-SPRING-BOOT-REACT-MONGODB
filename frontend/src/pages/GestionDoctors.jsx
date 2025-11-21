// src/pages/GestionDoctors.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Fab,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Email,
  Phone,
  CalendarToday,
  Star,
  Work,
  Person,
  Close,
} from "@mui/icons-material";

// URL de base pour l'API Spring Boot - avec gestion de port
const API_BASE_URL = "http://localhost:8080/api";

const GestionDoctors = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorsData, setDoctorsData] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Données statiques de fallback basées sur votre base MongoDB
  const fallbackDoctorsData = [
    {
      doctor_id: 'D2001',
      name: 'Dr. Asmaa Laayouni',
      specialization: 'Radiologie',
      email: 'asmaalaayouni@clinic.ma',
      phone: '+21263639765',
      working_days: ['Mercredi', 'Jeudi', 'Vendredi']
    },
    {
      doctor_id: 'D2002',
      name: 'Dr. Kenza Hassan',
      specialization: 'Généraliste',
      email: 'kenzahassan@clinic.ma',
      phone: '+21266498474',
      working_days: ['Lundi', 'Mardi', 'Jeudi']
    },
    {
      doctor_id: 'D2003',
      name: 'Dr. Sifeddine Malki',
      specialization: 'Psychiatrie',
      email: 'sifeddinemalki@clinic.ma',
      phone: '+21267732811',
      working_days: ['Mercredi', 'Jeudi', 'Vendredi']
    },
    {
      doctor_id: 'D2004',
      name: 'Dr. Ahmed Targuisti',
      specialization: 'Radiologie',
      email: 'ahmedtarguisti@clinic.ma',
      phone: '+21265631688',
      working_days: ['Lundi', 'Mercredi', 'Vendredi']
    },
    {
      doctor_id: 'D2005',
      name: 'Dr. Iman Benjelloun',
      specialization: 'Dermatologie',
      email: 'imanbenjelloun@clinic.ma',
      phone: '+21263404605',
      working_days: ['Lundi', 'Mardi', 'Mercredi']
    },
    {
      doctor_id: 'D2006',
      name: 'Dr. Fatima Zahra Chaoui',
      specialization: 'Orthopédie',
      email: 'fatimazahrachaoui@clinic.ma',
      phone: '+21261116393',
      working_days: ['Mercredi', 'Jeudi', 'Vendredi']
    },
    {
      doctor_id: 'D2007',
      name: 'Dr. Omar El Amrani',
      specialization: 'Pédiatrie',
      email: 'omarelamrani@clinic.ma',
      phone: '+21265602179',
      working_days: ['Lundi', 'Mardi', 'Jeudi']
    },
    {
      doctor_id: 'D2008',
      name: 'Dr. Momed Lahlou',
      specialization: 'Radiologie',
      email: 'momedlahlou@clinic.ma',
      phone: '+21260483753',
      working_days: ['Lundi', 'Mercredi', 'Vendredi']
    },
    {
      doctor_id: 'D2009',
      name: 'Dr. Karim Ahmed',
      specialization: 'Généraliste',
      email: 'karimahmed@clinic.ma',
      phone: '+21268002663',
      working_days: ['Mercredi', 'Jeudi', 'Vendredi']
    },
    {
      doctor_id: 'D2010',
      name: 'Dr. Hassan Abergel',
      specialization: 'Dermatologie',
      email: 'hassanabergel@clinic.ma',
      phone: '+21265302945',
      working_days: ['Mercredi', 'Jeudi', 'Vendredi']
    }
  ];

  // Charger les données depuis l'API ou utiliser les données de fallback
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Tentative de connexion à l'API...");
        const response = await fetch(`${API_BASE_URL}/doctors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Timeout après 5 secondes
          signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Données reçues de l'API:", data);
        setDoctorsData(data);
        setSnackbar({ open: true, message: "Données chargées avec succès", severity: "success" });
        
      } catch (error) {
        console.warn("Erreur de connexion API, utilisation des données de fallback:", error);
        setDoctorsData(fallbackDoctorsData);
        setError("Connexion à l'API échouée. Affichage des données de démonstration.");
        setSnackbar({ open: true, message: "Mode démonstration activé", severity: "warning" });
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Générer des données complémentaires pour l'interface
  const generateComplementaryData = (doctor) => {
    // Générer une note aléatoire entre 4.0 et 5.0
    const rating = (Math.random() * 1 + 4).toFixed(1);
    
    // Générer un nombre de consultations aléatoire
    const consultations = Math.floor(Math.random() * 2000) + 500;
    
    // Générer des années d'expérience basées sur l'ID
    const experience = `${Math.floor(Math.random() * 15) + 5} ans`;
    
    // Déterminer le statut basé sur les jours de travail
    const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
    const isWorkingToday = doctor.working_days?.includes(today);
    const status = isWorkingToday ? "active" : "away";
    
    // Générer la prochaine disponibilité
    const nextAvailability = isWorkingToday ? 
      "Aujourd'hui, " + ["09:00", "10:30", "14:00", "15:30", "16:45"][Math.floor(Math.random() * 5)] :
      "Demain, " + ["09:00", "10:30", "14:00"][Math.floor(Math.random() * 3)];

    return {
      ...doctor,
      rating: parseFloat(rating),
      consultations,
      experience,
      status,
      nextAvailability,
      specialty: doctor.specialization,
      department: doctor.specialization,
      avatar: `/avatars/doctor${parseInt(doctor.doctor_id.slice(-2)) % 10 || 1}.jpg`
    };
  };

  const specialties = [
    "Cardiologie", "Pédiatrie", "Dermatologie", "Psychiatrie", "Radiologie",
    "Généraliste", "Orthopédie", "Gynécologie", "Neurologie", "Ophtalmologie", "ORL"
  ];

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setOpenDialog(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
  };

  const handleDeleteDoctor = async (doctor) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${doctor.name} ?`)) {
      try {
        // En mode démo, on simule la suppression
        if (error) {
          setDoctorsData(prev => prev.filter(d => d.doctor_id !== doctor.doctor_id));
          setSnackbar({ open: true, message: "Médecin supprimé (mode démo)", severity: "info" });
          return;
        }

        const response = await fetch(`${API_BASE_URL}/doctors/${doctor.doctor_id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setDoctorsData(prev => prev.filter(d => d.doctor_id !== doctor.doctor_id));
          setSnackbar({ open: true, message: "Médecin supprimé avec succès", severity: "success" });
        } else {
          throw new Error('Erreur lors de la suppression');
        }
      } catch (error) {
        console.error("Erreur:", error);
        setSnackbar({ open: true, message: "Erreur lors de la suppression", severity: "error" });
      }
    }
  };

  const handleViewDoctor = (doctor) => {
    setSnackbar({ open: true, message: `Visualisation de ${doctor.name}`, severity: "info" });
  };

  const handleSaveDoctor = async (formData) => {
    try {
      // En mode démo, on simule la sauvegarde
      if (error) {
        if (selectedDoctor) {
          setDoctorsData(prev => prev.map(d => 
            d.doctor_id === selectedDoctor.doctor_id ? { ...d, ...formData } : d
          ));
          setSnackbar({ open: true, message: "Médecin modifié (mode démo)", severity: "info" });
        } else {
          const newDoctor = {
            doctor_id: `D${2000 + doctorsData.length + 1}`,
            ...formData
          };
          setDoctorsData(prev => [...prev, newDoctor]);
          setSnackbar({ open: true, message: "Médecin ajouté (mode démo)", severity: "info" });
        }
        setOpenDialog(false);
        return;
      }

      const url = selectedDoctor ? 
        `${API_BASE_URL}/doctors/${selectedDoctor.doctor_id}` : 
        `${API_BASE_URL}/doctors`;
      
      const method = selectedDoctor ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const savedDoctor = await response.json();
        
        if (selectedDoctor) {
          setDoctorsData(prev => prev.map(d => 
            d.doctor_id === selectedDoctor.doctor_id ? savedDoctor : d
          ));
          setSnackbar({ open: true, message: "Médecin modifié avec succès", severity: "success" });
        } else {
          setDoctorsData(prev => [...prev, savedDoctor]);
          setSnackbar({ open: true, message: "Médecin ajouté avec succès", severity: "success" });
        }
        
        setOpenDialog(false);
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error("Erreur:", error);
      setSnackbar({ open: true, message: "Erreur lors de la sauvegarde", severity: "error" });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "success";
      case "away": return "warning";
      case "inactive": return "error";
      default: return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active": return "En service";
      case "away": return "Absent";
      case "inactive": return "Inactif";
      default: return "Inconnu";
    }
  };

  // Données enrichies pour l'affichage
  const enrichedDoctorsData = doctorsData.map(doctor => generateComplementaryData(doctor));

  // Vue Grille
  const GridView = () => (
    <Grid container spacing={3}>
      {enrichedDoctorsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((doctor) => (
        <Grid item xs={12} sm={6} md={4} key={doctor.doctor_id}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 60, height: 60, border: '3px solid #037e8b', bgcolor: '#037e8b' }}>
                    <Person sx={{ color: 'white' }} />
                  </Avatar>
                  <Box>
                    <Chip label={getStatusText(doctor.status)} size="small" color={getStatusColor(doctor.status)} variant="outlined" />
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Star sx={{ color: '#FFC107', fontSize: 18 }} />
                      <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 600 }}>{doctor.rating}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Tooltip title="Voir le profil"><IconButton size="small" onClick={() => handleViewDoctor(doctor)}><Visibility fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Modifier"><IconButton size="small" onClick={() => handleEditDoctor(doctor)}><Edit fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Supprimer"><IconButton size="small" onClick={() => handleDeleteDoctor(doctor)} color="error"><Delete fontSize="small" /></IconButton></Tooltip>
                </Box>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{doctor.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{doctor.specialty}</Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><Work sx={{ fontSize: 16, color: '#037e8b', mr: 1 }} /><Typography variant="body2">{doctor.department}</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CalendarToday sx={{ fontSize: 16, color: '#037e8b', mr: 1 }} /><Typography variant="body2">Exp: {doctor.experience}</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><Email sx={{ fontSize: 16, color: '#037e8b', mr: 1 }} /><Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{doctor.email}</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}><Phone sx={{ fontSize: 16, color: '#037e8b', mr: 1 }} /><Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{doctor.phone}</Typography></Box>
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Jours de travail:</Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                {doctor.working_days?.map((day, index) => (
                  <Chip key={index} label={day.substring(0, 3)} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                ))}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">Prochaine disponibilité</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>{doctor.nextAvailability}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="text.secondary" display="block">Consultations</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{doctor.consultations.toLocaleString()}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Vue Tableau
  const TableView = () => (
    <Paper sx={{ width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: '#037e8b' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Médecin</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Spécialité</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Département</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Statut</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Note</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Consultations</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrichedDoctorsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((doctor) => (
              <TableRow key={doctor.doctor_id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: '#037e8b' }}><Person sx={{ color: 'white' }} /></Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{doctor.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{doctor.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.department}</TableCell>
                <TableCell><Chip label={getStatusText(doctor.status)} size="small" color={getStatusColor(doctor.status)} /></TableCell>
                <TableCell><Box sx={{ display: 'flex', alignItems: 'center' }}><Star sx={{ color: '#FFC107', fontSize: 16, mr: 0.5 }} />{doctor.rating}</Box></TableCell>
                <TableCell>{doctor.consultations.toLocaleString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Voir"><IconButton size="small" onClick={() => handleViewDoctor(doctor)}><Visibility fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Modifier"><IconButton size="small" onClick={() => handleEditDoctor(doctor)}><Edit fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Supprimer"><IconButton size="small" onClick={() => handleDeleteDoctor(doctor)} color="error"><Delete fontSize="small" /></IconButton></Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 12, 24]}
        component="div"
        count={enrichedDoctorsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page:"
      />
    </Paper>
  );

  // Formulaire d'ajout/modification
  const DoctorForm = () => {
    const [formData, setFormData] = useState({
      name: selectedDoctor?.name || "",
      specialization: selectedDoctor?.specialization || "",
      email: selectedDoctor?.email || "",
      phone: selectedDoctor?.phone || "",
      working_days: selectedDoctor?.working_days || []
    });

    const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#037e8b', color: 'white' }}>
          {selectedDoctor ? "Modifier le médecin" : "Ajouter un nouveau médecin"}
          <IconButton onClick={() => setOpenDialog(false)} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Nom complet" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} margin="normal" /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal"><InputLabel>Spécialité</InputLabel>
                <Select label="Spécialité" value={formData.specialization} onChange={(e) => handleInputChange('specialization', e.target.value)}>
                  {specialties.map((specialty) => (<MenuItem key={specialty} value={specialty}>{specialty}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} margin="normal" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Téléphone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} margin="normal" /></Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal"><InputLabel>Jours de travail</InputLabel>
                <Select multiple label="Jours de travail" value={formData.working_days} onChange={(e) => handleInputChange('working_days', e.target.value)} renderValue={(selected) => selected.join(', ')}>
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((day) => (<MenuItem key={day} value={day}>{day}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button variant="contained" onClick={() => handleSaveDoctor(formData)} sx={{ bgcolor: '#037e8b', '&:hover': { bgcolor: '#025e6b' } }}>
            {selectedDoctor ? "Modifier" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Chargement des médecins...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error} - Les données affichées sont en mode démonstration.
        </Alert>
      )}

      {/* En-tête avec statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}><Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#037e8b', color: 'white' }}><Typography variant="h4" sx={{ fontWeight: 700 }}>{enrichedDoctorsData.length}</Typography><Typography variant="body1">Médecins total</Typography></Paper></Grid>
        <Grid item xs={12} sm={6} md={3}><Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#00C49F', color: 'white' }}><Typography variant="h4" sx={{ fontWeight: 700 }}>{enrichedDoctorsData.filter(d => d.status === 'active').length}</Typography><Typography variant="body1">En service</Typography></Paper></Grid>
        <Grid item xs={12} sm={6} md={3}><Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#FFBB28', color: 'white' }}><Typography variant="h4" sx={{ fontWeight: 700 }}>{enrichedDoctorsData.filter(d => d.rating >= 4.5).length}</Typography><Typography variant="body1">Hautement notés</Typography></Paper></Grid>
        <Grid item xs={12} sm={6} md={3}><Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#FF8042', color: 'white' }}><Typography variant="h4" sx={{ fontWeight: 700 }}>{[...new Set(enrichedDoctorsData.map(d => d.specialty))].length}</Typography><Typography variant="body1">Spécialités</Typography></Paper></Grid>
      </Grid>

      {/* Barre d'outils */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant={view === "grid" ? "contained" : "outlined"} onClick={() => setView("grid")} sx={{ bgcolor: view === "grid" ? '#037e8b' : 'transparent', '&:hover': { bgcolor: view === "grid" ? '#025e6b' : 'rgba(3, 126, 139, 0.1)' } }}>Grille</Button>
          <Button variant={view === "list" ? "contained" : "outlined"} onClick={() => setView("list")} sx={{ bgcolor: view === "list" ? '#037e8b' : 'transparent', '&:hover': { bgcolor: view === "list" ? '#025e6b' : 'rgba(3, 126, 139, 0.1)' } }}>Liste</Button>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddDoctor} sx={{ bgcolor: '#037e8b', '&:hover': { bgcolor: '#025e6b' }, borderRadius: 2 }}>Nouveau Médecin</Button>
      </Paper>

      {/* Contenu */}
      {view === "grid" ? <GridView /> : <TableView />}

      {/* Formulaire */}
      <DoctorForm />

      {/* Snackbar pour les notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Bouton flottant pour mobile */}
      <Fab color="primary" aria-label="add" onClick={handleAddDoctor} sx={{ position: 'fixed', bottom: 24, right: 24, bgcolor: '#037e8b', '&:hover': { bgcolor: '#025e6b' }, display: { xs: 'flex', md: 'none' } }}><Add /></Fab>
    </Box>
  );
};

export default GestionDoctors;