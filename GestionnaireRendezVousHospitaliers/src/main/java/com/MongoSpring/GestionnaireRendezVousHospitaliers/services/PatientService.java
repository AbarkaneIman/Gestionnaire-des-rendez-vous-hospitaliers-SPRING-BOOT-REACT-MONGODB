package com.MongoSpring.GestionnaireRendezVousHospitaliers.services;

import com.MongoSpring.GestionnaireRendezVousHospitaliers.model.Patient;
import com.MongoSpring.GestionnaireRendezVousHospitaliers.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(String id) {
        return patientRepository.findById(id);
    }

    public Optional<Patient> getPatientByPatientId(String patientId) {
        return patientRepository.findByPatientId(patientId);
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(String id, Patient patientDetails) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            Patient existingPatient = patient.get();
            existingPatient.setName(patientDetails.getName());
            existingPatient.setDob(patientDetails.getDob());
            existingPatient.setGender(patientDetails.getGender());
            existingPatient.setPhone(patientDetails.getPhone());
            existingPatient.setEmail(patientDetails.getEmail());
            existingPatient.setAddress(patientDetails.getAddress());
            return patientRepository.save(existingPatient);
        }
        return null;
    }

    public void deletePatient(String id) {
        patientRepository.deleteById(id);
    }

    public List<Patient> searchPatients(String name) {
        return patientRepository.findByNameContainingIgnoreCase(name);
    }

    public long getTotalPatients() {
        return patientRepository.count();
    }
}