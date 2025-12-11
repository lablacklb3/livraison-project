// Vérifier si l'utilisateur est connecté et est un livreur
const username = localStorage.getItem("loggedUser");
const role = localStorage.getItem("role");

if (!username || role !== "livreur") {
  window.location.href = "index.html";
}

// Mettre à jour le titre
document.getElementById("welcome").textContent = "Bienvenue " + username;

// Charger toutes les commandes depuis localStorage
let commandes = JSON.parse(localStorage.getItem("commandes")) || [];

// Fonction pour afficher toutes les commandes
function afficherCommandes() {
  const liste = document.getElementById("listeCommandes");
  liste.innerHTML = "";

  commandes.forEach((cmd, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Client:</strong> ${cmd.client} |
      <strong>Produit:</strong> ${cmd.produit} |
      <strong>Adresse:</strong> ${cmd.adresse} |
      <strong>Restaurant:</strong> ${cmd.restaurant || "Non spécifié"}
      <br>
      <button onclick="accepterCommande(${index})" class="btn small">Accepter</button>
      <button onclick="annulerCommande(${index})" class="btn small cancel">Annuler</button>
    `;
    liste.appendChild(li);
  });
}

// Fonction accepter une commande
function accepterCommande(index) {
  commandes[index].status = "acceptée";
  localStorage.setItem("commandes", JSON.stringify(commandes));
  alert(`Commande de ${commandes[index].client} acceptée !`);
  afficherCommandes();
}

// Fonction annuler une commande
function annulerCommande(index) {
  commandes[index].status = "annulée";
  localStorage.setItem("commandes", JSON.stringify(commandes));
  alert(`Commande de ${commandes[index].client} annulée !`);
  afficherCommandes();
}

// Fonction déconnexion
function logout() {
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("role");
  window.location.href = "index.html";
}

// Afficher les commandes au chargement
afficherCommandes();
