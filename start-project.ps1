# start-complete.ps1
Write-Host "=== DEMARRAGE COMPLET DU PROJET ===" -ForegroundColor Green

# Étape 1: Vérifier MongoDB
Write-Host "`n1. VERIFICATION MONGODB..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService -and $mongoService.Status -eq 'Running') {
    Write-Host "   ✅ MongoDB est en cours d'exécution" -ForegroundColor Green
} else {
    Write-Host "   ❌ MongoDB n'est pas démarré. Démarrage..." -ForegroundColor Red
    Start-Service -Name MongoDB
    Start-Sleep -Seconds 3
}

# Étape 2: Démarrer le backend Spring Boot
Write-Host "`n2. DEMARRAGE BACKEND SPRING BOOT..." -ForegroundColor Yellow
$backendProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c mvn spring-boot:run" -WorkingDirectory "GestionnaireRendezVousHospitaliers" -PassThru
Write-Host "   Backend démarré (PID: $($backendProcess.Id))" -ForegroundColor Green
Write-Host "   Attendez 15 secondes que Spring Boot soit complètement démarré..." -ForegroundColor Cyan
Start-Sleep -Seconds 15

# Étape 3: Démarrer le frontend React
Write-Host "`n3. DEMARRAGE FRONTEND REACT..." -ForegroundColor Yellow
$frontendProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm start" -WorkingDirectory "frontend" -PassThru
Write-Host "   Frontend démarré (PID: $($frontendProcess.Id))" -ForegroundColor Green

Write-Host "`n=== PROJET COMPLETEMENT DEMARRE ===" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`nAppuyez sur Entrée pour arrêter tous les services..." -ForegroundColor Yellow
Read-Host

# Arrêter les processus
Stop-Process -Id $backendProcess.Id -Force
Stop-Process -Id $frontendProcess.Id -Force
Write-Host "Services arrêtés." -ForegroundColor Green