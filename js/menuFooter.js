document.addEventListener('DOMContentLoaded', function () {

    var userData = JSON.parse(localStorage.getItem('userData'));
    var isLoggedIn = userData !== null; // Vérifiez si userData est différent de null
    var menu = document.getElementById('menu');
    var amount = isLoggedIn ? userData.Points * 0.005 : 0; // Assurez-vous que userData n'est pas null avant d'accéder à ses propriétés
 
    const content = `
        <div class="menutop">
            
            <div class="topbtn">
                 <button class="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
                </button>
                <i onclick="toggleMenu()" class="fa fa-bars"></i>
                <i onclick="toggleMenu()" id="close" class="fa fa-close"></i>
            </div>
            <div class="topbtn rc">
                    <strong>Rc</strong> 
                    <span id="rc">0.00</span>
                <br>
                    <strong>HTG</strong> 
                    <span id="amount">${(amount).toFixed(2)}</span>
            </div>
        </div>
        <div class="menu sidenav">
            <div>
                <div class="art-myuser">
                    <img id="image" src="images/icon.png" alt="">
                    <p id="name">Unitech Conseil</p>
                    <p id="phone">00.00.00.00</p>
                    <p id="email">@gmail</p>
                </div>
                <div class="sideItem">
                    <h1>Menu de la page</h1>
                    <p><a href="/index.html"><i class="fa fa-home"></i> Accueil</a></p>
                    <p><a href="/c/concours.html"><i class="fa fa-home"></i> Concours</a></p>
                    <p id="profile"><a onclick="profile()"><i class="fa fa-user"></i> Profile</a></p>
                    <p><a href="/p/livres.html"><i class="fa fa-book"></i> Livres</a></p>
                    <p><a href="/services.html"><i class="fa fa-cogs"></i>Services</a></p>
                    ${isLoggedIn ? `
                    <p id="logout"><a onclick="logout()"><i class="fa fa-unlock"></i> Déconnectez</a></p>
                ` :  `<p id="connect"><a href="/users/user.html"><i class="fa fa-lock"></i> Connectez</a></p>
                `}
                    <p><a href="#"><i class="fa fa-refresh"></i> Refresh</a></p>
                    <p><a href="/propos.html"><i class="fa fa-circle"></i> A propos</a></p>
                    <p><a href="/privacy.html"><i class="fa fa-lock"></i> Privacy</a></p>
                </div>
            </div>
        </div>
    `;
    menu.innerHTML = content;
    

    // Added script
    if (isLoggedIn) {
       document.getElementById("connect").style.display='none';
       document.getElementById("creataccount").style.display='none';
    } else {
        document.getElementById("connect").style.display='block';
    }
});






function toggleMenu() {
    var menu = document.querySelector('.menu');
    var openIcon = document.querySelector('.fa-bars');
    var closeIcon = document.querySelector('.fa-close');

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        setTimeout(function(){
            menu.style.display = 'none';
        }, 600); // Délai pour masquer le menu après l'animation de fondu (0.6s * 1000)
        openIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        menu.style.display = 'block';
        setTimeout(function(){
            menu.classList.add('open');
        }, 100); // Délai pour activer la classe 'open' après l'affichage du menu
        openIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }
}







/*------------------ Footer -------------------------*/
document.addEventListener('DOMContentLoaded', function () {
var footer = document.querySelector('.mobile-footer');
const contentFooter = `
    <div class="footer-content">
        <div class="footer-list">
            <a href="/index.html" class="footer-item"><i class="fa fa-home"></i> Accueil</a>
            <a href="/statues.html" class="footer-item"><i class="fa fa-comment"></i> Statues</a>
            <a href="/p/texte.html" class="footer-item"><i class="fa fa-comment"></i> Texte</a>
            <a href="/p/livres.html" class="footer-item"><i id="podcastIcon" class="fa fa-book"></i>Livres</a>
            <a href="/p/cours.html" class="footer-item"><i class="fa fa-android"></i>Cours</a>
            <a href="/p/articles.html" class="footer-item"><i class="fa fa-square"></i>Blog</a>
        </div>
    </div>
`;
footer.innerHTML = contentFooter;
});