document.addEventListener('DOMContentLoaded', () => {
    var menu = document.getElementById('menue');
    const content = `
    <header>
        <div class="menu-icon" id="openMenu">☰</div>
        <h1>AYIWEB</h1>
    </header>

<nav id="sidebar">
    <div class="close-btn" id="closeMenu">&times;</div>
    <ul>
        <li><a href="#" onclick="closeMenu()">Accueil</a></li>
        <li><a href="#" onclick="closeMenu()">Profil</a></li>
        <li><a href="#" onclick="closeMenu()">Messages</a></li>
        <li><a href="#" onclick="closeMenu()">Paramètres</a></li>
    </ul>
</nav>
    `;
    menu.innerHTML = content;

            // Ajout des événements pour ouvrir/fermer le menu
            document.getElementById("openMenu").addEventListener("click", function() {
                document.getElementById("sidebar").style.left= "0";
            });
    
            document.getElementById("closeMenu").addEventListener("click", function() {
                document.getElementById("sidebar").style.left = "-250px";
            });
});

function closeMenu(){
    document.getElementById("sidebar").style.left = "-250px";
}
//footer de mon site web
document.addEventListener('DOMContentLoaded', () => {

    var footers= document.getElementById('footer');
    const content = `
        <div class="footer-menu">
        <a href="/index.html"><span>🏹</span><span>Accueil</span></a>
        <a style="display:none" href=""><span>🔍</span><span>Chercher</span></a>
        <a href=""><span>➕</span><span>Chaine</span></a>
        <a  href="/blog.html"><span>🌍</span><span>Blog</span></a>
        <a href=""><span>💬</span><span>Messages</span></a> 
        </div>
    `;
    footers.innerHTML = content;
});




/*document.addEventListener('DOMContentLoaded', () => {
    alert('hello');
    var menu = document.getElementById('menue');
    const content = `

    `;
     menu.innerHTML = content;
});*/















