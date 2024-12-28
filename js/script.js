// Variables
var dialog = document.querySelector('#customDialog');
var load = document.querySelector(".load");
var alertTitle = document.querySelector(".alertTitle");
var alertp = document.querySelector(".alertp");
var dialogo = document.getElementById('customDialog');


// Define the saveUserDataLocally function
function saveUserDataLocally(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }


  // load screen flash

  document.addEventListener('DOMContentLoaded', function () {
    var load = document.getElementById('splash-screen');

    const content = `
                    <div class="splash-screen">
                        <div class="loader">
                        </div>
                    <div>
    `;
    load.innerHTML = content;
 
});

// alert dialog
document.addEventListener('DOMContentLoaded', function () {
    var menu = document.getElementById('customDialog');

    const content = `
                <div class="dialog-content">
                    <span class="close-button" onclick="closeDialog()">&times;</span>
                    <h2 class="alertTitle">Unitech Conseil</h2>
                    <p class="alertp">Vous etes un ami de Unitech conseil</p>
                    <button onclick="openform()" class="btnconnection">Connectez-vous</button>
                </div>
    `;
    menu.innerHTML = content;
 
});

// le nombre de temps pour faire disparaitre dialog
document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour vérifier la visibilité de l'élément
    function checkVisibility() {
        var monDiv = document.querySelector('.alert');
        if (monDiv && monDiv.style.display !== 'none') {
            monDiv.style.display = 'none'; // Cache le div
        }
    }

    // Appelle la fonction toutes les 1000 millisecondes (1 seconde)
    setInterval(checkVisibility, 5000);
});


// menu principal du site
document.addEventListener('DOMContentLoaded', function () {

    var userData = JSON.parse(localStorage.getItem('userData'));
    var isLoggedIn = userData !== null; // Vérifiez si userData est différent de null
    var menu = document.getElementById('menu');
    var amount = isLoggedIn ? userData.Points * 0.005 : 0; // Assurez-vous que userData n'est pas null avant d'accéder à ses propriétés
 
    const content = `
            <div class="barmenu">
                <div class="topbtn btnmenu">
                    <i onclick="toggleMenu()" class="fa fa-bars"></i>
                    <i onclick="toggleMenu()" id="close" class="fa fa-close"></i>
                </div>

                <div class="topbtn rc">
                <div>
                    <strong>Rc</strong> 
                    <span id="rc">0.00</span>
                        <br>
                    <strong>HTG</strong> 
                    <span id="amount">${(amount).toFixed(2)}</span>
                </div>

                <div class="rcprofile" onclick="profile()"><i class="fa fa-user"></i></div>
                </div>
            </div>


        
            <nav class="menu">
                <div class="art-myuser">
                <div>
                    <img id="image" src="images/icon.png" alt="">
                </div>
                <div>
                    <p id="name"></p>
                    <p id="nameuser"></p>
                    <p id="phone"></p>
                    <p id="email"></p>
                </div>
            </div>
                <div class="sideItem">
                    <p ><a href="/index.html"><i class="fa fa-home"></i> Accueil</a></p>
                    <p style="display:none"><a href="/c/concours.html"><i class="fa fa-home"></i> Concours</a></p>
                    <p><a href="/chaine.html"><i class="fa fa-plus"></i> Groupe / Chaine</a></p>
                    <p><a href="/p/cours.html"><i class="fa fa-bokk"></i>Cours</a></p>
                    <p id="profile"><a onclick="profile()"><i class="fa fa-user"></i> Profile</a></p>
                    <p><a href="/boutique/livres.html"><i class="fa fa-book"></i> Livres</a></p>
                    <p><a href="/services.html"><i class="fa fa-cogs"></i>Services</a></p>
                    ${isLoggedIn ? `
                    <p id="logout"><a onclick="logout()"><i class="fa fa-unlock"></i> Déconnectez</a></p>
                ` :  `<p id="connect" onclick="openform()"><i class="fa fa-lock"></i>Connectez</p>
                `}
                    <p><a href="/propos.html"><i class="fa fa-circle"></i> A propos</a></p>
                    <p><a href="/privacy.html"><i class="fa fa-lock"></i> Privacy</a></p>
                </div>
           
            </nav>
             <div class="logos"><img src="/images/icon.png"></div>
    `;
    menu.innerHTML = content;
    

    // Added script
    if (isLoggedIn) {
       document.getElementById("connect").style.display='none';
       document.getElementById("creataccount").style.display='none';
    } else {
        document.getElementById("connect").style.display='block';
    }
});


/*------------------ Footer -------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    var footer = document.querySelector('.mobile-footer');
    const contentFooter = `
        <div class="footer-content">
            <div class="footer-list">
                <a href="/index.html" class="footer-item"><i class="fa fa-home"></i> Accueil</a>
                <a href="/p/cours.html" class="footer-item"><i class="fa fa-android"></i>Cours</a>
                <a href="/statues.html" class="footer-item"><i class="fa fa-android"></i>Statues</a>
            </div>
        </div>
    `;
    footer.innerHTML = contentFooter;
});
/*------------------Fin Footer -------------------------*/


/*------------------ formulaire inscription -------------------------*/

let currentSection = 0;
let sections;

function nextSection() {
    sections[currentSection].classList.remove('active');
    currentSection = (currentSection + 1) % sections.length;
    sections[currentSection].classList.add('active');
}

function prevSection() {
    if (sections && sections.length > 0) {
        sections[currentSection].classList.remove('active');
        currentSection = (currentSection - 1 + sections.length) % sections.length;
        sections[currentSection].classList.add('active');
    } else {
        console.error('No sections found or sections not properly initialized.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.formulaire');
    const contentForm = `
    <div class="form">
        <div>
             <button class="formClose" onclick="formcClose()">Close</button>
        <div class="btninscription">
            <button id="showlogin" onclick="showlogin()">Connectez-vous</button>
            <button id="showsignup" onclick="showsignup()">Inscrivez-vous</button>
        </div>
        <div id="login">
            <h1 id="displayuser">Connectez</h1>
            <div class="loginsection">
            <div class="input"><input type="text" id="login-phone" placeholder="Utilisateur / Email" required/></div>
        <div class="input"><input type="password" id="login-password" placeholder="mot de passe" required/></div>
        <button onclick="login()">Je me connecte</button>
            </div>
        </div>
        <div id="signup">
        <h1>Inscivez-vous</h1>
        <p id="result">Votre code</p>
            <section class="form-section active">
                <div class="input"><input type="text" id="names" placeholder="Votre nom complet" required/></div>
                <div class="input"><input type="email" id="emails" placeholder="Entrez votre mail" required/></div>
                <div class="input"><input type="text" id="utilisateur" placeholder="Nom utilisateur" required/></div>
                <div class="logbtn">
                <button type="button" class="first" onclick="nextSection()">Suivant</button>
                </div>
            </section>
            <section class="form-section">
                <div class="input select">
                    <select id="country" onchange="updateFlag()">
                        <option value="">Selectionnez votre pays</option>
                        <option value="ht" title="+509">Haiti</option>
                        <option value="us" title="+1">United States</option>
                        <option value="do" title="+1">Republique dominicaine</option>
                        <option value="ca" title="+1">Canada</option>
                        <option value="fr" title="+33">France</option>
                        <option value="uk" title="+44">United Kingdom</option>
                        <!-- Add more countries as needed -->
                        <option value="bf" title="+226">Burkina Faso</option>
                        <option value="bi" title="+257">Burundi</option>
                        <option value="cm" title="+237">Cameroon</option>
                        <option value="cf" title="+236">Central African Republic</option>
                        <option value="dz" title="+213">Algeria</option>
                        <option value="ao" title="+244">Angola</option>
                        <option value="bj" title="+229">Benin</option>
                        <option value="bw" title="+267">Botswana</option>
                        <option value="cv" title="+238">Cape Verde</option>
                        <option value="cf" title="+236">Central African Republic</option>
                        <option value="td" title="+235">Chad</option>
                        <option value="km" title="+269">Comoros</option>
                        <option value="cg" title="+242">Congo</option>
                        <option value="dj" title="+253">Djibouti</option>
                        <option value="eg" title="+20">Egypt</option>
                        <option value="gq" title="+240">Equatorial Guinea</option>
                        <option value="er" title="+291">Eritrea</option>
                        <option value="et" title="+251">Ethiopia</option>
                    </select>
                    <span id="selected-flag" class="flag flag-icon"></span>
                </div>
                <div class="input phone">
                    <p id="p"></p>
                    <input type="text" id="phones" placeholder="Votre Numéro" required/>
                </div>
                <div class="logbtn">
                    <button type="button" onclick="prevSection()">Précédent</button>
                    <button type="button" onclick="nextSection()">Suivant</button>
                </div>
            </section>
            <section class="form-section">
                <div class="input"><input type="password" id="passwords" placeholder="Votre mot de passe" required/></div>
                <div class="input"> <input type="text" id="codePromo" placeholder="Code Promo" required/></div>
                <input type="number" id="pointss" value="0" style="display: none;" disabled />
                <p id="showimg"></p>
                <div class="logbtn">
                    <button type="button" onclick="prevSection()">Précédent</button>
                    <button onclick="signup()" id="signupBtn">Je m'inscris</button>
                </div>            
            </section>
            <div id="user-data-container" style="display: none;">
                <h2>Signed Up User Data</h2>
                <p>Email: <span id="user-email"></span></p>
                <p>Username: <span id="user-username"></span></p>
                <p>Points: <span id="user-points"></span></p>
            </div>
        </div>
        </div>
    </div>
    `;
    form.innerHTML = contentForm;

    form.innerHTML = contentForm;
    sections = document.querySelectorAll('.form-section');
    if (sections.length > 0) {
        sections[0].classList.add('active');
    } else {
        console.error('No form sections found.');
    }
});
/*------------------Fin formulaire inscription -------------------------*/



function displayUserDetails(userData) {
    var image = document.getElementById('image');
    var name = document.getElementById('name');
    var nameuser = document.getElementById('nameuser');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');
    var rcElement = document.getElementById('rc'); // Renommé pour plus de clarté

    // Format rc pour afficher en K ou M
    var rcFormatted = formatPoints(userData.Points);

    // Vérifier si une image est disponible, sinon utiliser une image par défaut
    if(userData.Image) {
        image.src = userData.Image;
    } else {
        // Image par défaut
        image.src = '/images/icon.png';
    }

    // Affichage des détails de l'utilisateur
    name.textContent = `${userData.Name}`;
    nameuser.textContent = `${userData.Username}`;
    phone.textContent = `${userData.Phone}`;
    email.textContent = `${userData.Email}`;
    rcElement.textContent = rcFormatted;
}

function formatPoints(points) {
    if (points >= 1000000) {
        // Si les points sont supérieurs ou égaux à 1 million, affiche "xM" (1 million)
        return (points / 1000000).toFixed(1) + 'M';
    } else if (points >= 1000) {
        // Si les points sont supérieurs ou égaux à 1000, affiche "xK" (1 millier)
        return (points / 1000).toFixed(1) + 'K';
    } else {
        // Sinon, affiche simplement le nombre de points
        return points.toString();
    }
}


// Événement au chargement du DOM
document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les données utilisateur depuis le stockage local
    var userData = JSON.parse(localStorage.getItem('userData'));
    
    function fetchUserDataFromFirebase(email) {
        var usersRef = firebase.database().ref("users");

        usersRef.orderByChild('Email').equalTo(email).once('value')
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    var userDataSnapshot = snapshot.val();
                    var userId = Object.keys(userDataSnapshot)[0];

                    if (userId) {
                        // Mise à jour des données utilisateur dans le stockage local
                        var updatedUserData = userDataSnapshot[userId];
                        localStorage.setItem('userData', JSON.stringify(updatedUserData));

                        // Affichage des détails de l'utilisateur sur la page de profil
                        displayUserDetails(updatedUserData);
                        document.getElementById('connecte').style.display='block';
                        document.getElementById('logout').style.display='none';
                        
                    } else {
                        console.log('User ID not found.');
                        document.getElementById('creatacount').style.color='gray';
                    }
                } else {
                    console.log("No user found with email:", email);
                }
            })
            .catch(function (error) {
                console.error('Error fetching user data from Firebase:', error);
            });
    }

    // Vérifier si l'utilisateur est connecté
    var isLoggedIn = userData !== null && userData !== undefined;
    
    if (isLoggedIn) {
        var email = userData.Email;
        fetchUserDataFromFirebase(email);
        document.getElementById('creataccount').style.display='none';
        document.getElementById('creatacount').style.color='orangered';
    } else {
        // Utilisateur non connecté, afficher un message ou rediriger vers la page de connexion
        console.log("User is not logged in. Show a message or redirect to login page.");
        document.getElementById('creataccount').style.display='block';
    }
});





/*-----------------------------login--------------*/



// Define the saveUserDataLocally function
function saveUserDataLocally(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}
// Fonction de connexion mise à jour
function login() {
    var emailOrUsername = document.getElementById('login-phone').value; // Email ou nom d'utilisateur
    var password = document.getElementById('login-password').value;
    var dialog = document.querySelector(".alert");
    var load = document.querySelector(".load");
    var alertTitle = document.querySelector(".alertTitle");
    var alertp = document.querySelector(".alertp");

    // Vérifiez si email/nom d'utilisateur et mot de passe sont fournis
    if (emailOrUsername && password) {
        var queryByEmail = database.ref('users').orderByChild('Email').equalTo(emailOrUsername);
        var queryByUsername = database.ref('users').orderByChild('Username').equalTo(emailOrUsername);

        // Rechercher d'abord par email
        queryByEmail.once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    handleLogin(snapshot);
                } else {
                    // Si pas trouvé par email, essayer avec le nom d'utilisateur
                    return queryByUsername.once('value');
                }
            })
            .then((snapshot) => {
                if (snapshot && snapshot.exists()) {
                    handleLogin(snapshot);
                } else {
                    // Aucun utilisateur trouvé
                    console.error('User not found');
                    dialog.style.display = 'block';
                    alertTitle.textContent = 'Unitech Conseil';
                    alertp.textContent = 'Cet utilisateur n\'existe pas. Cliquez sur le bouton rouge pour vous inscrire.';
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    } else {
        // Email/nom d'utilisateur et mot de passe requis
        console.error('Email/Username and password are required for login');
        dialog.style.display = 'block';
        alertTitle.textContent = 'Unitech Conseil';
        alertp.textContent = 'L\'adresse e-mail/nom d\'utilisateur et le mot de passe sont requis pour se connecter.';
    }
}

function handleLogin(snapshot) {
    var userData = null;
    snapshot.forEach((userSnapshot) => {
        userData = userSnapshot.val();
    });

    // Comparer les mots de passe
    if (userData.Password.toString() === document.getElementById('login-password').value) {
        // Mot de passe correct
        console.log('Login successful');
        var dialog = document.querySelector(".alert");
        var alertTitle = document.querySelector(".alertTitle");
        var alertp = document.querySelector(".alertp");
        dialog.style.display = 'block';
        alertTitle.textContent = 'Bienvenue ' + userData.Name;
        alertp.textContent = 'Merci!!';
        window.location.reload();
        // Sauvegarder les données utilisateur dans le stockage local
        saveUserDataLocally(userData);
    } else {
        // Mot de passe incorrect
        console.error('Incorrect password');
        var dialog = document.querySelector(".alert");
        var alertTitle = document.querySelector(".alertTitle");
        var alertp = document.querySelector(".alertp");
        dialog.style.display = 'block';
        alertTitle.textContent = 'Unitech Conseil';
        alertp.textContent = 'Mot de passe incorrect.';
    }
}

  
  
  



  function signup() {
    // Generate a random number between 10 and 10009
    var randomNumber = Math.floor(Math.random() * 10000) + 10;

    // Generate a random alphanumeric string
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var randomAlpha = '';
    for (var i = 0; i < 3; i++) {
        randomAlpha += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Display the random result on the page
    var result = 'uc-' + randomAlpha + randomNumber;
    document.getElementById('result').textContent = result;

    var name = document.getElementById('names').value;
    var username = document.getElementById('utilisateur').value; // Nom d'utilisateur
    var email = document.getElementById('emails').value;
    var phone = document.getElementById('phones').value;
    var password = document.getElementById('passwords').value;
    var codePromo = document.getElementById('codePromo').value;
    var p = document.getElementById('p').innerText; // Add this line

    // Variables
    var dialog = document.querySelector(".alert");
    var alertTitle = document.querySelector(".alertTitle");
    var alertp = document.querySelector(".alertp");

    // Check if email exists
    firebase.database().ref('users').orderByChild('Email').equalTo(document.getElementById('emails').value).once('value')
        .then(function(emailSnapshot) {
            if (emailSnapshot.exists()) {
                dialog.style.display='block';
                alertTitle.textContent='Email existe deja';
                alertp.textContent='essayez un autre';
                console.error('Email already exists');
                // You can handle the error accordingly, display a message to the user, etc.
                return;
            }

            // Check if phone number exists
            firebase.database().ref('users').orderByChild('Name').equalTo(name).once('value')
                .then(function(phoneSnapshot) {
                    if (phoneSnapshot.exists()) {
                        dialog.style.display='block';
                        alertTitle.textContent='Nom existe deja';
                        alertp.textContent='essayez un autre';
                        console.error('Name already exists');
                        // You can handle the error accordingly, display a message to the user, etc.
                        return;
                    }

                    firebase.database().ref('users').orderByChild('CodeReference').equalTo(codePromo).once('value')
                    .then(function(snapshot) {
                        if (snapshot.exists()) {
                            // If the promo code exists, add points to the referred user
                            snapshot.forEach(function(childSnapshot) {
                                var referredUserId = childSnapshot.key;
                                var referredUserPoints = childSnapshot.val().Points || 0;
                                var referredUserReferrals = childSnapshot.val().NbRef || 0;
                
                                // Add 10 points
                                var updatedPoints = referredUserPoints + 100;
                                var updatedRef = referredUserReferrals + 1;
                
                                // Update the referred user's points and number of referrals
                                firebase.database().ref('users/' + referredUserId).update({
                                    Points: updatedPoints,
                                    NbRef: updatedRef
                                });
                
                                console.log('Points added to referred user');
                            });
                        } else {
                            console.log('Invalid promo code');
                        }
                    })
                    .catch(function(error) {
                        console.error('Error checking promo code:', error);
                    });
                
                    // Save user details
                    firebase.database().ref('users/' +name).set({
                        Email: email,
                        Password: password,
                        Name: name,
                        Username: username,
                        Phone: p + phone, // Include the country code in the phone number
                        Points: 100,
                        CodePromo: codePromo,
                        CodeReference: result
                    });
                    
                    console.log('Signup successful');
                    document.getElementById('login').style.display='block';
                    document.getElementById('signup').style.display='none';
                    dialog.style.display='block';
                    alertTitle.textContent='Unitech Conseil';
                    alertp.textContent='Connexion réussie.';
                    window.location.reload;
                
                })
                .catch(function (error) {
                    console.error('Signup failed', error);
                });
        })
        .catch(function (error) {
            console.error('Signup failed', error);
        });
}



  function updateFlag() {
    var countrySelect = document.getElementById('country');
    var selectedCountry = countrySelect.value;
    var flagElement = document.getElementById('selected-flag');
    flagElement.className = 'flag flag-icon flag-icon-' + selectedCountry;
    
    var selectedCountryTitle = countrySelect.options[countrySelect.selectedIndex].title;
    document.getElementById('p').textContent = selectedCountryTitle;
    
     // Ajoutez votre condition pour ne prendre en compte que les pays francophones
     var frenchSpeakingCountries = ['ht', 'fr']; // Ajoutez d'autres codes de pays francophones au besoin
    var isFrenchSpeaking = frenchSpeakingCountries.includes(selectedCountry);
    
    if (isFrenchSpeaking) {
        document.getElementById('msg').textContent = 'Vous devez parler francais au moins';
    }
    // Set the phone input value to the selected country code
    //document.getElementById('phone').value = parseInt(selectedCountryTitle); // Add parseInt here
    }
    
    // Initial call to updateFlag when the page loads
    updateFlag();