package com.MongoSpring.GestionnaireRendezVousHospitaliers.services;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Appointment;
import com.MongoSpring.GestionnaireRendezVousHospitaliers.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class Rendez_vousService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(String id) {
        return appointmentRepository.findById(id);
    }

    public Optional<Appointment> getAppointmentByAppointmentId(String appointmentId) {
        return appointmentRepository.findByAppointmentId(appointmentId);
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(String id, Appointment appointmentDetails) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            Appointment existingAppointment = appointment.get();
            existingAppointment.setDate(appointmentDetails.getDate());
            existingAppointment.setTime(appointmentDetails.getTime());
            existingAppointment.setStatus(appointmentDetails.getStatus());
            existingAppointment.setRemarks(appointmentDetails.getRemarks());
            return appointmentRepository.save(existingAppointment);
        }
        return null;
    }

    public void deleteAppointment(String id) {
        appointmentRepository.deleteById(id);
    }

    public List<Appointment> getAppointmentsByPatient(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsByDoctor(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByDate(date);
    }

    public List<Appointment> getTodayAppointments() {
        return appointmentRepository.findByDate(LocalDate.now());
    }

    public List<Appointment> getAppointmentsByStatus(String status) {
        return appointmentRepository.findByStatus(status);
    }

    public long getTotalAppointments() {
        return appointmentRepository.count();
    }

    public long getTodayConfirmedAppointments() {
        return appointmentRepository.countByDateAndStatus(LocalDate.now(), "Confirmé");
    }
}