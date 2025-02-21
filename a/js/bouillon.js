const postsRef = database.ref('Bouillon/'); // Référence à la base de données Firebase

postsRef.on('value', function(snapshot) {
  const postsByType = {};
  
  snapshot.forEach(function(childSnapshot) {
    const post = childSnapshot.val();
    const postId = childSnapshot.key;
    
    if (post.Type) {
      if (!postsByType[post.Type]) postsByType[post.Type] = [];
      postsByType[post.Type].push({ postId, post });
    }
  });

  // Afficher les boutons de filtrage
  const filterBar = document.getElementById('filter-bar');
  filterBar.innerHTML = '';
  
  const allButton = createFilterButton('All', displayAllPosts);
  filterBar.appendChild(allButton);

  Object.keys(postsByType).sort().forEach(type => {
    const filterButton = createFilterButton(type, () => filterPostsByType(type));
    filterBar.appendChild(filterButton);
  });

  displayAllPosts();

  function createFilterButton(text, callback) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', callback);
    return button;
  }

  function filterPostsByType(type) {
    displayPosts(postsByType[type]);
  }

  function displayAllPosts() {
    const allPosts = Object.values(postsByType).flat();
    displayPosts(allPosts);
  }

  function displayPosts(posts) {
    const blogDiv = document.getElementById('bouillon');
    blogDiv.innerHTML = ''; // Clear existing posts

    posts.forEach(({ post, postId }) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.setAttribute('data-type', post.Type);

      const postDate = new Date(post.SendDateTime);
      const timeAgo = getTimeAgo(postDate);

      postDiv.innerHTML = `
        <div id="${postId}" class="filterDiv_${post.Type} postId">
          <div class="img">
            <img src="${post.Image || post.LinkImage || ''}" alt="">
            <div class="filterDiv cars categorie">${post.Type || ''}</div>
          </div>
          <div class="barall">
            <div class="barcomment">
              <i class="fa fa-comment"></i>
              <span class="count" id="comment-count-${postId}">${formatNumber(post.Zcomments ? Object.keys(post.Zcomments).length : 0)}</span>
            </div>
            <div class="barlike">
              <i class="fa fa-thumbs-up"></i>
              <span id="likecount_${postId}">${formatNumber(post.likes || 0)}</span>
            </div>
            <div class="bardislike">
              <i class="fa fa-thumbs-down"></i>
              <span id="dislikecount_${postId}">${formatNumber(post.dislikes || 0)}</span>
            </div>
          </div>
          <h1>${post.Title || ''}</h1>
          <p>${post.Details || ''}</p>
          <p style="display: none;">${post.SousTitre || ''}</p>
          <div class="btnprix">
            <p><i class="fa fa-time"></i> ${postDate.toLocaleTimeString()} (${timeAgo})</p>

            <button class="edit-btn" onclick="editPost('${postId}')"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deletePost('${postId}')"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
      blogDiv.appendChild(postDiv);
    });
  }

  function getTimeAgo(postDate) {
    const now = new Date();
    const hoursDifference = Math.floor((now - postDate) / (1000 * 60 * 60));
    if (hoursDifference >= 24) {
      const daysDifference = Math.floor(hoursDifference / 24);
      return `${daysDifference} jours`;
    } else {
      return `${hoursDifference} heures`;
    }
  }

  function formatNumber(number) {
    if (number >= 1000) return (number / 1000).toFixed(1) + 'k';
    if (number >= 100) return (number / 100).toFixed(1) + 'c';
    return number.toString();
  }
});



// Fonction pour modifier un article
function editPost(postId) {
    // Récupérer les données de l'article à partir de Firebase
    const postRef = database.ref('Bouillon/' + postId);
    
    postRef.once('value', function(snapshot) {
      const post = snapshot.val();
      
      // Remplir les champs de saisie avec les données de l'article
      document.getElementById('category').value = post.Type || '';
      document.getElementById('subcategory').value = post.SousTitre || '';
      document.getElementById('subtitre').value = post.SousTitre || '';
      document.getElementById('imagelink').value = post.Image || post.LinkImage || '';
      document.getElementById('Type').value = post.Type || '';
      document.getElementById('title').value = post.Title || '';
      document.getElementById('details').value = post.Details || '';
    });
    
    // Lorsque l'utilisateur soumet le formulaire, mettre à jour l'article
    document.getElementById('submit-button').onclick = function() {
      const updatedPost = {
        Type: document.getElementById('category').value,
        SousTitre: document.getElementById('subcategory').value,
        Title: document.getElementById('title').value,
        Details: document.getElementById('details').value,
        Image: document.getElementById('imagelink').value,
        LinkImage: document.getElementById('imagelink').value
      };
  
      // Mettre à jour l'article dans Firebase
      postRef.update(updatedPost, function(error) {
        if (error) {
          console.log("Échec de la modification de l'article");
        } else {
          console.log("Article mis à jour avec succès");
          // Rediriger ou afficher un message de succès
        }
      });
    };
  }
  
  // Fonction pour supprimer un article
  function deletePost(postId) {
    const postRef = database.ref('Bouillon/' + postId);
    
    // Demander une confirmation avant de supprimer
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
    
    if (confirmDelete) {
      postRef.remove()
        .then(() => {
          console.log("Article supprimé avec succès");
          // Mettre à jour l'affichage ou rediriger
        })
        .catch((error) => {
          console.log("Erreur de suppression : ", error);
        });
    }
  }
  