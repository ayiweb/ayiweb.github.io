document.getElementById('formatButton').addEventListener('click', () => {
    // Récupérer le contenu de l'éditeur
    const editor = document.getElementById('editor');
    let content = editor.innerHTML;
  
    // Convertir le contenu en texte brut (sans balises HTML)
    const plainText = content.replace(/<\/?[^>]+(>|$)/g, ""); // Enlève toutes les balises HTML
  
    // Remplacer le contenu de l'éditeur par le texte brut
    editor.innerText = plainText;
  });

  function bouillons(){
    document.querySelector('#blog').style.display='none';
    document.querySelector('#bouillon').style.display='block';
}
function blog(){
  document.querySelector('#blog').style.display='block';
  document.querySelector('#bouillon').style.display='none';
}


  