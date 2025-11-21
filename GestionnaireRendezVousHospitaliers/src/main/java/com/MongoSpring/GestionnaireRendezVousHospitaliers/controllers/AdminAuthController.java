package com.MongoSpring.GestionnaireRendezVousHospitaliers.controllers;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000") // autorise React
public class AdminAuthController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        System.out.println("Tentative de connexion : Email='" + email + "' / Password='" + password + "'");

        if (email == null || password == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "message", "Email ou mot de passe manquant"));
        }

        try {
            boolean valid = adminService.validateLogin(email, password);

            if (valid) {
                System.out.println("Connexion réussie pour : " + email);
                return ResponseEntity.ok(Map.of("success", true, "message", "Connexion réussie"));
            } else {
                System.err.println("Échec de connexion pour : " + email + " (identifiants incorrects)");
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("success", false, "message", "Identifiants incorrects"));
            }

        } catch (Exception e) {
            System.err.println("Erreur lors de la validation du login : " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Erreur serveur : " + e.getMessage()));
        }
    }
}
