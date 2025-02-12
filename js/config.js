// Function to display dynamic content
function displayprofile() {
    var userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        var dynamicMenu = `
            <div class="users">
                <p><span>Nom: ${userData.name}</span></p>
                <p><span>Solde: ${userData.balance} €</span></p>
            </div>
        `;
        document.getElementById("profile_bar").innerHTML = dynamicMenu;
    } else {
        document.getElementById("profile_bar").innerHTML = dynamicMenu;
    }
}
displayprofile();



document.addEventListener('DOMContentLoaded', () => {
    var menu = document.getElementById('nav');
    var userData = JSON.parse(localStorage.getItem('userData'));
    var isLoggedIn = userData !== null;

    const content = `
        <nav class="menu">
            <div class="art-myuser">
                <div>
                    <img id="image" src="images/icon.png" alt="">
                </div>
                <div>
                    <p id="name">${isLoggedIn ? userData.name : 'Invité'}</p>
                    <p id="rc">${isLoggedIn ? userData.balance + ' €' : '0.00 €'}</p>
                    <p id="phone">${isLoggedIn ? userData.phone : 'Non disponible'}</p>
                    <p id="email">${isLoggedIn ? userData.email : 'Non disponible'}</p>
                </div>
                ${isLoggedIn ? `
                    <p id="logout"><a onclick="logout()"><i class="fa fa-unlock"></i> Déconnectez</a></p>
                ` : `<p id="connecte" onclick="openform()"><i class="fa fa-lock"></i> Connectez</p>`}
            </div>
            <ul>
                <li><a href="/index.html">Accueil</a></li>
                <li><a href="/Blog.html">Blog</a></li>
                <li><a href="/index.html#about">À propos</a></li>
            </ul>
        </nav>   
    `;
    menu.innerHTML = content;
});



// Function to display dynamic content
function displayFooter() {
    var dynamicMenu = ` 
        <div class="listfooter">
            <span class="btn-footer">
            <a href="#">Accueil</a>
            </span>
            <span>
            <a href="#">À propos</a>
            </span>
            <span>
            <a href="#">Contact</a>
            </span>
            <span></span>
        </div>
    `;
    document.getElementById("footer").innerHTML = dynamicMenu;
}

// Call the function to display dynamic content
displayFooter();