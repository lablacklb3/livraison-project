// =======================
// RÉCUPÉRER COMMANDE
// =======================
const commande = JSON.parse(localStorage.getItem("commandeEnAttente"));

if (!commande || commande.statut !== "acceptée") {
    window.location.href = "client.html";
}

// =======================
// AFFICHER DÉTAILS
// =======================
const details = document.getElementById("details");




details.innerHTML = `
    <h3>Détails de la commande</h3>
    <p><strong>Restaurant :</strong> ${commande.restaurant}</p>
    <p><strong>Total :</strong> ${commande.total} DA</p>
    <p><strong>Livreur :</strong> ${commande.livreur || "En cours..."}</p>
    <p><strong>Adresse :</strong> ${commande.adresse}</p>
    <p><strong>Date :</strong> ${commande.date}</p>
`;

// =======================
// CARTE LIVREUR (TEMPS RÉEL)
// =======================
function updateMapLivreur() {
    const positionLivreur = JSON.parse(localStorage.getItem("positionLivreur"));
    if (!positionLivreur) return;

    const map = document.getElementById("mapLivreur");
    map.src = `https://maps.google.com/maps?q=${positionLivreur.lat},${positionLivreur.lng}&z=15&output=embed`;
}

// Rafraîchir toutes les 3 secondes
setInterval(updateMapLivreur, 3000);
updateMapLivreur();

// =======================
// MENU DYNAMIQUE
// =======================
function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("active");
    document.querySelector(".content").classList.toggle("shift");
}

function showSection(id) {
    document.querySelectorAll(".section").forEach(sec =>
        sec.classList.remove("active")
    );

    document.getElementById(id).classList.add("active");
    toggleMenu();
}

// =======================
// ANNULER COMMANDE
// =======================
function annulerCommande() {
    if (!confirm("❌ Voulez-vous vraiment annuler la commande ?")) return;

    let toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes")) || [];
    const index = toutesCommandes.findIndex(c => c.id === commande.id);

    if (index !== -1) {
        toutesCommandes[index].statut = "annulée";
        localStorage.setItem("toutesCommandes", JSON.stringify(toutesCommandes));
    }

    localStorage.removeItem("commandeEnAttente");
    alert("Commande annulée ✔");
    window.location.href = "client.html";
}

// =======================
// DÉCONNEXION
// =======================
function logout() {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("role");
    localStorage.removeItem("commandeEnAttente");
    window.location.href = "index.html";
}

// Vérifier si le livreur a terminé la livraison
function verifierLivraisonTerminee() {
    const commande = JSON.parse(localStorage.getItem("commandeEnAttente"));
    if (!commande) return;

    const toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes")) || [];
    const cmd = toutesCommandes.find(c => c.id === commande.id);

    if (cmd && cmd.statut === "terminée") {
        alert("✅ Votre commande a été livrée !");
        localStorage.removeItem("commandeEnAttente"); // supprimer commande en attente
        window.location.href = "client.html"; // redirection automatique
    }
}

// Vérifier toutes les 2 secondes
setInterval(verifierLivraisonTerminee, 2000);


// si le livreur annule la commande 
setInterval(() => {
    const notif = JSON.parse(localStorage.getItem("notificationClient"));
    if (notif) {
        alert(notif.message);
        localStorage.removeItem("notificationClient");

        // Retour automatique client
        window.location.replace("client.html");
    }
}, 2000);



function terminerCommande() {
    const client = localStorage.getItem("loggedUser");

    // Supprimer la commande en attente pour ce client
    localStorage.removeItem("commandeEnAttente");

    // Supprimer la commande du tableau des commandes par client
    let commandesParClient = JSON.parse(localStorage.getItem("commandesParClient") || "{}");
    if (commandesParClient[client]) {
        // On prend la dernière commande en attente et on la marque comme terminée
        let commandes = commandesParClient[client];
        if (commandes.length > 0) {
            commandes[commandes.length - 1].statut = "terminée";
            localStorage.setItem("commandesParClient", JSON.stringify(commandesParClient));
        }
    }

    // Redirection vers client.html
    window.location.href = "client.html";
}
