package com.MongoSpring.GestionnaireRendezVousHospitaliers.services;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Doctor;
import com.MongoSpring.GestionnaireRendezVousHospitaliers.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> getDoctorById(String id) {
        return doctorRepository.findById(id);
    }

    public Optional<Doctor> getDoctorByDoctorId(String doctorId) {
        return doctorRepository.findByDoctorId(doctorId);
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(String id, Doctor doctorDetails) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        if (doctor.isPresent()) {
            Doctor existingDoctor = doctor.get();
            existingDoctor.setName(doctorDetails.getName());
            existingDoctor.setSpecialization(doctorDetails.getSpecialization());
            existingDoctor.setEmail(doctorDetails.getEmail());
            existingDoctor.setPhone(doctorDetails.getPhone());
            existingDoctor.setWorkingDays(doctorDetails.getWorkingDays());
            return doctorRepository.save(existingDoctor);
        }
        return null;
    }

    public void deleteDoctor(String id) {
        doctorRepository.deleteById(id);
    }

    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

    public List<Doctor> searchDoctors(String name) {
        return doctorRepository.findByNameContainingIgnoreCase(name);
    }

    public long getTotalDoctors() {
        return doctorRepository.count();
    }

    // Utiliser l'interface du repository directement
    public List<DoctorRepository.SpecialtyCount> getDoctorsBySpecialty() {
        return doctorRepository.countBySpecialization();
    }
}