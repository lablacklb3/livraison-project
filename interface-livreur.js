// =======================
// Gestion de la géolocalisation
// =======================
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

// =======================
// Gestion des produits
// =======================
let produits = [];

function ajouterProduit() {
    const nom = document.getElementById("nomProduit").value.trim();
    const prix = parseFloat(document.getElementById("prixProduit").value);

    if (!nom || isNaN(prix) || prix < 0) {
        alert("Veuillez entrer un nom et un prix valide.");
        return;
    }

    produits.push({ nom, prix: prix.toFixed(2) });
    afficherProduits();
    document.getElementById("nomProduit").value = "";
    document.getElementById("prixProduit").value = "";
}

function afficherProduits() {
    const liste = document.getElementById("produitsListe");
    liste.innerHTML = "";
    produits.forEach((p, index) => {
        const li = document.createElement("div");
        li.innerHTML = `${p.nom} - ${p.prix} DA <button onclick="supprimerProduit(${index})">❌</button>`;
        liste.appendChild(li);
    });
}

function supprimerProduit(index) {
    produits.splice(index, 1);
    afficherProduits();
}

// =======================
// Passer une commande
// =======================
function passerCommande() {
    const client = localStorage.getItem("loggedUser");
    const adresse = document.getElementById("adresse").value.trim();
    const restaurant = document.getElementById("restaurant").value;
    let prixLivraison = parseFloat(document.getElementById("prixLivraison").value) || 300;
    if (prixLivraison < 300) prixLivraison = 300;

    if (!adresse || produits.length === 0) {
        alert("Veuillez remplir l'adresse et ajouter au moins un produit.");
        return;
    }

    const total = produits.reduce((sum, p) => sum + parseFloat(p.prix), 0) + prixLivraison;

    const commande = {
        id: client + "-" + Date.now(), // ID unique
        client,
        adresse,
        restaurant: restaurant || "Non spécifié",
        produits: [...produits],
        prixLivraison: prixLivraison.toFixed(2),
        total: total.toFixed(2),
        date: new Date().toLocaleString(),
        statut: "en attente"
    };

    // Stocker par client
    let commandesParClient = JSON.parse(localStorage.getItem("commandesParClient") || "{}");
    if (!commandesParClient[client]) commandesParClient[client] = [];
    commandesParClient[client].push(commande);
    localStorage.setItem("commandesParClient", JSON.stringify(commandesParClient));

    // Stocker toutes les commandes pour livreurs
    let toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes") || "[]");
    toutesCommandes.push(commande);
    localStorage.setItem("toutesCommandes", JSON.stringify(toutesCommandes));

    // Sauvegarder la commande en attente pour ce client
    localStorage.setItem("commandeEnAttente", JSON.stringify(commande));

    // Réinitialiser produits
    produits = [];
    afficherProduits();
    document.getElementById("prixLivraison").value = "";

    console.log("✅ COMMANDE AJOUTÉE :", commande);

    // Redirection vers attente
    window.location.href = "attente.html";
}

// =======================
// Vérifier si commande acceptée
// =======================
setInterval(() => {
    const client = localStorage.getItem("loggedUser");
    const commandesParClient = JSON.parse(localStorage.getItem("commandesParClient") || "{}");
    const commandesClient = commandesParClient[client] || [];
    const commande = commandesClient[commandesClient.length - 1]; // dernière commande

    if (commande && commande.statut === "acceptée") {
        window.location.href = "commande-client-accepter.html";
    }
}, 1000);


// Déconnexion & Toggle menu

function logout() {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("role");
    window.location.href = "index.html";
}

function toggleMenu() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('shift');
}
