const connectDB = require("./db");

async function main() {
  const db = await connectDB();

  // Récupérer tous les patients
  const patients = await db.collection("patients").find().toArray();
  console.log("Patients :", patients);

  // Récupérer tous les docteurs
  const doctors = await db.collection("doctors").find().toArray();
  console.log("Doctors :", doctors);

  // Récupérer tous les rendez-vous
  const appointments = await db.collection("appointments").find().toArray();
  console.log("Appointments :", appointments);
}

main();
