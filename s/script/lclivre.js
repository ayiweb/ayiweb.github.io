const scriptURL = 'https://script.google.com/macros/s/AKfycbxdqxgu_mqHiYaBF9vuEgwytVdkD3Saa_ai20ixha-v_0bcZB6-DidAsJUIhv7xbnRg/exec';
const form = document.getElementById('formName');

form.addEventListener('submit', e => {
  e.preventDefault();

  var username = 'Ruban';
  var phoneuser = 38758855;

  // Get form elements by their names
  const nameInput = form.elements['Nom'];
  const phoneInput = form.elements['phone'];

  // Set values directly to the form fields
  nameInput.value = username;
  phoneInput.value = phoneuser;

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
          if (response.ok) {
              alert('Succès');
              form.reset(); // Reset the form
              // Redirect after successful submission
              // window.location = lien;
          } else {
              throw new Error('Erreur lors de la soumission du formulaire');
          }
      })
      .catch(error => console.error('Error!', error.message));
});






/*function likebtn(presentationKey) {
    var likeCountElement = document.getElementById(`likecount_${presentationKey}`);
    var currentLikes = parseInt(likeCountElement.textContent) || 0;
  
    // Update the like count locally
    likeCountElement.textContent = currentLikes + 1;
  
    // Update the like count in the database
    presentationsRef.child(`${presentationKey}/likes`).set(currentLikes + 1);
  }
  
  function dislikebtn(presentationKey) {
    var dislikeCountElement = document.getElementById(`dislikecount_${presentationKey}`);
    var currentDislikes = parseInt(dislikeCountElement.textContent) || 0;
  
    // Update the dislike count locally
    dislikeCountElement.textContent = currentDislikes + 1;
  
    // Update the dislike count in the database
    presentationsRef.child(`${presentationKey}/dislikes`).set(currentDislikes + 1);
  }*/
  var compte = 0;
  function addComment() {
    var username = document.getElementById('name').innerHTML;
    var titleElement = decodedTitle;
    console.log(titleElement); // Check if it returns a valid element

     // Récupérez la valeur actuelle de compte à partir de localStorage
     var compte = localStorage.getItem('compte');
     // Si compte n'est pas défini dans localStorage, initialisez-le à 0
     compte = compte ? parseInt(compte) : 0;
     // Incrémentez la valeur de compte
     compte++;
 
     // Enregistrez la nouvelle valeur de compte dans localStorage
     localStorage.setItem('compte', compte);
  
  var articleRef = firebase.database().ref('Livres/' + titleElement);
  var commentsRef = articleRef.child('Zcomments/' + username + compte);



    // Get the current timestamp
    var timestamp = new Date().toISOString();

    // Get input values\
    //var username = document.getElementById('name').innerHTML;
    var commentText = document.getElementById('comment').value;
    console.log(username);
    // Check if articleRef is properly defined
    if (articleRef) {
      // Check if the article already exists
      articleRef.once('value', function(snapshot) {
        if (!snapshot.exists()) {
          // Article doesn't exist, create it
          articleRef.set({
            title: titleElement,
            // Other article properties as needed
          });
        }

        // Push a new comment to the database
        commentsRef.set({
          username: username,
          text: commentText,
          timestamp: timestamp
        });

        // Clear input fields
        document.getElementById('username').value = '';
        document.getElementById('comment').value = '';
      });
    } else {
      console.error('Error: articleRef is not properly defined.');
    }
  }




  document.addEventListener('DOMContentLoaded', function() {
    var titleElement = decodedTitle;
    console.log(titleElement);
  
    var articleRef = firebase.database().ref('Livres/' + titleElement);
    var commentsRef = articleRef.child('Zcomments');
  
    // Listen for new comments and update the UI
    commentsRef.on('value', function(snapshot) {
      var commentsData = snapshot.val();
      if (commentsData) {
        // Convert the comments data to an array
        var commentsArray = Object.keys(commentsData).map(function(key) {
          return commentsData[key];
        });
  
        // Reverse the array to display the latest comment first
        commentsArray.reverse();
  
        // Update the UI with the reversed array of comments
        var commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML = ''; // Clear existing comments
  
        commentsArray.forEach(function(comment) {
          var commentElement = document.createElement('div');
          
          // Display the comment username and text
          commentElement.innerHTML = `
          <div>
            <i class="fa fa-user"></i>
            <span class="userComment">${comment.username}</span>
          </div>
          <p>${comment.text}</p>`;
          
          // Display the comment timestamp
          var timestampElement = document.createElement('p');
          var timestamp = new Date(comment.timestamp);
          
          var now = new Date();
          var timeDifference = now - timestamp;
          var hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  
          if (hoursDifference >= 24) {
            // If older than 24 hours, display the number of days
            var daysDifference = Math.floor(hoursDifference / 24);
            timestampElement.textContent = `Commented ${daysDifference} days ago at ${timestamp.toLocaleTimeString()}`;
          } else {
            // Otherwise, display the timestamp as is
            timestampElement.textContent = `Commented at ${timestamp.toLocaleTimeString()}`;
          }
  
          commentsContainer.appendChild(commentElement);
          commentsContainer.appendChild(timestampElement);
        });
      }
    });
  
    // Rest of your existing code...
  });




    /*send message to whatsapp*/
    function share() {
      var urlDeLaPage = window.location.href;
      var encodedUrl = encodeURIComponent(urlDeLaPage);
      var replacedUrl = encodedUrl.replace(/\s/g, '_');
  
      var gTitle = document.getElementById('stitre').innerHTML;
      var encodedTitle = encodeURIComponent(gTitle);
      var replacedTitle = encodedTitle.replace(/\s/g, '_');
  
      var details = document.getElementById('details').innerHTML;
      var encodedDetails = encodeURIComponent(details);
      var replacedDetails = encodedDetails.replace(/\s/g, '_');
  
      var n = "\n"
      var url = "https://wa.me/?text="

      + replacedTitle + "%0a"
      + n + "%0a"
      + encodedDetails + "%0a"
      + n + "%0a"
      + "_Accédez gratuitement en cliquant sur le lien suivant :_" + n +"%0a" + replacedUrl + "%0a"
      + n + "%0a"
      + "_Pour nous aider à travailler, veuillez partager ce lien dans au moins 5 groupes._" + "%0a"
      
    
      window.open(url, '_blank').focus();
  }
  


// Get the comment icon element
document.addEventListener('DOMContentLoaded', function() {
// Get the comment icon element
var commentIcon = document.querySelector('.fa-comment');

// Add the rotate class to start the animation when the page loads
commentIcon.classList.add('rotate');

// Start the animation every 5 seconds
setInterval(function() {
// Toggle the rotate class to restart the animation
commentIcon.classList.toggle('rotate');
}, 5000);
});

  
  