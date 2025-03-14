// Importation des fonctions nécessaires
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQeHWr_vUiQmVVgJJ_cOF9qrCCLd7IJNc",
  authDomain: "ayiweb.firebaseapp.com",
  databaseURL: "https://ayiweb-default-rtdb.firebaseio.com",
  projectId: "ayiweb",
  storageBucket: "ayiweb.appspot.com",
  messagingSenderId: "115054504556",
  appId: "1:115054504556:web:ccd713ba01dd8f02830649"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fonction pour envoyer les données
function envoyerDonnees(name, email, phone, adresse) {
  const newUserRef = ref(database, 'inscriptions/' + Date.now()); // Utilise un timestamp unique pour chaque utilisateur
  set(newUserRef, {
    name: name,
    email: email,
    phone: phone,
    adresse: adresse
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const btnParticiper = document.querySelector(".home button");
  const formulaire = document.querySelector(".formulaire");
  const inscriptionMessage = document.querySelector("#inscrit");
  alert("Veuillez remplir tous les champs !");

  // Afficher le formulaire quand on clique sur le bouton "Je veux Participer"
  btnParticiper.addEventListener("click", function () {
    document.querySelector('.details').style.display = 'none';
    formulaire.style.display = "block"; // Affiche le formulaire
  });

  // Gérer la soumission du formulaire
  const formulaireInscription = document.querySelector("form[name='inscription']");
  formulaireInscription.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche l'envoi par défaut du formulaire

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const adresse = document.getElementById("adresse").value;

    // Vérifier si tous les champs sont remplis
    if (name && email && phone && adresse) {
      // Envoyer les données à Firebase
      envoyerDonnees(name, email, phone, adresse);

      // Afficher un message de succès dans #inscrit
      inscriptionMessage.innerHTML = `<p>Merci ${name} ! Votre inscription a été prise en compte. Nous vous contacterons bientôt.</p>`;

      // Réinitialiser le formulaire et cacher après soumission
      formulaireInscription.reset();
      formulaire.style.display = "none";
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  });
});
