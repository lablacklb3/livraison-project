// =======================
// Vérification connexion
// =======================
const username = localStorage.getItem("loggedUser");
const role = localStorage.getItem("role");

if (!username || role !== "livreur") {
    window.location.href = "index.html";
}

// Message de bienvenue
document.getElementById("welcome").textContent = "Bienvenue " + username;

// =======================
// Afficher commandes
// =======================

function afficherCommandesLivreur() {
    const liste = document.getElementById("listeCommandes");
    liste.innerHTML = "";

    // Récupérer toutes les commandes depuis le localStorage
    let toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes")) || [];

    // Filtrer uniquement celles en attente
    let commandesEnAttente = toutesCommandes.filter(c => c.statut === "en attente");

    if (commandesEnAttente.length === 0) {
        liste.innerHTML = "<li>Aucune commande en attente</li>";
        return;
    }

    commandesEnAttente.forEach((c) => {
        const li = document.createElement("li");
        const produitsHTML = c.produits.map(p => `${p.nom} - ${p.prix} DA`).join("<br>");

        li.innerHTML = `
            <strong>Client :</strong> ${c.client}<br>
            <strong>Produits :</strong><br>${produitsHTML}<br>
            Restaurant : ${c.restaurant}<br>
            Livraison : ${c.prixLivraison} DA<br>
            <strong>Total : ${c.total} DA</strong><br>
            Adresse : ${c.adresse}<br>
            Date : ${c.date}<br>
            <strong>Statut :</strong> ${c.statut}<br><br>
            <button onclick="accepterCommandeLivreur('${c.id}')">✅ Accepter</button>
        `;

        liste.appendChild(li);
    });
}


function accepterCommandeLivreur(idCommande) {
    let toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes")) || [];

    const index = toutesCommandes.findIndex(c => c.id == idCommande);
    if (index === -1) return;

    // Changer le statut et ajouter le livreur
    const user = localStorage.getItem("loggedUser");
    toutesCommandes[index].statut = "acceptée";
    toutesCommandes[index].livreur = user;

    // Sauvegarder
    localStorage.setItem("toutesCommandes", JSON.stringify(toutesCommandes));

    // Mettre à jour la commande côté client
    localStorage.setItem("commandeEnAttente", JSON.stringify(toutesCommandes[index]));

    alert("Commande acceptée !");

    // 🔹 Redirection sécurisée
    window.location.replace("CommandeAccepterLivreur.html");
}
















// =======================
// Déconnexion
// =======================
function logout() {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("role");
    window.location.href = "index.html";
}

// =======================
// Rafraîchissement auto
// =======================
setInterval(afficherCommandesLivreur, 1000);
// =======================
// MENU DYNAMIQUE
// =======================
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

// Toggle menu
menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    content.classList.toggle("shift");
});

// Navigation entre sections
document.querySelectorAll(".sidebar a[data-section]").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const sectionId = link.getAttribute("data-section");

        document.querySelectorAll(".section").forEach(sec =>
            sec.classList.remove("active")
        );

        document.getElementById(sectionId).classList.add("active");

        // Fermer menu après clic
        sidebar.classList.remove("active");
        content.classList.remove("shift");
    });
});

// Afficher commandes par défaut
document.getElementById("profilNom").textContent = username;

