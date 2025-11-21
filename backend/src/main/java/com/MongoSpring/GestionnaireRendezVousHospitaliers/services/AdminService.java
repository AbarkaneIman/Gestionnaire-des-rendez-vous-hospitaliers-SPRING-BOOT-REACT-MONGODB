package com.MongoSpring.GestionnaireRendezVousHospitaliers.services;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Admin;
import com.MongoSpring.GestionnaireRendezVousHospitaliers.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public boolean validateLogin(String email, String password) {
        Admin admin = adminRepository.findByEmailIgnoreCase(email);

        if (admin == null) {
            System.err.println("Aucun admin trouvé pour l'email : " + email);
            return false;
        }

        if (admin.getPassword().equals(password)) {
            System.out.println("Login validé pour : " + email);
            return true;
        } else {
            System.err.println("Mot de passe incorrect pour : " + email);
            return false;
        }
    }
}
