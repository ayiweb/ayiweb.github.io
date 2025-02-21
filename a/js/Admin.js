
  const firebaseConfig = {
    apiKey: "AIzaSyCvqf6mNg-FsbcU7vZf52xEi6Skp9tz3yU",
    authDomain: "signup-286f7.firebaseapp.com",
    databaseURL: "https://signup-286f7-default-rtdb.firebaseio.com",
    projectId: "signup-286f7",
    storageBucket: "signup-286f7.appspot.com",
    messagingSenderId: "579225916993",
    appId: "1:579225916993:web:f4f70c8c24584a770018c0",
    measurementId: "G-RH5HF2F7DN"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();




  var soutitletitle = document.getElementById('stitle').value;
  var imglink = document.getElementById('imagelink').value;
  
  
  function categorie() {
      const selectedCategory = document.getElementById('category').value;
      const subcategorySelect = document.getElementById('subcategory');
      const p = document.getElementById('showcategorie');
      
      
      // Clear previous options
      subcategorySelect.innerHTML = '';
  
      database.ref(selectedCategory).once('value', (snapshot) => {
          const categoryData = snapshot.val();
  
          if (categoryData) {
              // Assuming categoryData is an object with titles
              Object.keys(categoryData).forEach(title => {
                  const option = document.createElement('option');
                  option.value = title;
                  option.text = title;
                  subcategorySelect.add(option);
              });
            
              // Display data in the first paragraph
              const dataToShow = Object.keys(categoryData).join('<br>');
          } else {
              alert('No data found for the selected category.');
          }
      });
  }
  
  
  function subcategory() {
      // You can get the selected category if needed
      const selectedCategory = document.getElementById('category').value;
      
      // You might want to update the subcategory options here if necessary
      // ...
  
      // Call the function to update the title based on the selected subcategory
      updateTitle();
    }
  
    function updateTitle() {
      // Get the selected subcategory
      const selectedSubcategory = document.getElementById('subcategory').value;
  
      // Update the title input value with the selected subcategory
      document.getElementById('title').value = selectedSubcategory;
    }
  
    function imagelink() {
        // Récupérer la valeur de l'URL d'image depuis le champ de formulaire
        var imgLink = document.getElementById('imagelink').value;
        
        // Sélectionner l'élément image où vous voulez afficher l'image
        var imgElement = document.getElementById('img');
        
        // Mettre à jour l'attribut src de l'élément image avec l'URL récupérée
        imgElement.src = imgLink;
    }
    
  
  
// Function to save data to Firebase
function save() {
    // Get values from input fields
    const category = document.getElementById('category').value;
    var title = document.getElementById('title').value;
    var soutitle = document.getElementById('stitle').value;
    var image = document.getElementById('imagelink').value;
    var lien = document.getElementById('lien').value;
    var prix = document.getElementById('resultat').textContent;
    var type = document.getElementById('Type').value;
    var details = document.getElementById('details').value;

    // Create an object to store non-empty fields
    var dataToSave = {};

    // Check and add non-empty fields to the data object
    if (title) dataToSave.Title = title;
    if (soutitle) dataToSave.SousTitle = soutitle;
    if (image) dataToSave.Image = image;
    if (prix) dataToSave.Prix = prix;
    if (details) dataToSave.Details = details;
    if (lien) dataToSave.Telecharger = lien;
    if (type) dataToSave.Type = type;

    // Check if there are any non-empty fields
    if (Object.keys(dataToSave).length === 0) {
        alert('Please fill in at least one field before saving.');
        return; // Stop the save operation
    }

    // Save data to Firebase
    database.ref(category + "/" + title).set(dataToSave);

    // Clear all input fields after saving data
    document.getElementById('category').value = '';
    document.getElementById('title').value = '';
    document.getElementById('stitle').value = '';
    document.getElementById('imagelink').value = '';
    document.getElementById('lien').value = '';
    document.getElementById('resultat').textContent = '';
    document.getElementById('Type').value = '';
    document.getElementById('details').value = '';

    // Optionally, you can provide feedback to the user that the data has been saved successfully
    alert('Data saved successfully!');
}

  // Function to search data in Firebase
  function search() {
    const category = document.getElementById('category').value;
    var title = document.getElementById('title').value;
    var soutitle = document.getElementById('stitle');
    var image = document.getElementById('imagelink');
    var lien = document.getElementById('lien');
    var type = document.getElementById('Type');
    var prix = document.getElementById('resultat');
    var details = document.getElementById('details');
      
      //var imglink = document.getElementById('imagelink').value;
      console.log(title);
      database.ref(category +"/"+ title).once('value', (snapshot) => {
          console.log(category);
          const data = snapshot.val();
          console.log(data);
          if (data) {
              // Display data in the editor or handle it as needed
            
                soutitle.value = data.SousTitle;
                details.value = data.Details;
                type.value = data.Type;
                image.value = data.Image;
                prix.textContent = data.Prix
                lien.value = data.Telecharger

          } else {
              alert('No data found for the selected category.');
          }
      });
  }
  
// Function to update data in Firebase
function update() {
    // Get values from input fields
    const category = document.getElementById('category').value;
  
    const title = document.getElementById('title').value;
    const soutitle = document.getElementById('stitle').value;
    const image = document.getElementById('imagelink').value;
    const lien = document.getElementById('lien').value;
    const prix = document.getElementById('resultat').textContent;
    const type = document.getElementById('Type').value;
    const details = document.getElementById('details').value;

    // Get selected language
    const selectedLanguage = document.getElementById('langue').value;

    // Create an object to store non-empty fields
    const dataToUpdate = {};

    // Based on the selected language, update data accordingly
    switch (selectedLanguage) {
        case 'en':
            if (title) dataToUpdate.EnTitle = title;
            if (soutitle) dataToUpdate.EnSousTitle = soutitle;
            if (details) dataToUpdate.EnDetails = details;
            break;
        case 'es':
            if (title) dataToUpdate.EsTitle = title;
            if (soutitle) dataToUpdate.EsSousTitle = soutitle;
            if (details) dataToUpdate.EsDetails = details;
            break;
        case 'fr':
            if (title) dataToUpdate.Title = title;
            if (soutitle) dataToUpdate.SousTitle = soutitle;
            if (image) dataToUpdate.Image = image;
            if (prix) dataToUpdate.Prix = prix;
            if (details) dataToUpdate.Details = details;
            if (lien) dataToUpdate.Telecharger = lien;
            if (type) dataToUpdate.Type = type;
            break;
        default:
            alert('Please select a language');
            return; // Stop the update operation
    }

    // Check if there are any non-empty fields
    if (Object.keys(dataToUpdate).length === 0) {
        alert('Please fill in at least one field before updating.');
        return; // Stop the update operation
    }

    // Update data in Firebase
    database.ref(category + "/" + title).update(dataToUpdate);

    // Optionally, you can provide feedback to the user that the data has been updated successfully
    alert('Data updated successfully!');
}

  



  function convertToRC() {
    var htgAmount = parseFloat(document.getElementById("prix").value);
    var rcAmount = htgAmount / 0.005; // Taux de conversion HTG à RC
    document.getElementById("resultat").innerHTML = rcAmount;
}

