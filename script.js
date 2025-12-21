// / by me //
// LOGIN

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[username] || users[username].password !== password) {
    error.textContent = "Identifiants incorrects";
    return;
  }

  localStorage.setItem("loggedUser", username);
  localStorage.setItem("role", users[username].role);

  if (users[username].role === "client") {
    window.location.href = "client.html";
  } else if (users[username].role === "livreur") {
    window.location.href = "livreur.html";
  }
}


// CREATION UTILISATEUR

function createUser() {
  const nom = document.getElementById("NOM").value.trim();
  const numero = document.getElementById("NUMERO").value.trim();
  const username = document.getElementById("USER").value.trim();
  const password = document.getElementById("newPass").value.trim();
  const role = document.getElementById("role").value;
  const msg = document.getElementById("msg");

  msg.style.color = "red";
  msg.textContent = "";

  if (!nom || !numero || !username || !password) {
    msg.textContent = "Veuillez remplir tous les champs.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    msg.textContent = "Ce nom d'utilisateur existe déjà.";
    return;
  }

  users[username] = {
    nom: nom,
    numero: numero,
    password: password,
    role: role
  };

  localStorage.setItem("users", JSON.stringify(users));

  msg.style.color = "green";
  msg.textContent = "Utilisateur créé avec succès !";

  //  vider les champs
  document.getElementById("NOM").value = "";
  document.getElementById("NUMERO").value = "";
  document.getElementById("USER").value = "";
  document.getElementById("newPass").value = "";
}
