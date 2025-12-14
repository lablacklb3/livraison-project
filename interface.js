/* RESET DE BASE */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f5f6fa;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px 30px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

/* TITRES */
h2, h3, h4 {
    margin-bottom: 15px;
    color: #2f3640;
}

/* FORMULAIRES */
label {
    display: block;
    margin: 10px 0 5px;
    font-weight: 600;
}

input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #dcdde1;
    font-size: 1rem;
    outline: none;
    transition: 0.3s;
}

input:focus, select:focus {
    border-color: #4cd137;
    box-shadow: 0 0 5px rgba(76, 209, 55, 0.3);
}

/* BOUTONS */
.btn {
    padding: 10px 15px;
    background-color: #4cd137;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.3s;
}

.btn:hover {
    background-color: #44bd32;
}

.btn.small {
    padding: 5px 10px;
    font-size: 0.9rem;
    margin-top: 5px;
}

.btn.logout {
    background-color: #e84118;
    margin-top: 20px;
}

.btn.logout:hover {
    background-color: #c23616;
}

/* LISTE DES COMMANDES */
.commande-liste ul {
    list-style: none;
}

.commande-liste li {
    background-color: #f1f2f6;
    padding: 15px 20px;
    margin-bottom: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.commande-liste li button {
    margin-top: 10px;
    background-color: #e84118;
    border-radius: 8px;
    padding: 5px 10px;
}

.commande-liste li button:hover {
    background-color: #c23616;
}

/* PRODUITS DANS LA COMMANDE */
.produit-section div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 8px 10px;
    background-color: #dcdde1;
    border-radius: 8px;
}

.produit-section div button {
    background-color: #e84118;
    border-radius: 5px;
    padding: 3px 6px;
}

.produit-section div button:hover {
    background-color: #c23616;
}
