// Function to format points
// Fonction pour formater les points
function formatPoints(points) {
    // Vérifier si points est numérique
    if (typeof points === 'number') {
        return points.toFixed(2); // Formater les points à deux décimales
    } else {
        return ''; // Ou retourner une valeur par défaut, selon votre logique
    }
}


var usersRef = database.ref('users');
usersRef.orderByChild('Points').on('value', function(snapshot) {
    document.getElementById('userDetails').innerHTML = '';

    // Convert the snapshot to an array for easier sorting
    var usersArray = [];
    snapshot.forEach(function(childSnapshot) {
        var user = childSnapshot.val();
        user.key = childSnapshot.key;
        usersArray.push(user);
    });

    // Sort the users based on their points and stars
    usersArray.sort(function(a, b) {
        var starsComparison = calculateStars(b.Points).length - calculateStars(a.Points).length;
        if (starsComparison !== 0) {
            return starsComparison;
        } else {
            return b.Points - a.Points;
        }
    });

    // Iterate through sorted users to display them
    for (var i = 0; i < 5 && i < usersArray.length; i++) {
        var user = usersArray[i];
        var stars = calculateStars(user.Points);
        var usdAmount = convertPointsToUSD(user.Points); // Calculate USD amount for each user
        
        var myusersDiv = document.createElement('div');
        myusersDiv.className = 'myusers';
        myusersDiv.setAttribute('data-type', user.Type);
        myusersDiv.innerHTML = `
            <div class="img" onclick="btncl('${encodeURIComponent(user.Name || '')}')">
                <img src="${user.Image || user.LinkImage || '/images/icon.png'}" alt="">
                <div class="place">${user.Name || ''}</div>
                <div class="ref">${user.Referal || ''}</div>
                <div class="points"><span>${formatPoints(user.Points || '')}</span> Rc (<span id="convertpoint">${formatPoints(usdAmount)}</span> HTG)</div>
                <div class="stars">${stars}</div>
            </div>
        `;
        document.getElementById('userDetails').appendChild(myusersDiv);
    }
});

// Function to calculate stars based on points
function calculateStars(Points) {
    if (Points >= 100) {
        return '⭐⭐⭐⭐⭐';
    } else if (Points >= 80) {
        return '⭐⭐⭐⭐';
    } else if (Points >= 60) {
        return '⭐⭐⭐';
    } else if (Points >= 40) {
        return '⭐⭐';
    } else if (Points >= 20) {
        return '⭐';
    } else {
        return '';
    }
}

// Function to convert points to USD
function convertPointsToUSD(points) {
    var amount = points * 0.005;
    return amount.toFixed(2); // Round to two decimal places
}





//------------Articles de la page d'accueil-----------------//
// RÃ©fÃ©rence Ã  la base de donnÃ©es Firebase
var presentationsRef = database.ref('COURS/Anglais');

presentationsRef.once('value', function(snapshot) {
  var presentationsData = snapshot.val();
  var container = document.getElementById('Articles');

  // Trouver l'article le plus récent en parcourant les données
  var latestPresentation = null;
  var latestDate = new Date(0); // Date initiale très ancienne

  for (var presentationKey in presentationsData) {
    var presentationData = presentationsData[presentationKey];

    // Vérifier si la présentation a une description et si sa date est plus récente que la dernière trouvée
    if (presentationData.Details && presentationData.SendDateTime) {
      var presentationDate = new Date(presentationData.SendDateTime);

      if (presentationDate > latestDate) {
        latestDate = presentationDate;
        latestPresentation = {
          id: presentationKey,
          data: presentationData
        };
      }
    }
  }

  // Afficher seulement l'article le plus récent s'il existe
  if (latestPresentation) {
    var presentationData = latestPresentation.data;
    var presentationElement = document.createElement('div');
    presentationElement.className = 'post';
    
    // Vérifier si une image est disponible ou non
    if (presentationData.Image) {
      presentationElement.innerHTML = `
        <div id="${latestPresentation.id}" class="postId">
          <h1>${presentationData.Title || ''}</h1>
          <div class="img">
            <img src="${presentationData.Image}" alt="">
          </div>
          <p id="details">${presentationData.Details}</p>
          <p id="send-date">${presentationData.SendDateTime}</p>
        </div>
        <button class="more" onclick="btncl('${encodeURIComponent(presentationData.Title)}')">
          Lire la suite...
        </button>
      `;
    } else if (presentationData.VideoId) {
      // Si aucune image n'est disponible mais un ID vidéo YouTube est présent
      presentationElement.innerHTML = `
        <div id="${latestPresentation.id}" class="postId">
          <h1>${presentationData.Title || ''}</h1>
          <div class="video-container">
            <iframe  src="https://www.youtube.com/embed/${presentationData.VideoId}?rel=0" frameborder="0" allowfullscreen></iframe>
          </div>
          <p id="details">${presentationData.Details}</p>
          <p id="send-date">${presentationData.SendDateTime}</p>
        </div>
        <button class="more" onclick="btncl('${encodeURIComponent(presentationData.Title)}')">
          Lire la suite...
        </button>
      `;
    }
    
    container.appendChild(presentationElement);
  }
});







// RÃ©cupÃ©ration des donnÃ©es depuis Firebase
presentationsRef.once('value', function(snapshot) {
  var presentationsData = snapshot.val();
  var update = document.getElementById('Articles-update');

  // Convertir les données en tableau pour pouvoir trier par date
  var presentationsArray = [];
  for (var presentationKey in presentationsData) {
    presentationsArray.push({
      id: presentationKey,
      data: presentationsData[presentationKey]
    });
  }

  // Trier les présentations par date (supposons que la date est dans presentationData.SendDateTime)
  presentationsArray.sort(function(a, b) {
    var dateA = new Date(a.data.SendDateTime);
    var dateB = new Date(b.data.SendDateTime);
    return dateB - dateA; // Trie par ordre décroissant pour avoir le plus récent en premier
  });

  // Afficher les 4 présentations les plus récentes
  var count = 0;
  presentationsArray.forEach(function(presentationItem) {
    var presentationData = presentationItem.data;

    // Vérifier si la présentation a un titre et limiter à 4 articles
    if (presentationData.Title && count < 10) {
      var presentationElement = document.createElement('div');
      presentationElement.className = 'post';

      // Vérifier si l'image existe
      var imageSrc = presentationData.Image ? presentationData.Image : '/images/icon.png';

      presentationElement.innerHTML = `
        <div class="img">
          <img src="${imageSrc}" alt="">
        </div>
        <div id="${presentationItem.id}" class="postId">
          <h1>${presentationData.Title}</h1>
          <button class="more" onclick="btncl('${encodeURIComponent(presentationData.Title)}')">Lire la suite</button>
          <p>${presentationData.Details}</p>
          <p class="send-date">${presentationData.SendDateTime}</p>
        </div>
      `;
      update.appendChild(presentationElement);
      count++;
    }
  });
});

function btncl(encodedTitle) {
  // Décoder le titre encodé
  const decodedTitle = decodeURIComponent(encodedTitle);

  // Remplacer les espaces par des underscores dans le titre
  const titleWithUnderscores = decodedTitle.replace(/ /g, "_");

  // Utiliser le titre mis à jour selon vos besoins
  console.log(titleWithUnderscores);

  // Rediriger vers la nouvelle URL avec le titre mis à jour
  window.location.href = `/s/anglais.html?l=${encodeURIComponent(titleWithUnderscores)}`;

}


let slideIndex = 1;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    
    slides[slideIndex - 1].style.display = "block";
    
    setTimeout(showSlides, 5000); // Change slide every 2 seconds
}



