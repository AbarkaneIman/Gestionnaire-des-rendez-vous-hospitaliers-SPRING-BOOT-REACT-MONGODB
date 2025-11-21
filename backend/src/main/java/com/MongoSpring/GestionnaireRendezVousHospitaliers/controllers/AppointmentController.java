package com.MongoSpring.GestionnaireRendezVousHospitaliers.controllers;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Appointment;
import com.MongoSpring.GestionnaireRendezVousHospitaliers.services.Rendez_vousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private Rendez_vousService rendezVousService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return rendezVousService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable String id) {
        Optional<Appointment> appointment = rendezVousService.getAppointmentById(id);
        return appointment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<Appointment> getAppointmentByAppointmentId(@PathVariable String appointmentId) {
        Optional<Appointment> appointment = rendezVousService.getAppointmentByAppointmentId(appointmentId);
        return appointment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return rendezVousService.createAppointment(appointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable String id,
            @RequestBody Appointment appointmentDetails) {
        Appointment updatedAppointment = rendezVousService.updateAppointment(id, appointmentDetails);
        return updatedAppointment != null ? ResponseEntity.ok(updatedAppointment) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable String id) {
        rendezVousService.deleteAppointment(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(@PathVariable String patientId) {
        return rendezVousService.getAppointmentsByPatient(patientId);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(@PathVariable String doctorId) {
        return rendezVousService.getAppointmentsByDoctor(doctorId);
    }

    @GetMapping("/date/{date}")
    public List<Appointment> getAppointmentsByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return rendezVousService.getAppointmentsByDate(localDate);
    }

    @GetMapping("/today")
    public List<Appointment> getTodayAppointments() {
        return rendezVousService.getTodayAppointments();
    }

    @GetMapping("/status/{status}")
    public List<Appointment> getAppointmentsByStatus(@PathVariable String status) {
        return rendezVousService.getAppointmentsByStatus(status);
    }

    @GetMapping("/count")
    public long getTotalAppointments() {
        return rendezVousService.getTotalAppointments();
    }

    @GetMapping("/today/confirmed")
    public long getTodayConfirmedAppointments() {
        return rendezVousService.getTodayConfirmedAppointments();
    }
}