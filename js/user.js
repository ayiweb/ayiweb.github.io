var dialog = document.querySelector(".custom-dialog");
var load = document.querySelector(".load");
var alertTitle = document.querySelector(".alertTitle");
var alertp = document.querySelector(".alertp");

// Define the saveUserDataLocally function
function saveUserDataLocally(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}
// Login function added here
function login() {
  var email = document.getElementById('login-phone').value;
  var password = document.getElementById('login-password').value;
  
  // Check if email and password are provided
  if (email && password) {
  // Search the database if the user exists with the provided information
     load.style.display='block';
  database.ref('users').orderByChild('Email').equalTo(email).once('value')
      .then((snapshot) => {
          if (snapshot.exists()) {
              // User with the provided email found
              var userData = null;
              snapshot.forEach((userSnapshot) => {
                  userData = userSnapshot.val();
                  console.log(userData);
                  load.style.display='none';
              });
  
              // Compare passwords using string comparison
              if (userData.Password.toString() === password) {
                  // Password matches
                  console.log('Login successful');
                  dialog.style.display='block';
                  alertTitle.textContent='Unitech Conseil';
                  alertp.textContent='Connexion réussie.';
                  load.style.display='none';
                  //Save user data to local storage
                  saveUserDataLocally(userData);
  
                  // Redirect to another page
                  window.location.href = '/index.html';
              } else {
                  console.error('Incorrect password');
                  dialog.style.display='block';
                  alertTitle.textContent='Unitech Conseil';
                  alertp.textContent='Mot de passe incorrect.';
                  load.style.display='none';
              }
          } else {
              console.error('User not found');
              dialog.style.display='block';
              alertTitle.textContent='Unitech Conseil';
              alertp.textContent='Ce utilisateur n"existe pas. Cliquez sur le bouton rouge pour vous inscrire.';
              load.style.display='none';
          }
      })
      .catch((error) => {
          console.error('Error fetching user data:', error);
      });
  } else {
            console.error('Email and password are required for login');
            dialog.style.display='block';
            alertTitle.textContent='Unitech Conseil';
            alertp.textContent='L"adresse e-mail et le mot de passe sont requis pour se connecter.';
  }
  }


  function showsignup(){
    window.location ='/users/inscrit.html';
  }

 function closeDialog(){
  dialog.style.display='none';
}
