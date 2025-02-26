     // Reference to the "posts" node
     var postsRef = database.ref('Statues');
        // Get the title from the URL
//const urlParams = new URLSearchParams(window.location.search);
//const title = urlParams.get('title');


// Variable globale pour stocker les publications par type
let postsByType = {};

// Fonction pour afficher les publications
function displayPosts(posts) {
    const postsContainer = document.getElementById('statues');
    postsContainer.innerHTML = ''; // Réinitialiser le conteneur

    posts.forEach(({ postId, post }) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.setAttribute('data-type', post.Type);

        // Calculer le temps écoulé depuis la publication
        const postTime = new Date(post.Times);
        const currentTime = new Date();
        const timeDifference = currentTime - postTime;
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Convertir les millisecondes en heures
        const daysDifference = Math.floor(hoursDifference / 24); // Convertir les heures en jours

        const formattedTime = `${postTime.getHours()}h :${postTime.getMinutes() < 10 ? '0' + postTime.getMinutes() : postTime.getMinutes()}mn`;
        const timeDisplay = hoursDifference < 24 ? formattedTime : `${daysDifference} days ago`;

        postDiv.innerHTML = `
        <div id="${postId}" class="filterDiv_${post.Type} postId">
        <!--Selectionner la langue de votre choix-->
    
            <div style="display:none;" class="lang">
                <select name="" onchange="langue()" id="langue">
                    <option value="fr" class="flag-fr" data-country="france">FranÃ§ais</option>
                    <option value="us" class="flag-en" data-country="uk">Anglais</option>
                    <option value="es" class="flag-es" data-country="spain">Espagnol</option>
                </select>
                <span id="selected-flag" class="flag flag-icon flag-icon-fr"></span>
                <span>Selectionnez votre langue</span>
            </div>
            <div class="img">
                <img src="${post.Image || post.LinkImage || ''}" alt="">
                <div class="filterDiv cars categorie">${post.Type || ''}</div>
            </div>
            <h1>${post.Title || ''}</h1>
           <p>${post.Description || ''}</p>
            <p style="display: none;">${post.SousTitle || ''}</p>
            <div class="btnprix" style="display:none;">
                <button class="more" onclick="btncl('${encodeURIComponent(post.Title || '')}')">Voire la suite</button>
            </div>
    
            <div class="dedicace" id="dedicace-${postId}" style="display:none;">
                <button class="fermerdedicace" id="fermerdedicace-${postId}">X</button>
                <div class="input">
                <input type="text" id="de-${postId}" placeholder="Votre nom">
                </div>
    
                <div class="input">
                    <input type="text" id="a-${postId}" placeholder="Nom de la personne">
                </div>
                <div class="input-btn"><button id="partagerdedicace-${postId}">Partager</button></div>
            </div>
            <p id="p-${postId}" style="display:none;">www.unitechconseil.online</p>
           <div id="hidebar-${postId}">
           <!--bar comment, dislike, like-->
           <div class="barall">
               <div class="time">
               <p><span>Time :</span> ${timeDisplay}</p>
               </div>
               <div class="barcomment" style="display:none;">
                   <i class="fa fa-comment"></i>
                   <span class="count" id="comment-count-${postId}">
                       ${post.Zcomments ? formatNumber(Object.keys(post.Zcomments).length) : '0'}
                   </span>
               </div>
               <div class="barlike">
                   <i class="fa fa-thumbs-up" onclick="likePost('${postId}')"></i>
                   <span id="likecount_${postId}">${formatNumber(post.likes || 0)}</span>
               </div>
               <div class="bardislike">
                   <i class="fa fa-thumbs-down" onclick="dislikePost('${postId}')"></i>
                   <span id="dislikecount_${postId}">${formatNumber(post.dislikes || 0)}</span>
               </div>
               <div class="barshare">
                   <i class="fa fa-whatsapp"></i>
                   <span class="share" id="share-${postId}">Share</span>
               </div>
    
               <div class="barshare">
                   <i class="fa fa-save"></i>
                   <span class="save" id="save-${postId}">Save</span>
               </div>
           </div>
           <!--bar comment, dislike, like-->
           </div>
        </div>
    `;

        postsContainer.appendChild(postDiv);

        // Ajouter les gestionnaires d'événements pour les boutons
        const shareButton = document.getElementById(`partagerdedicace-${postId}`);
        shareButton.addEventListener('click', function() {
            const deValue = document.getElementById(`de-${postId}`).value;
            const aValue = document.getElementById(`a-${postId}`).value;
            sharePost(post.Title, post.Description, deValue, aValue, postId); // Passer le postId comme paramètre
        });

        const share = document.getElementById(`share-${postId}`);
        share.addEventListener('click', function() {
            const dedicaceSection = document.getElementById(`dedicace-${postId}`);
            const shartexte = document.getElementById(`share-${postId}`);
            if (dedicaceSection.style.display === "none") {
                dedicaceSection.style.display = "block";
                shartexte.innerHTML = "Fermer";
            } else {
                dedicaceSection.style.display = "none";
                shartexte.innerHTML = "Partager";
            }
        });

        const fd = document.getElementById(`fermerdedicace-${postId}`);
        fd.addEventListener('click', function() {
            const dedicaceSection = document.getElementById(`dedicace-${postId}`);
            dedicaceSection.style.display = 'none';
        });

        const saveButton = document.getElementById(`save-${postId}`);
        saveButton.addEventListener('click', function() {
            const postContainer = document.getElementById(postId);
            const pt = document.getElementById(`p-${postId}`);
            html2canvas(postContainer, { allowTaint: true }).then(function(canvas) {
                const dataURL = canvas.toDataURL();
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'unitechconseil.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        });
    });
}

// Fonction pour créer les boutons de filtre
function createFilterButtons(types) {
    const filterBar = document.getElementById('filter-bar');
    filterBar.innerHTML = ''; // Réinitialiser le bar de filtres

    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.addEventListener('click', function() {
        displayPosts(Object.values(postsByType).flat());
    });
    filterBar.appendChild(allButton);

    types.forEach(type => {
        const filterButton = document.createElement('button');
        filterButton.textContent = type;
        filterButton.addEventListener('click', function() {
            displayPosts(postsByType[type] || []);
        });
        filterBar.appendChild(filterButton);
    });
}

// Écouteur d'événements pour les changements dans Firebase
postsRef.on('value', function(snapshot) {
    postsByType = {}; // Réinitialiser postsByType
    const types = [];

    snapshot.forEach(function(childSnapshot) {
        const post = childSnapshot.val();
        const postId = childSnapshot.key;

        if (post.Type) {
            if (!postsByType[post.Type]) {
                postsByType[post.Type] = [];
                types.push(post.Type);
            }
            postsByType[post.Type].push({ postId: postId, post: post });
        }
    });

    createFilterButtons(types);
    displayPosts(Object.values(postsByType).flat());
});



    // Function to strip HTML tags from a string
function stripHtmlTags(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

// Function to share post
function sharePost(Title, Description, deValue, aValue) {
    // Extract text from Description without HTML tags
    const cleanDescription = stripHtmlTags(Description);

    // Here you can implement the logic to share the post SousTitle and Details
    const message = `*${Title}*\n${cleanDescription}\n*De:* _${deValue}_\n *À:* _${aValue}_\n _Disponible sur le site_\nwww.unitechconseil.online/statues`;

    // Vérifier si le message est vide
    if (!message.trim()) {
        alert("Le message à partager est vide.");
        return;
    }

    // Encoder le message pour être utilisé dans l'URL
    const encodedMessage = encodeURIComponent(message);

    // Créer l'URL pour partager via WhatsApp
    const url = `https://wa.me/?text=${encodedMessage}`;

    // Ouvrir une nouvelle fenêtre avec l'URL WhatsApp
    window.open(url, '_blank').focus();
}



// Function to handle like button click
function likePost(postId) {
    console.log('Like button clicked for post:', postId);
    const postRef = database.ref(`Statues/${postId}`);
    postRef.transaction(function(post) {
        if (post) {
            post.likes = (post.likes || 0) + 1; // Increment like count
        }
        return post;
    });
}

// Function to handle like button click
function likePost(postId) {
    const postRef = database.ref(`Statues/${postId}`);
    postRef.transaction(function(post) {
        if (post) {
            post.likes = (post.likes || 0) + 1; // Increment like count
        }
        return post;
    }).catch(function(error) {
        console.error('Error updating like count:', error);
    });
}

// Function to handle dislike button click
function dislikePost(postId) {
    const postRef = database.ref(`Statues/${postId}`);
    postRef.transaction(function(post) {
        if (post) {
            post.dislikes = (post.dislikes || 0) + 1; // Increment dislike count
        }
        return post;
    }).catch(function(error) {
        console.error('Error updating dislike count:', error);
    });
}


     function btncl(encodedTitle) {
        // Décoder le titre encodé
        const decodedTitle = decodeURIComponent(encodedTitle);
    
        // Remplacer les espaces par des underscores dans le titre
        const titleWithUnderscores = decodedTitle.replace(/ /g, "_");
    
        // Utiliser le titre mis à jour selon vos besoins
        console.log(titleWithUnderscores);
    
        // Rediriger vers la nouvelle URL avec le titre mis à jour
        window.location.href = `/s/texte.html?l=${encodeURIComponent(titleWithUnderscores)}`;

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




