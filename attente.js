// Charger la commande en attente
let commande = JSON.parse(localStorage.getItem("commandeEnAttente"));

if (!commande) {
    window.location.href = "client.html";
}

// Afficher les détails de la commande
const details = document.getElementById("detailsCommande");
details.innerHTML = `
    <h3>Détails de la commande</h3>
    <p><strong>Restaurant :</strong> ${commande.restaurant || "Non spécifié"}</p>
    <p><strong>Total :</strong> ${commande.total || 0} DA</p>
    <p><strong>Date :</strong> ${commande.date || ""}</p>
    <p><strong>Statut :</strong> ${commande.statut || "En attente"}</p>
`;

// Vérifier le statut toutes les 2 secondes
setInterval(() => {
    commande = JSON.parse(localStorage.getItem("commandeEnAttente"));
    if (!commande) return; // commande supprimée

    if (commande.statut === "acceptée") {
        // Redirection automatique vers commande-client-accepter.html
        window.location.href = "commande-client-accepter.html";
    }
}, 2000);

// Fonction pour annuler la commande
function annulerCommande(raison) {
    if(confirm(`Êtes-vous sûr de vouloir annuler ?\nRaison : ${raison}`)) {
        localStorage.removeItem("commandeEnAttente");
        alert(`Commande annulée ✔\nRaison : ${raison}`);
        window.location.replace("client.html");
    }
}

// Afficher les raisons
function afficherRaisons() {
    document.getElementById("raisonContainer").style.display = "block";
}
