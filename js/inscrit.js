var dialog = document.querySelector(".custom-dialog");
var load = document.querySelector(".load");
var alertTitle = document.querySelector(".alertTitle");
var alertp = document.querySelector(".alertp");

// Define the saveUserDataLocally function
function saveUserDataLocally(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}
// Login function added here

  function showlogin(){
    window.location ='/users/user.html';
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

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;
    var codePromo = document.getElementById('codePromo').value;
    var p = document.getElementById('p').innerText; // Add this line

    // Check if email exists
    firebase.database().ref('users').orderByChild('Email').equalTo(email).once('value')
        .then(function(emailSnapshot) {
            if (emailSnapshot.exists()) {
                console.error('Email already exists');
                // You can handle the error accordingly, display a message to the user, etc.
                return;
            }

            // Check if phone number exists
            firebase.database().ref('users').orderByChild('Name').equalTo(name).once('value')
                .then(function(phoneSnapshot) {
                    if (phoneSnapshot.exists()) {
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
                        Phone: p + phone, // Include the country code in the phone number
                        Points: 1000,
                        CodePromo: codePromo,
                        CodeReference: result
                    });
                    console.log('Signup successful');
                    dialog.style.display='block';
                    alertTitle.textContent='Signup successful';
                    alertp.textContent='Merci!!';
                    document.getElementById('login').style.display='block';
                    document.getElementById('signup').style.display='none';
                    
                })
                .catch(function (error) {
                    console.error('Signup failed', error);
                });
        })
        .catch(function (error) {
            console.error('Signup failed', error);
        });
}

 function closeDialog(){
  dialog.style.display='none';
}