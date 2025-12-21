const commande = JSON.parse(localStorage.getItem("commandeEnAttente"));
const livreur = localStorage.getItem("loggedUser");

if (!commande || commande.livreur !== livreur) {
    window.location.href = "livreur.html";
}
const details = document.getElementById("details");

const produitsHTML = commande.produits && commande.produits.length
    ? commande.produits.map(p => `• ${p.nom} - ${p.prix} DA`).join("<br>")
    : "Aucun produit";

details.innerHTML = `
    <h3>Détails de la commande</h3>

    <p><strong>Client :</strong> ${commande.client}</p>

    <p><strong>Adresse :</strong> ${commande.adresse}</p>

    <p><strong>Produits commandés :</strong><br>
        ${produitsHTML}
    </p>

    <p><strong>Total :</strong> ${commande.total} DA</p>

    <p><strong>Date :</strong> ${commande.date}</p>
`;

// Position du client
if (commande.adresse.includes("Latitude")) {
    const coords = commande.adresse.match(/-?\d+\.\d+/g);

    if (coords && coords.length >= 2) {
        const lat = coords[0];
        const lng = coords[1];

        document.getElementById("mapClient").src =
            `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    }
}


function terminerCommande() {
    let toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes")) || [];

    const index = toutesCommandes.findIndex(c => c.id === commande.id);
    if (index !== -1) {
        toutesCommandes[index].statut = "terminée";
        localStorage.setItem("toutesCommandes", JSON.stringify(toutesCommandes));
    }

    localStorage.removeItem("commandeEnAttente");

    alert("Livraison terminée avec succès ✔");
    window.location.href = "livreur.html";
}

function partagerPositionLivreur() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(pos => {
        const position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            date: Date.now()
        };

        localStorage.setItem("positionLivreur", JSON.stringify(position));
    });
}

// Mise à jour toutes les 3 secondes
setInterval(partagerPositionLivreur, 3000);




// Vérifier si une commande a été annulée par le client
function verifierAnnulation() {
    let toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes")) || [];

    // Vérifier les commandes en cours du livreur
    toutesCommandes.forEach(c => {
        if (c.livreur === username && c.annuleParClient) {
            alert(`⚠️ La commande du client ${c.client} a été annulée !`);
            
            // Supprimer la commande annulée de la liste
            c.annuleParClient = false; // reset flag
            c.statut = "annulée";
            localStorage.setItem("toutesCommandes", JSON.stringify(toutesCommandes));

            // Rediriger le livreur vers la page principale
            window.location.href = "livreur.html";
        }
    });
}

// Vérifier toutes les 2 secondes
setInterval(verifierAnnulation, 2000);

function livraisonTerminee() {
    if (!confirm("Confirmer que la livraison est terminée ?")) return;

    let toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes")) || [];
    // Trouver la commande en cours du livreur
    const index = toutesCommandes.findIndex(c => c.livreur === username && c.statut === "acceptée");

    if (index !== -1) {
        toutesCommandes[index].statut = "terminée";
        localStorage.setItem("toutesCommandes", JSON.stringify(toutesCommandes));
        alert("Livraison terminée ✔");
    }

    // Redirection vers la page principale du livreur
    window.location.href = "livreur.html";
}

function annulerCommandeLivreur() {
    if (!confirm("Voulez-vous vraiment annuler cette livraison ?")) return;

    // Récupérer la commande en cours
    const commande = JSON.parse(localStorage.getItem("commandeEnAttente"));
    if (!commande) return;

    // Mettre le statut à annulée
    commande.statut = "annulée";

    // 🔔 Notification côté client
    localStorage.setItem("notificationClient", JSON.stringify({
        message: "❌ Le livreur a annulé la commande",
        date: new Date().toLocaleString()
    }));

    // Mettre à jour la liste globale des commandes
    let toutesCommandes = JSON.parse(localStorage.getItem("toutesCommandes")) || [];
    toutesCommandes = toutesCommandes.map(c =>
        c.id === commande.id ? commande : c
    );
    localStorage.setItem("toutesCommandes", JSON.stringify(toutesCommandes));

    // Nettoyage localStorage livreur
    localStorage.removeItem("commandeEnAttente");
    localStorage.removeItem("positionLivreur");

    alert("Commande annulée.");

    // Redirection livreur
    window.location.replace("livreur.html");
}
// Vérifier toutes les 2 secondes si la commande côté client a été annulée
setInterval(() => {
    const commande = JSON.parse(localStorage.getItem("commandeEnAttente"));
    if (!commande) return; // pas de commande en cours

    // Si le statut est annulée, redirection automatique
    if (commande.statut === "annulée") {
        alert("❌ Le client a annulé la commande !");
        localStorage.removeItem("commandeEnAttente");
        localStorage.removeItem("positionLivreur");
        window.location.href = "livreur.html";
    }
}, 2000);
