const bolgRef = database.ref('Bolg/'); // Référence à la base de données Bolg
const bouillonRef = database.ref('Bouillon/'); // Référence à la base de données Bouillon

// Gestion de Bolg
bolgRef.on('value', function(snapshot) {
  displayPosts(snapshot, 'blog');
});

// Gestion de Bouillon
bouillonRef.on('value', function(snapshot) {
  displayPosts(snapshot, 'bouillon');
});

function displayPosts(snapshot, targetDivId) {
  const postsByType = {};
  snapshot.forEach(function(childSnapshot) {
    const post = childSnapshot.val();
    const postId = childSnapshot.key;

    if (post.Type) {
      if (!postsByType[post.Type]) postsByType[post.Type] = [];
      postsByType[post.Type].push({ postId, post });
    }
  });

  // Affichage des boutons de filtrage
  const filterBar = document.getElementById('filter-bar');
  filterBar.innerHTML = '';

  const allButton = createFilterButton('All', () => displayAllPosts(postsByType, targetDivId));
  filterBar.appendChild(allButton);

  Object.keys(postsByType).sort().forEach(type => {
    const filterButton = createFilterButton(type, () => filterPostsByType(postsByType, type, targetDivId));
    filterBar.appendChild(filterButton);
  });

  displayAllPosts(postsByType, targetDivId);
}

function createFilterButton(text, callback) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', callback);
  return button;
}

function filterPostsByType(postsByType, type, targetDivId) {
  displayFilteredPosts(postsByType[type], targetDivId);
}

function displayAllPosts(postsByType, targetDivId) {
  const allPosts = Object.values(postsByType).flat();
  displayFilteredPosts(allPosts, targetDivId);
}

function displayFilteredPosts(posts, targetDivId) {
  const blogDiv = document.getElementById(targetDivId);
  blogDiv.innerHTML = ''; // Vider les posts actuels

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
          <button class="edit-btn" onclick="editPost('${postId}', '${targetDivId}')"><i class="fas fa-edit"></i></button>
          <button class="delete-btn" onclick="deletePost('${postId}', '${targetDivId}')"><i class="fas fa-trash"></i></button>
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
    return `${Math.floor(hoursDifference / 24)} jours`;
  } else {
    return `${hoursDifference} heures`;
  }
}

function formatNumber(number) {
  if (number >= 1000) return (number / 1000).toFixed(1) + 'k';
  if (number >= 100) return (number / 100).toFixed(1) + 'c';
  return number.toString();
}

// Modifier un article
function editPost(postId, category) {
  const postRef = database.ref(category === 'blog' ? 'Bolg/' + postId : 'Bouillon/' + postId);
  
  postRef.once('value', function(snapshot) {
    const post = snapshot.val();

    document.getElementById('menu').classList.toggle('open');
    
    document.getElementById('category').value = post.Type || '';
    document.getElementById('subcategory').value = post.SousTitre || '';
    document.getElementById('title').value = post.Title || '';
    document.getElementById('details').value = post.Details || '';
    document.getElementById('editor').innerHTML = post.Description || '';
    document.getElementById('imagelink').value = post.Image || post.LinkImage || '';
    
    document.getElementById('submit-button').onclick = function() {
      const updatedPost = {
        Type: document.getElementById('category').value,
        SousTitre: document.getElementById('subcategory').value,
        Title: document.getElementById('title').value,
        Details: document.getElementById('details').value,
        Image: document.getElementById('imagelink').value,
        LinkImage: document.getElementById('imagelink').value
      };
  
      postRef.update(updatedPost, function(error) {
        if (error) {
          console.log("Échec de la modification de l'article");
        } else {
          console.log("Article mis à jour avec succès");
        }
      });
    };
  });
}

// Supprimer un article
function deletePost(postId, category) {
  const postRef = database.ref(category === 'blog' ? 'Bolg/' + postId : 'Bouillon/' + postId);
  
  const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
  if (confirmDelete) {
    postRef.remove()
      .then(() => console.log("Article supprimé avec succès"))
      .catch((error) => console.log("Erreur de suppression : ", error));
  }
}
