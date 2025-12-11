// script.js

// Fonction pour login
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  // Charger utilisateurs depuis localStorage
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username].password === password) {
    // Stocker l'utilisateur connecté et son rôle
    localStorage.setItem("loggedUser", username);
    localStorage.setItem("role", users[username].role);

    // Redirection selon rôle
    if (users[username].role === "client") {
      window.location.href = "client.html";
    } else if (users[username].role === "livreur") {
      window.location.href = "livreur.html";
    }
  } else {
    error.textContent = "Identifiants incorrects";
  }
}

// Fonction pour créer un nouvel utilisateur
function createUser() {
  const username = document.getElementById("newUser").value;
  const password = document.getElementById("newPass").value;
  const role = document.getElementById("role").value; // récupère le rôle
  const msg = document.getElementById("msg");

  if (!username || !password) {
    msg.textContent = "Veuillez remplir tous les champs.";
    return;
  }

  // Charger les utilisateurs existants
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    msg.textContent = "Ce nom d'utilisateur existe déjà.";
    return;
  }

  // Ajouter le nouvel utilisateur avec son rôle
  users[username] = { password: password, role: role };

  // Enregistrer dans localStorage
  localStorage.setItem("users", JSON.stringify(users));

  msg.style.color = "green";
  msg.textContent = "Utilisateur créé avec succès !";
}
