     // Reference to the "posts" node
     var postsRef = database.ref('COURS');
        // Get the title from the URL

        console.log(postsRef);

// Now, you can use the decodedTitle to fetch the details from Firebase or display it on the page

     // Listen for changes in the data
     postsRef.on('value', function(snapshot) {
       // Clear existing posts
       document.getElementById('textes').innerHTML = '';

       // Loop through each post in the snapshot
       snapshot.forEach(function(childSnapshot) {
         var post = childSnapshot.val();
         var postId = childSnapshot.key;
         console.log(post);
         // Create HTML elements for each post
        document.getElementById('splash-screen').style.display = 'none';
         var postDiv = document.createElement('div');
         postDiv.className = 'post';
         postDiv.setAttribute('data-type', post.AAType);

         postDiv.innerHTML = `


           <div id="${postId}" class="filterDiv_${post.AAType} postId">
           <div class="img">
           <img src="${post.AAImage || post.LinkImage || ''}" alt="">
             <div class="filterDiv cars categorie">${post.AAPages || ''}</div>
           </div>

             <h1>${post.AATitle || ''}</h1>
            <p>${post.AADetails || ''}</p>
            <p style="display: none;">${post.SousTitle || ''}</p>
           
           <div class="btnprix">
              <div class="barshare">
                <i onclick="whatsapp('${postId}')" class="fa fa-whatsapp"></i>
                 <span id="postcount_${postId}">${formatNumber(post.AAwhatsapp || 0)}</span>
               </div>

               <div class="barshare">
                <i onclick="facebook('${postId}')" class="fa fa-facebook"></i>
                 <span id="dislikecount_${postId}">${formatNumber(post.AAfacebook || 0)}</span>
               </div>

               <div class="barshare">
                <i onclick="twitter('${postId}')" class="fa fa-twitter"></i>
                 <span id="dislikecount_${postId}">${formatNumber(post.AAtwitter || 0)}</span>
               </div>
           <button class="more" onclick="btncl('${encodeURIComponent(post.AAPages || '')}')">Voir la suite</button>
           </div>

        </div>

         `;
         console.log(post)

     
        
         // Append the post to the 'artice' div
         document.getElementById('textes').appendChild(postDiv);
       });
     });

     function btncl(encodedTitle) {
        // Décoder le titre encodé
        const decodedTitle = decodeURIComponent(encodedTitle);
        console.log(encodedTitle);
        // Remplacer les espaces par des underscores dans le titre
        const titleWithUnderscores = decodedTitle.replace(/ /g, "_");
    
        // Utiliser le titre mis à jour selon vos besoins
        console.log(titleWithUnderscores);
    
        // Rediriger vers la nouvelle URL avec le titre mis à jour
        window.location.href = `/p/c/receive.html?l=${encodeURIComponent(titleWithUnderscores)}`;

    }

    
     function whatsapp(postId) {
        var postElement = document.getElementById(postId);
        if (postElement) {
            var postTitle = postElement.querySelector('h1').innerText;
            var postDetails = postElement.querySelector('p').innerText;
            var shareMessage = encodeURIComponent('*'+postTitle+'*' + '\n' + postDetails + '\n');
    
            var urlDeLaPage = window.location.href;
            var encodedUrl = encodeURIComponent(urlDeLaPage);
            var replacedUrl = encodedUrl.replace(/\s/g, '_');
    
            var n = "\n";
            var url = "https://wa.me/?text=" + shareMessage + "%0a" +
                      n + "%0a" +
                      "_Accédez gratuitement en cliquant sur le lien suivant :_" + n +
                      "%0a" + replacedUrl + "%0a" +
                      n + "%0a" +
                      "_Pour nous aider à travailler, veuillez partager ce lien dans au moins 5 groupes._" + "%0a";
    
            window.open(url, '_blank').focus();
    
            // Firebase Integration
            var postRef = firebase.database().ref('COURS/' + postId);
            postRef.transaction(function (data) {
                if (data) {
                    data.AAwhatsapp = (data.AAwhatsapp || 0) + 1;
                } else {
                    data = { AAwhatsapp: 1 };
                }
                return data;
            }, function (error, committed, snapshot) {
                if (error) {
                    console.error('Transaction failed:', error);
                } else if (committed) {
                    updateCounts(postId, snapshot.val().whatsapp);
                } else {
                    console.error('Transaction aborted:', error);
                }
            });
        } else {
            console.error("Post element not found");
        }
    }
    
    
    function facebook(postId) {
        var postElement = document.getElementById(postId);
        if (postElement) {
            var postTitle = postElement.querySelector('h1').innerText;
            var postDetails = postElement.querySelector('p').innerText;
            var shareURL = encodeURIComponent(window.location.href);
            var facebookShareURL = 'https://www.facebook.com/sharer/sharer.php?u=' + shareURL;
            window.open(facebookShareURL, '_blank');
        } else {
            console.error("Post element not found");
        }

         // Firebase Integration
         var postRef = firebase.database().ref('COURS/' + postId);
         postRef.transaction(function (data) {
             if (data) {
                 data.AAfacebook = (data.AAfacebook || 0) + 1;
             } else {
                 data = { AAfacebook: 1 };
             }
             return data;
         }, function (error, committed, snapshot) {
             if (error) {
                 console.error('Transaction failed:', error);
             } else if (committed) {
                 updateCounts(postId, snapshot.val().facebook);
             } else {
                 console.error('Transaction aborted:', error);
             }
         });
    }
    
    function twitter(postId) {
        var postElement = document.getElementById(postId);
        if (postElement) {
            var postTitle = postElement.querySelector('h1').innerText;
            var postDetails = postElement.querySelector('p').innerText;
            var shareMessage = encodeURIComponent(postTitle + '\n' + postDetails + '\n' + window.location.href);
            var twitterShareURL = 'https://twitter.com/intent/tweet?text=' + shareMessage;
            window.open(twitterShareURL, '_blank');

            
        } else {
            console.error("Post element not found");
        }

         // Firebase Integration
         var postRef = firebase.database().ref('COURS/' + postId);
         postRef.transaction(function (data) {
             if (data) {
                 data.AAtwitter = (data.AAtwitter || 0) + 1;
             } else {
                 data = { AAwhatsapp: 1 };
             }
             return data;
         }, function (error, committed, snapshot) {
             if (error) {
                 console.error('Transaction failed:', error);
             } else if (committed) {
                 updateCounts(postId, snapshot.val().twitter);
             } else {
                 console.error('Transaction aborted:', error);
             }
         });
     } 
    
    
   
    

  document.getElementById('toggleSearchBtn').addEventListener('click', function () {
    var searchContainer = document.getElementById('searchContainer');
    var buttons = document.querySelectorAll('.btn');

    if (searchContainer.style.display === 'none' || searchContainer.style.display === '') {
        searchContainer.style.display = 'block';
        buttons.forEach(function (button) {
            button.style.display = 'none';
        });
    } else {
        searchContainer.style.display = 'none';
        buttons.forEach(function (button) {
            button.style.display = 'block';
        });
    }
});


  
  function formatNumber(number) {
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number >= 100) {
        return (number / 100).toFixed(1) + 'c';
    } else {
        return number.toString();
    }
}


  function filterSelection(category) {
    var posts = document.getElementsByClassName('post');
    var searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Loop through posts and show/hide based on category and search input
    for (var i = 0; i < posts.length; i++) {
        var postCategory = posts[i].getAttribute('data-type');
        var sousTitle = posts[i].getElementsByTagName('h1')[0].innerText.toLowerCase();

        // Check if the post matches the category and search input
        if ((category === 'all' || postCategory === category) &&
            (sousTitle.includes(searchInput))) {
            posts[i].style.display = 'block';
        } else {
            posts[i].style.display = 'none';
        }
    }
}

// Call filterSelection when a filter button is clicked
document.getElementById('filtrecategorie').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        // Remove 'active' class from all buttons
        var buttons = document.getElementsByClassName('btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('active');
        }

        // Add 'active' class to the clicked button
        event.target.classList.add('active');

        // Call filterSelection with the category of the clicked button
        filterSelection(event.target.getAttribute('data-filter'));
    }
});

// Add event listener for the search input
document.getElementById('searchInput').addEventListener('input', function () {
    // Call filterSelection with the current category and updated search input
    filterSelection(document.querySelector('.btn.active').getAttribute('data-filter'));
});




