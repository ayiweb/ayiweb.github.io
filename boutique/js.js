// Fonction pour récupérer le panier actuel ou initialiser un panier vide
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Fonction pour mettre à jour le panier dans le localStorage et l'UI
function updateCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();  // Mettre à jour l'affichage du panier
    updateCartCount();    // Mettre à jour le compteur d'articles
}

// Fonction pour mettre à jour l'affichage du nombre d'articles dans le panier
function updateCartCount() {
    const cart = getCart();
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerHTML = cart.length;
    }
}

// Fonction pour vérifier si un élément existe déjà dans le panier par son titre
function isItemInCart(title) {
    const cart = getCart();
    return cart.some(item => item.title === title);
}

// Fonction pour mettre à jour l'affichage du panier et le prix total
function updateCartDisplay() {
    const cart = getCart();
    const panierItems = document.getElementById('panier-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    panierItems.innerHTML = '';  // Réinitialiser l'affichage du panier

    if (cart.length === 0) {
        panierItems.innerHTML = '<p>Aucun document dans le panier</p>';
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('panier-item');
        itemDiv.innerHTML = `
            <input type="checkbox" class="cart-checkbox" data-index="${index}">
            <p class="nomDocs">${item.title}</p>
            <p class="detailsDocs">Auteur: ${item.author}</p>
            <p class="prixDocs">${item.price} €</p>
        `;
        panierItems.appendChild(itemDiv);
        totalPrice += item.price;  // Ajouter le prix au total
    });

    totalPriceElement.innerHTML = totalPrice.toFixed(2);  // Mettre à jour le prix total
}

// Fonction pour télécharger tous les documents (générer une URL de téléchargement)
function downloadAllDocs() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Aucun document dans le panier.");
        return;
    }

    cart.forEach(item => {
        const link = document.createElement('a');
        link.href = item.cover;  // Utiliser l'URL du fichier à télécharger
        link.download = `${item.title}.pdf`;  // Nom du fichier téléchargé
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Fonction pour supprimer les éléments cochés du panier
function removeSelectedItems() {
    let cart = getCart();
    const checkboxes = document.querySelectorAll('.cart-checkbox');
    
    // Filtrer les éléments qui ne sont pas cochés
    const remainingItems = cart.filter((item, index) => {
        return !checkboxes[index].checked;
    });

    // Mettre à jour le panier avec les éléments non cochés
    updateCart(remainingItems);
}

// Initialiser le compteur et le panier au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    updateCartDisplay();  // Afficher le contenu du panier lors du chargement
});

const dbRef = firebase.database().ref('Livres');

// Ajouter l'événement click à chaque bouton "Ajouter au panier"
dbRef.once('value', (snapshot) => {
    document.getElementById('splash-screen').style.display='none';
    const booksContainer = document.getElementById('books-container');
    snapshot.forEach(book => {
        const data = book.val();
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <div class="image"><img src="images/${data.Image}" alt="${data.Title}"></div>
            <h3 data-title="${data.Title}">${data.Title}</h3>
            <p data-author="${data.author}">${data.author}</p>
            <p class="price">${data.Prix} €</p>
            <button data-title="${data.Title}" data-author="${data.author}" data-price="${data.Prix}" data-cover="images/${data.cover}">Ajouter au panier</button>
        `;
        booksContainer.appendChild(bookCard);

        // Ajout de l'événement click
        bookCard.querySelector('button').addEventListener('click', function () {
            const title = this.getAttribute('data-title');
            const author = this.getAttribute('data-author');
            const price = parseFloat(this.getAttribute('data-price'));
            const cover = this.getAttribute('data-cover');

            // Vérifier si l'article est déjà dans le panier
            if (isItemInCart(title)) {
                alert(`${title} est déjà dans le panier.`);
            } else {
                // Récupérer le panier actuel
                let cart = getCart();

                // Ajouter l'article au panier
                cart.push({ title, author, price, cover });

                // Mettre à jour le panier dans le localStorage
                updateCart(cart);

                alert(`${title} a été ajouté au panier.`);
            }
        });
    });
});
