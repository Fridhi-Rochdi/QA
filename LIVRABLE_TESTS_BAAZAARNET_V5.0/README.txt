================================================================================
                   LIVRABLE DE VALIDATION - PROJET BAZAARNET
================================================================================
Version : 5.0
Date    : 05 Decembre 2025
Auteur  : Fridhi Rochdi
================================================================================

CONTENU DU DOSSIER :

1. 01_DOCUMENTS/
   ----------------
   Contient la documentation officielle du projet.
   - PLAN_DE_TEST_BAAZAARNET.tex : Le rapport complet (Backlog, Stratégie, Résultats).
     (Note : Ce fichier LaTeX peut être compilé en PDF).

2. 02_TESTS_AUTOMATISES/
   ---------------------
   Contient le code source des tests.
   - backend/ : Tests d'intégration API (Jest/Supertest).
   - frontend/ : Tests End-to-End (Cypress).

3. 03_RAPPORTS_EXECUTION/
   ----------------------
   Contient les rapports générés automatiquement après l'exécution des tests.
   - mochawesome.json : Rapport brut des tests Backend.
   - (Autres rapports HTML générés par les outils CI/CD).

4. 04_PREUVES/
   -------------
   Contient les preuves visuelles de la validation.
   - demo_execution_tests.mp4 : Vidéo complète du scénario de test E2E.

================================================================================
INSTRUCTIONS D'INSTALLATION ET D'EXECUTION
================================================================================

A. EXECUTION DES TESTS BACKEND
   1. Aller dans 02_TESTS_AUTOMATISES/backend
   2. Installer les dépendances : npm install
   3. Lancer les tests : npm test

B. EXECUTION DES TESTS FRONTEND
   1. Aller dans 02_TESTS_AUTOMATISES/frontend
   2. Installer les dépendances : npm install
   3. Lancer Cypress : npx cypress open

================================================================================
FIN DU FICHIER
================================================================================
