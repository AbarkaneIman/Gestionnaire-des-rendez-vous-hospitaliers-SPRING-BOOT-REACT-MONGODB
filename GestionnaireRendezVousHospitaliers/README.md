# Gestionnaire de Rendez-vous Hospitaliers (GRH)

[![Java](https://img.shields.io/badge/Java-17-blue?logo=java)](https://www.oracle.com/java/) 
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?logo=spring)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-3.9-red?logo=apache-maven)](https://maven.apache.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen?logo=mongodb)](https://www.mongodb.com/)

---

## Description
**GRH** est une application Java développée avec **Spring Boot** et utilisant **MongoDB**.  
Elle permet aux patients de **réserver, modifier ou annuler des rendez-vous** avec des médecins, et aux administrateurs de gérer **patients, médecins et plannings** de manière efficace.  

L’application fournit également :
- Rapports et statistiques sur les rendez-vous
- API REST pour intégration avec interfaces web ou mobiles

---

## Fonctionnalités principales

### Gestion des patients
- Ajouter, modifier, consulter ou supprimer un patient  
- Rechercher un patient par nom ou identifiant  

### Gestion des médecins
- Ajouter, modifier ou supprimer un médecin  
- Gérer les informations : nom, spécialité, coordonnées, disponibilité  
- Rechercher par nom ou spécialité  

### Gestion des rendez-vous
- Réserver, mettre à jour ou annuler un rendez-vous  
- Vérifier la disponibilité des créneaux avant réservation  
- Afficher les rendez-vous à venir par date ou par médecin  
- Marquer automatiquement les rendez-vous passés comme terminés  

### Rapports et statistiques
- Nombre de rendez-vous par médecin ou spécialité  
- Identifier les patients ayant plusieurs visites récentes  
- Afficher les créneaux horaires disponibles pour un médecin à une date donnée  

---

## Technologies utilisées
| Technologie       | Version |
|------------------|---------|
| Java              | 17      |
| Spring Boot       | 3.2     |
| Spring Data MongoDB | 3.7   |
| MongoDB           | 6.0     |
| Maven             | 3.9     |
| Optionnel         | Thymeleaf |

---

## Installation & Utilisation

1. **Cloner le dépôt** :
```bash
git clone https://github.com/tonCompte/GRH-SpringBoot.git
