package com.MongoSpring.GestionnaireRendezVousHospitaliers.controllers;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Doctor;
import com.MongoSpring.GestionnaireRendezVousHospitaliers.repository.DoctorRepository;
import com.MongoSpring.GestionnaireRendezVousHospitaliers.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable String id) {
        Optional<Doctor> doctor = doctorService.getDoctorById(id);
        return doctor.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<Doctor> getDoctorByDoctorId(@PathVariable String doctorId) {
        Optional<Doctor> doctor = doctorService.getDoctorByDoctorId(doctorId);
        return doctor.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.createDoctor(doctor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable String id, @RequestBody Doctor doctorDetails) {
        Doctor updatedDoctor = doctorService.updateDoctor(id, doctorDetails);
        return updatedDoctor != null ? ResponseEntity.ok(updatedDoctor) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable String id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/specialization/{specialization}")
    public List<Doctor> getDoctorsBySpecialization(@PathVariable String specialization) {
        return doctorService.getDoctorsBySpecialization(specialization);
    }

    @GetMapping("/search")
    public List<Doctor> searchDoctors(@RequestParam String name) {
        return doctorService.searchDoctors(name);
    }

    @GetMapping("/count")
    public long getTotalDoctors() {
        return doctorService.getTotalDoctors();
    }

    // Utiliser DoctorRepository.SpecialtyCount directement
    @GetMapping("/specialties")
    public List<DoctorRepository.SpecialtyCount> getDoctorsBySpecialty() {
        return doctorService.getDoctorsBySpecialty();
    }
}