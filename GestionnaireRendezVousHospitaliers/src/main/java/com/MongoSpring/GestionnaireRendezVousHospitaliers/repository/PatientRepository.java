package com.MongoSpring.GestionnaireRendezVousHospitaliers.repository;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {
    Optional<Patient> findByPatientId(String patientId);

    List<Patient> findByNameContainingIgnoreCase(String name);

    Optional<Patient> findByEmail(String email);

    long count();
}