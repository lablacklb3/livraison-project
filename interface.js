// Gestion de la géolocalisation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}

function showPosition(position) {
    const adresseInput = document.getElementById("adresse");
    adresseInput.value = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Permission de géolocalisation refusée.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informations de position non disponibles.");
            break;
        case error.TIMEOUT:
            alert("La demande de géolocalisation a expiré.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Erreur inconnue.");
            break;
    }
}

// Tableau pour stocker les commandes
let commandes = [];
let produits = []; // produits ajoutés avant envoi

// Ajouter un produit à la liste
function ajouterProduit() {
    const nom = document.getElementById("nomProduit").value.trim();
    const prix = parseFloat(document.getElementById("prixProduit").value);

    if (nom === "" || isNaN(prix) || prix < 0) {
        alert("Veuillez entrer un nom et un prix valide pour le produit.");
        return;
    }

    produits.push({ nom, prix: prix.toFixed(2) });
    afficherProduits();
    document.getElementById("nomProduit").value = "";
    document.getElementById("prixProduit").value = "";
}

// Afficher les produits ajoutés
function afficherProduits() {
    const liste = document.getElementById("produitsListe");
    liste.innerHTML = "";
    produits.forEach((p, index) => {
        const li = document.createElement("div");
        li.innerHTML = `${p.nom} - ${p.prix} € <button onclick="supprimerProduit(${index})">❌</button>`;
        liste.appendChild(li);
    });
}

// Supprimer un produit de la liste
function supprimerProduit(index) {
    produits.splice(index, 1);
    afficherProduits();
}




// Passer la commande
function passerCommande() {
    const adresse = document.getElementById("adresse").value.trim();
    const restaurant = document.getElementById("restaurant").value;

    // Prix de livraison minimum 300 DA
    let prixLivraison = parseFloat(document.getElementById("prixLivraison").value) || 300;
    if (prixLivraison < 300) prixLivraison = 300;

    if (adresse === "" || produits.length === 0) {
        alert("Veuillez remplir l'adresse et ajouter au moins un produit.");
        return;
    }

    let totalProduits = 0;
    produits.forEach(p => totalProduits += parseFloat(p.prix));
    const total = totalProduits + prixLivraison;

    const commande = {
        adresse,
        restaurant: restaurant || "Non spécifié",
        produits: [...produits],
        prixLivraison: prixLivraison.toFixed(2),
        total: total.toFixed(2),
        date: new Date().toLocaleString(),
        statut: "en attente"
    };

    // 🔹 Ajouter la commande dans toutesCommandes pour le livreur
    let toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes") || "[]");
    toutesCommandes.push(commande);
    localStorage.setItem("toutesCommandes", JSON.stringify(toutesCommandes));

    // Sauvegarder la commande en attente pour le client
    localStorage.setItem("commandeEnAttente", JSON.stringify(commande));

    // Réinitialiser les produits
    produits = [];
    afficherProduits();
    document.getElementById("prixLivraison").value = "";

    // Redirection vers la page d'attente
    window.location.href = "attente.html";
}































// Déconnexion simple
function logout() {
    alert("Vous êtes déconnecté !");
    window.location.href = "index.html"; // à adapter selon votre page de login
}

// Toggle menu
function toggleMenu() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('shift');
}
