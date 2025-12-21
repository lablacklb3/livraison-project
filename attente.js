// Charger la commande en attente
let commande = JSON.parse(localStorage.getItem("commandeEnAttente"));

if (!commande) {
    window.location.href = "client.html";
}

// Afficher les détails de la commande
const details = document.getElementById("detailsCommande");
const NOM= document.getElementById("nom");
details.innerHTML = `
    <h3>Détails de la commande</h3>
    <p><strong>Restaurant :</strong> ${commande.restaurant || "Non spécifié"}</p>
    <p><strong>Total :</strong> ${commande.total || 0} DA</p>
    <p><strong>Date :</strong> ${commande.date || ""}</p>
    <p><strong>Statut :</strong> ${commande.statut || "En attente"}</p>
`;

// =======================
// VÉRIFICATION STATUT (CORRIGÉE)
// =======================
const checkStatus = setInterval(() => {
    const commandeActuelle = JSON.parse(localStorage.getItem("commandeEnAttente"));
    if (!commandeActuelle) return;

    if (commandeActuelle.statut === "acceptée") {
        clearInterval(checkStatus); // 🔥 IMPORTANT
        window.location.replace("commande-client-accepter.html");
    }
}, 2000);

// =======================
// ANNULATION COMMANDE
// =======================
function annulerCommande(raison) {
    if (confirm(`Êtes-vous sûr de vouloir annuler ?\nRaison : ${raison}`)) {
        
        localStorage.removeItem("commandeEnAttente");
        alert(`Commande annulée ✔\nRaison : ${raison}`);
        window.location.replace("client.html");
    }
}

// =======================
// AFFICHER RAISONS
// =======================
function afficherRaisons() {
    document.getElementById("raisonContainer").style.display = "block";
}
