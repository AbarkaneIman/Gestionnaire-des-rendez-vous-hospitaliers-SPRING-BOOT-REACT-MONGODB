package com.example.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "patients")
public class Patient {

    @Id
    private String id;

    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
    private String cin;
    private int age;
    private String address;
    private String sexe;
    private String maladie;

    public Patient() {}

    public Patient(String firstName, String lastName, String phone, String email, String password,
                String cin, int age, String address, String sexe, String maladie) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.cin = cin;
        this.age = age;
        this.address = address;
        this.sexe = sexe;
        this.maladie = maladie;
    }

    // GETTERS & SETTERS
    // (générés automatiquement من IntelliJ أو Eclipse)
}
