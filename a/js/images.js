function upload() {
    const fileInput = document.getElementById('upload');
    const statusMessage = document.getElementById('statusMessage');
    const uploadedImage = document.getElementById('imageview');
    const imageLinkInput = document.getElementById('imagelink');
    const imageLink = document.createElement('p'); // Créer un élément pour afficher le lien de l'image

    if (fileInput.files.length === 0) {
        statusMessage.textContent = "Veuillez sélectionner une image.";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();

    const cloudName = 'dwoneebnf';  // Remplacez par votre nom de cloud
    const uploadPreset = 'unitechconseil';  // Utilisez le preset 'unitechconseil'

    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.secure_url) {
            statusMessage.textContent = "Téléchargement réussi!";
            uploadedImage.src = data.secure_url;
            uploadedImage.style.display = 'block';

            imageLinkInput.value = data.secure_url; 
            document.body.appendChild(imageLink); // Ajouter l'URL sous l'image
        } else {
            statusMessage.textContent = "Erreur lors du téléchargement.";
        }
    })
    .catch(err => {
        statusMessage.textContent = "Erreur lors du téléchargement: " + err.message;
    });
}
