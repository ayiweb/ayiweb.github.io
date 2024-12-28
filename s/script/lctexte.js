
  function addComment() {
   
    var titleElement = decodedTitle;
    console.log(titleElement); // Check if it returns a valid element
  
  var articleRef = firebase.database().ref('Textes/' + titleElement);
  var commentsRef = articleRef.child('Zcomments');

    // Get the current timestamp
    var timestamp = new Date().toISOString();

    // Get input values\
    var username = document.getElementById('name').innerHTML;
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
        commentsRef.push({
          username: username,
          text: commentText,
          timestamp: timestamp
        });

        // Clear input fields
        document.getElementById('comment').value = '';
      });
    } else {
      console.error('Error: articleRef is not properly defined.');
    }
  }



  document.addEventListener('DOMContentLoaded', function() {
    var titleElement = decodedTitle;
    console.log(titleElement);
  
    var articleRef = firebase.database().ref('Textes/' + titleElement);
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
          commentElement.innerHTML = `<p class="userComment"><i class="fa fa-user"></i><span>${comment.username}</span></p><hr>${comment.text}`;
          
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




 /* send message to whatsapp */
function share() {
  var urlDeLaPage = window.location.href;
  var encodedUrl = encodeURIComponent(urlDeLaPage);
  var replacedUrl = encodedUrl.replace(/\s/g, '_');

  var gTitle = document.getElementById('stitre').innerHTML;
  var encodedTitle = encodeURIComponent(gTitle);
  var replacedTitle = encodedTitle.replace(/\s/g, '_');

  var gTitleEs = document.getElementById('stitreEs').innerHTML;
  var encodedTitleEs = encodeURIComponent(gTitleEs);
  var replacedTitleEs = encodedTitleEs.replace(/\s/g, '_');

  var gTitleEn = document.getElementById('stitreEn').innerHTML;
  var encodedTitleEn = encodeURIComponent(gTitleEn);
  var replacedTitleEn = encodedTitleEn.replace(/\s/g, '_');

  var details = document.getElementById('details').innerHTML;
  var encodedDetails = encodeURIComponent(details);
  var replacedDetails = encodedDetails.replace(/\s/g, '_');

  var detailsEs = document.getElementById('detailsEs').innerHTML;
  var encodedDetailsEs = encodeURIComponent(detailsEs);
  var replacedDetailsEs = encodedDetailsEs.replace(/\s/g, '_');

  var detailsEn = document.getElementById('detailsEn').innerHTML;
  var encodedDetailsEn = encodeURIComponent(detailsEn);
  var replacedDetailsEn = encodedDetailsEn.replace(/\s/g, '_');

  const selectedLanguage = document.getElementById('langue').value;
  var n = "\n";
  var url = "https://wa.me/?text=";

  switch (selectedLanguage) {
    case 'us':
      url += replacedTitleEn + "%0a" + n + "%0a" + replacedDetailsEn + "%0a" + n + "%0a" + "_Access for free by clicking on the following link. :_" + n + "%0a" + replacedUrl + "%0a" + n + "%0a" + "_To help us work, please share this link in at least 5 groups._" + "%0a";
      break;
    case 'es':
      url += replacedTitleEs + "%0a" + n + "%0a" + replacedDetailsEs + "%0a" + n + "%0a" + "_Accede de forma gratuita haciendo clic en el siguiente enlace. :_" + n + "%0a" + replacedUrl + "%0a" + n + "%0a" + "_Para ayudarnos a trabajar, por favor comparte este enlace en al menos 5 grupos._" + "%0a";
      break;
    case 'fr':
      url += replacedTitle + "%0a" + n + "%0a" + replacedDetails + "%0a" + n + "%0a" + "_Accédez gratuitement en cliquant sur le lien suivant :_" + n + "%0a" + replacedUrl + "%0a" + n + "%0a" + "_Pour nous aider à travailler, veuillez partager ce lien dans au moins 5 groupes._" + "%0a";
      break;
    default:
      // Par défaut, utiliser le français
      url += replacedTitle + "%0a" + n + "%0a" + replacedDetails + "%0a" + n + "%0a" + "_Accédez gratuitement en cliquant sur le lien suivant :_" + n + "%0a" + replacedUrl + "%0a" + n + "%0a" + "_Pour nous aider à travailler, veuillez partager ce lien dans au moins 5 groupes._" + "%0a";
      break;
  }

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

  
  