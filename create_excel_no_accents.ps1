$xlsxFile = "c:\Users\fridh\OneDrive\Bureau\baazarnet\LIVRABLES_BAAZAARNET\01_Documentation\Matrice_Tracabilite.xlsx"

# Data Array (Array of Arrays) - NO ACCENTS
$data = @(
    @("Epic", "User story", "Condition de Test", "Type de cas de Test", "ID cas de test", "Nom de cas de test", "Description", "JDD"),
    @("EPIC 1: Authentification", "US-01: Inscription utilisateur", "Verifier l'inscription avec des donnees valides (Client)", "Fonctionnel-Manuel", "TC-AUTH-001", "Inscription avec donnees valides (Client)", "En tant que visiteur, je veux creer un compte client pour acceder au site", "Nom='Jean', Email='jean@test.com', Mdp='123456', Role='Client'"),
    @("EPIC 1: Authentification", "US-01: Inscription utilisateur", "Verifier l'inscription avec des donnees valides (Vendeur)", "Fonctionnel-Manuel", "TC-AUTH-002", "Inscription avec donnees valides (Vendeur)", "En tant que visiteur, je veux creer un compte vendeur pour vendre des produits", "Nom='Shop', Email='shop@test.com', Mdp='123456', Role='Vendeur'"),
    @("EPIC 1: Authentification", "US-01: Inscription utilisateur", "Verifier le rejet d'un email deja existant", "Fonctionnel-Automatise", "TC-AUTH-003", "Inscription avec email deja existant", "Le systeme doit refuser l'inscription si l'email est deja utilise", "Email='existant@test.com' (deja en base)"),
    @("EPIC 1: Authentification", "US-02: Connexion securisee", "Verifier la connexion avec identifiants valides", "Fonctionnel-Automatise", "TC-AUTH-005", "Connexion avec email/mdp valides", "En tant qu'utilisateur, je veux me connecter pour acceder a mon espace", "Email='client@test.com', Mdp='123456'"),
    @("EPIC 1: Authentification", "US-02: Connexion securisee", "Verifier le rejet d'un mot de passe incorrect", "Fonctionnel-Automatise", "TC-AUTH-006", "Connexion avec mot de passe incorrect", "Le systeme doit refuser la connexion si le mot de passe est faux", "Email='client@test.com', Mdp='fauxpass'"),
    @("EPIC 1: Authentification", "US-03: Gestion du profil", "Verifier la modification des infos personnelles", "Fonctionnel-Manuel", "TC-USR-001", "Modification des informations personnelles", "En tant qu'utilisateur, je veux mettre a jour mon profil", "Nouveau Nom='Jean Modif', Nouveau Tel='0600000000'"),
    @("EPIC 2: Catalogue & Achat", "US-05: Catalogue produits", "Verifier l'affichage de la liste des produits", "Fonctionnel-Manuel", "TC-CAT-001", "Affichage de la liste des produits", "En tant que client, je veux voir les produits disponibles", "Base de donnees avec 5 produits actifs"),
    @("EPIC 2: Catalogue & Achat", "US-05: Catalogue produits", "Verifier le filtrage par categorie", "Fonctionnel-Manuel", "TC-CAT-002", "Filtrage par categorie", "En tant que client, je veux filtrer les produits par categorie", "Categorie='Electronique'"),
    @("EPIC 2: Catalogue & Achat", "US-06: Details produit", "Verifier l'affichage des details et de l'image", "UI-Manuel", "TC-CAT-004", "Affichage details et image grand format", "En tant que client, je veux voir la fiche detaillee d'un produit", "Produit ID=1 avec Image URL valide"),
    @("EPIC 2: Catalogue & Achat", "US-07: Gestion panier", "Verifier l'ajout d'un produit au panier", "Fonctionnel-Automatise", "TC-CART-001", "Ajout d'un produit au panier", "En tant que client, je veux ajouter un article a mon panier", "Produit ID=1, Stock > 0"),
    @("EPIC 2: Catalogue & Achat", "US-08: Passage commande", "Verifier la validation de la commande", "Fonctionnel-Manuel", "TC-ORD-001", "Validation panier et creation commande", "En tant que client, je veux valider mon panier pour commander", "Panier non vide, Adresse livraison valide"),
    @("EPIC 2: Catalogue & Achat", "US-08: Passage commande", "Verifier la decrementation du stock", "Integration-Automatise", "TC-ORD-002", "Verification decrementation stock", "Le stock du produit doit diminuer apres commande", "Produit ID=1, Stock Initial=10 -> Stock Final=9"),
    @("EPIC 3: Espace Vendeur", "US-10: Creation produit", "Verifier la creation d'un produit avec image", "Fonctionnel-Manuel", "TC-PROD-001", "Creation produit avec image valide", "En tant que vendeur, je veux ajouter un produit avec une photo", "Nom='T-shirt', Prix=20, Image='tshirt.jpg' (<5MB)"),
    @("EPIC 3: Espace Vendeur", "US-10: Creation produit", "Verifier la validation des champs requis", "Fonctionnel-Automatise", "TC-PROD-003", "Validation champs requis", "Le systeme doit refuser un produit sans prix ou nom", "Nom='', Prix=20 (Invalide)"),
    @("EPIC 3: Espace Vendeur", "US-11: Upload Image", "Verifier l'upload d'une image JPG valide", "Technique-Automatise", "TC-IMG-001", "Upload image JPG < 5MB", "Le systeme doit accepter les images JPG de taille correcte", "Fichier='photo.jpg', Taille=2MB"),
    @("EPIC 3: Espace Vendeur", "US-11: Upload Image", "Verifier le rejet d'une image trop lourde", "Technique-Automatise", "TC-IMG-003", "Tentative upload image > 5MB", "Le systeme doit refuser les fichiers > 5MB (Erreur 413)", "Fichier='lourd.jpg', Taille=6MB"),
    @("EPIC 3: Espace Vendeur", "US-11: Upload Image", "Verifier la previsualisation de l'image", "UI-Manuel", "TC-IMG-005", "Preview image avant soumission", "Le vendeur doit voir l'image avant de valider", "Fichier image selectionne dans l'input"),
    @("EPIC 3: Espace Vendeur", "US-12: Modif produit", "Verifier la modification du prix", "Fonctionnel-Manuel", "TC-PROD-004", "Modification prix et stock", "En tant que vendeur, je veux changer le prix d'un produit", "Produit ID=1, Nouveau Prix=25"),
    @("EPIC 3: Espace Vendeur", "US-14: Ventes Vendeur", "Verifier l'affichage de l'historique", "Fonctionnel-Manuel", "TC-VEND-002", "Affichage historique des ventes", "En tant que vendeur, je veux voir mes ventes passees", "Compte vendeur avec 2 commandes recues"),
    @("EPIC 4: Administration", "US-15: Admin Users", "Verifier la liste des utilisateurs", "Fonctionnel-Manuel", "TC-ADM-001", "Liste complete des utilisateurs", "En tant qu'admin, je veux voir tous les inscrits", "Compte Admin connecte"),
    @("EPIC 4: Administration", "US-16: Admin Produits", "Verifier la suppression d'un produit", "Fonctionnel-Manuel", "TC-ADM-003", "Suppression produit illicite", "En tant qu'admin, je veux supprimer un produit interdit", "Produit ID=5 (a supprimer)"),
    @("EPIC 5: Non-Fonctionnel", "NFR-01: Securite Upload", "Verifier le type MIME", "Securite-Automatise", "TC-SEC-001", "Verification type MIME cote serveur", "Le serveur ne doit accepter que les images", "Fichier='virus.exe' renomme en .jpg"),
    @("EPIC 5: Non-Fonctionnel", "NFR-02: Limite Serveur", "Verifier la limite de payload", "Performance-Automatise", "TC-PERF-001", "Test charge payload 49MB", "Le serveur doit accepter jusqu'a 50MB", "Payload JSON de 49MB")
)

try {
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    
    $workbook = $excel.Workbooks.Add()
    $sheet = $workbook.Worksheets.Item(1)
    
    # Write data
    for ($i = 0; $i -lt $data.Count; $i++) {
        for ($j = 0; $j -lt $data[$i].Count; $j++) {
            $sheet.Cells.Item($i + 1, $j + 1) = $data[$i][$j]
        }
    }
    
    # Formatting
    $headerRange = $sheet.Range("A1", "H1")
    $headerRange.Font.Bold = $true
    $headerRange.Interior.ColorIndex = 15 # Light Gray
    
    $sheet.Columns.AutoFit()
    
    # Save
    $workbook.SaveAs($xlsxFile)
    $workbook.Close()
    $excel.Quit()
    
    Write-Host "Excel file created successfully"
}
catch {
    Write-Host "Error: $_"
    exit 1
}
finally {
    if ($excel) {
        [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
    }
}
