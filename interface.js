// Vérifier si l'utilisateur est connecté
const username = localStorage.getItem("loggedUser");
const role = localStorage.getItem("role");

if (!username || role !== "client") {
  window.location.href = "index.html"; // redirection si non connecté ou mauvais rôle
}

// Mettre à jour le titre
document.getElementById("welcome").textContent = "Bienvenue " + username;

// Charger les commandes depuis localStorage
let commandes = JSON.parse(localStorage.getItem("commandes")) || [];

// Fonction pour afficher les commandes de cet utilisateur
function afficherCommandes() {
  const liste = document.getElementById("listeCommandes");
  liste.innerHTML = "";

  const userCommandes = commandes.filter(cmd => cmd.client === username);

  userCommandes.forEach(cmd => {
    const li = document.createElement("li");
    li.textContent = `Produit: ${cmd.produit} | Adresse: ${cmd.adresse}`;
    if (cmd.restaurant) {
      li.textContent += ` | Restaurant: ${cmd.restaurant}`;
    }
    liste.appendChild(li);
  });
}

// Fonction pour passer une commande
function passerCommande() {
  const adresse = document.getElementById("adresse").value;
  const produit = document.getElementById("produit").value;
  const restaurant = document.getElementById("restaurant").value;

  if (!adresse || !produit) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  // Ajouter la nouvelle commande avec le client
  commandes.push({ adresse, produit, restaurant: restaurant || "Non spécifié", client: username });

  // Enregistrer dans localStorage
  localStorage.setItem("commandes", JSON.stringify(commandes));

  // Réinitialiser les champs
  document.getElementById("adresse").value = "";
  document.getElementById("produit").value = "";
  document.getElementById("restaurant").value = "";

  afficherCommandes();
}

// Fonction géolocalisation
function getLocation() {
  const adresseInput = document.getElementById("adresse");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        adresseInput.value = `Latitude: ${lat}, Longitude: ${lon}`;
        // Optionnel : utiliser une API pour convertir en adresse réelle
      },
      (error) => {
        alert("Impossible d'obtenir la localisation : " + error.message);
      }
    );
  } else {
    alert("La géolocalisation n'est pas supportée par votre navigateur.");
  }
}

// Fonction déconnexion
function logout() {
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("role");
  window.location.href = "index.html";
}

// Afficher les commandes au chargement
afficherCommandes();
function verifierCommandes() {
  let commandes = JSON.parse(localStorage.getItem("commandes")) || [];

  // Filtrer les commandes de cet utilisateur
  const userCommandes = commandes.filter(cmd => cmd.client === username);

  // Vérifier si une commande a été acceptée et n'a pas encore été notifiée
  userCommandes.forEach(cmd => {
    if (cmd.status === "acceptée" && !cmd.notified) {
      // Marquer comme notifiée pour ne pas répéter
      cmd.notified = true;
      localStorage.setItem("commandes", JSON.stringify(commandes));

      // Ouvrir la page de confirmation
      window.open("commandeacceptee.html", "_blank", "width=400,height=300");
    }
  });
}
