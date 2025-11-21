package com.MongoSpring.GestionnaireRendezVousHospitaliers.repository;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByEmailIgnoreCase(String email); // ignore case
}
