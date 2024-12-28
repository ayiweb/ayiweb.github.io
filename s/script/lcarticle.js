
  function addComment() {
   
    var titleElement = decodedTitle;
    console.log(titleElement); // Check if it returns a valid element
  
  var articleRef = firebase.database().ref('Mesarticles/' + titleElement);
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
    // Get the title element and extract the text content
    var titleElement = decodedTitle;
    console.log(decodedTitle); // Check if it returns a valid element
  
    if (titleElement) {
      var titleText = titleElement.textContent;
      console.log(titleText);
  
      // Reference to the 'Anglais/{titleElement}/comments' path
      var articleRef = firebase.database().ref('Mesarticles/' + titleElement);
      var commentsRef = articleRef.child('Zcomments');
  
      // Listen for new comments and update the UI
      commentsRef.on('child_added', function(data) {
        var comment = data.val();
        console.log(data)
        var commentElement = document.createElement('div');
        commentElement.innerHTML = `
            <p class="userComment">
              <i class="fa fa-user"></i>
              <span>${comment.username}</span>
            </p>
            <hr> ${comment.text} <br>${comment.timestamp}`;
        document.getElementById('comments').appendChild(commentElement);
      });
    }
  });


  document.addEventListener('DOMContentLoaded', function() {
    var titleElement = decodedTitle;
    console.log(titleElement);
  
    var articleRef = firebase.database().ref('Mesarticles/' + titleElement);
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
  