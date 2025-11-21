package com.MongoSpring.GestionnaireRendezVousHospitaliers.repository;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    Optional<Appointment> findByAppointmentId(String appointmentId);

    List<Appointment> findByPatientId(String patientId);

    List<Appointment> findByDoctorId(String doctorId);

    List<Appointment> findByDate(LocalDate date);

    List<Appointment> findByDateAndStatus(LocalDate date, String status);

    List<Appointment> findByStatus(String status);

    long countByDateAndStatus(LocalDate date, String status);

    long count();
}