package com.MongoSpring.GestionnaireRendezVousHospitaliers.controllers;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.services.PatientService;
import com.MongoSpring.GestionnaireRendezVousHospitaliers.services.DoctorService;
import com.MongoSpring.GestionnaireRendezVousHospitaliers.services.Rendez_vousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

        @Autowired
        private PatientService patientService;

        @Autowired
        private DoctorService doctorService;

        @Autowired
        private Rendez_vousService rendezVousService;

        @GetMapping("/stats")
        public Map<String, Object> getDashboardStats() {
                Map<String, Object> stats = new HashMap<>();

                // Statistiques de base
                long totalPatients = patientService.getTotalPatients();
                long totalDoctors = doctorService.getTotalDoctors();
                long todayAppointments = rendezVousService.getTodayConfirmedAppointments();

                stats.put("totalPatients", totalPatients);
                stats.put("totalDoctors", totalDoctors);
                stats.put("todayAppointments", todayAppointments);

                // Statistiques simulées pour la croissance
                stats.put("patientGrowth", "+4.2%");
                stats.put("appointmentGrowth", "+12%");
                stats.put("newPatientsToday", 5);

                return stats;
        }
}