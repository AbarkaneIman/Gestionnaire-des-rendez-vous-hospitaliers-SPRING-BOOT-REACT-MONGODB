package com.MongoSpring.GestionnaireRendezVousHospitaliers.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    @GetMapping("/admin")
    public String showDashboard() {
        return "admin_dashboard"; // nom du fichier Thymeleaf
    }
}
