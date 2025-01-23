// Éléments du DOM
const openSidebarBtn = document.querySelector('.open-sidebar-btn');
const sidebar = document.querySelector('.sidebar');

// Ouvrir la sidebar lorsque le bouton est cliqué
openSidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('show'); // Ajouter ou retirer la classe 'show' pour faire apparaître/disparaître la sidebar
});

// Mettre à jour la liste des utilisateurs connectés
function updateUsersList() {
  const usersRef = database.ref('users');
  usersRef.once('value', (snapshot) => {
    usersListDiv.innerHTML = ''; // Réinitialiser la liste des utilisateurs
    let count = 0;
    snapshot.forEach((childSnapshot) => {
      const username = childSnapshot.key;
      const li = document.createElement('li');
      li.textContent = username;
      usersListDiv.appendChild(li);
      count++;
    });
    usersCountSpan.textContent = count; // Mettre à jour le nombre d'utilisateurs
  });
}
