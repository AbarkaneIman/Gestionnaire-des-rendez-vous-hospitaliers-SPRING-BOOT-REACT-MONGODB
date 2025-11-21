package com.MongoSpring.GestionnaireRendezVousHospitaliers.repository;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    Optional<Doctor> findByDoctorId(String doctorId);

    List<Doctor> findByNameContainingIgnoreCase(String name);

    List<Doctor> findBySpecialization(String specialization);

    Optional<Doctor> findByEmail(String email);

    long count();

    @Aggregation(pipeline = {
            "{ $group: { _id: '$specialization', count: { $sum: 1 } } }",
            "{ $project: { specialization: '$_id', count: 1, _id: 0 } }"
    })
    List<SpecialtyCount> countBySpecialization();

    // Interface publique pour le résultat de l'agrégation
    public interface SpecialtyCount {
        String getSpecialization();

        int getCount();
    }
}