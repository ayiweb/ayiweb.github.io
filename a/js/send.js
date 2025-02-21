function save() {
    const category = document.getElementById('category').value;
    const selectedCategory = document.getElementById('subcategory').value;
    const subcategorySelect = document.getElementById('subtitre').value;
    var title = document.getElementById('title').value.trim();
    var image = document.getElementById('imagelink').value.trim();
    var type = document.getElementById('Type').value.trim();
    var details = document.getElementById('details').value.trim();
    var des = document.getElementById('previewcode').innerHTML.trim(); // Get content from contenteditable div
    const selectedLanguage = document.getElementById('langue').value;
  
    // Basic validation
    if (!title || !image || !type || !des || (category !== 'Statues' && !details)) {
        alert('Please fill in all fields.');
        return;
    }
  
    if (!['en', 'ht', 'fr'].includes(selectedLanguage)) {
        alert('Invalid language selected.');
        return;
    }
  
    let data = {};
  
    // Add send date and time
    const sendDateTime = new Date().toISOString(); // Include both date and time
  
    switch (selectedLanguage) {
        case 'en':
            data = {
              enTitle: title,
              enDescription: des,
              enImage: image,
              enType: type,
              ...(category !== 'Statues' && { enDetails: details }), // Ignore details if category is Statues
              SendDateTime: sendDateTime
            };
            break;
        case 'ht':
            data = {
              esTitle: title,  
              esDescription: des,
              esImage: image,
              esType: type,
              ...(category !== 'Statues' && { esDetails: details }), // Ignore details if category is Statues
              SendDateTime: sendDateTime
            };
            break;
        case 'fr':
            data = {
              Title: title, 
              Description: des,
              Image: image,
              Type: type,
              ...(category !== 'Statues' && { Details: details }), // Ignore details if category is Statues
              SendDateTime: sendDateTime
            };
            break;
    }
  
    // Save data to Firebase
    let refPath;
    switch (category) {
        case 'COURS':
            refPath = `${category}/${selectedCategory}/${title}`;
            break;
        case 'Bolg':
        case 'Bouillon':
        case 'Statues':
            refPath = `${category}/${title}`;
            break;
        default:
            alert('Invalid category.');
            return;
    }
  
    database.ref(refPath).set(data, (error) => {
        if (error) {
            console.error('Data could not be saved:', error);
            alert('Data could not be saved. Please try again.');
        } else {
            alert('Data saved successfully.');
        }
    });
}

  
  function search() {
    const category = document.getElementById('category').value;
    const selectedCategory = document.getElementById('subcategory').value;
    const title = document.getElementById('title').value.trim();
    const image = document.getElementById('imagelink');
    const type = document.getElementById('Type');
    const details = document.getElementById('details');
    const descriptionDiv = document.getElementById('editor'); // contenteditable div
    const selectedLanguage = document.getElementById('langue').value;
  
    let refPath;
    switch (category) {
        case 'COURS':
            refPath = `${category}/${selectedCategory}/${title}`;
            break;
        case 'Bolg':
        case 'Bouillon':
        case 'Statues':
            refPath = `${category}/${title}`;
            break;
        default:
            alert('Invalid category.');
            return;
    }
  
    database.ref(refPath).once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            switch (selectedLanguage) {
                case 'en':
                    descriptionDiv.innerHTML = data.enDescription;
                    image.value = data.enImage;
                    type.value = data.enType;
                    details.value = data.enDetails;
                    break;
                case 'ht':
                    descriptionDiv.innerHTML = data.esDescription;
                    image.value = data.esImage;
                    type.value = data.esType;
                    details.value = data.esDetails;
                    break;
                case 'fr':
                    descriptionDiv.innerHTML = data.Description;
                    image.value = data.Image;
                    type.value = data.Type;
                    details.value = data.Details;
                    break;
                default:
                    alert('Please select a language');
                    return;
            }
        } else {
            alert('No data found for the selected category.');
        }
    });
  }
  
  function update() {
      const category = document.getElementById('category').value;
    const selectedCategory = document.getElementById('subcategory').value;
    const subcategorySelect = document.getElementById('subtitre').value;
    var title = document.getElementById('title').value.trim();
    var image = document.getElementById('imagelink').value.trim();
    var type = document.getElementById('Type').value.trim();
    var details = document.getElementById('details').value.trim();
    var des = document.getElementById('previewcode').innerText.trim(); // Get content from contenteditable div
    const selectedLanguage = document.getElementById('langue').value;
  
    // Basic validation
    if (!title || !image || !type || !details || !des) {
        alert('Please fill in all fields.');
        return;
    }
  
    if (!['en', 'ht', 'fr'].includes(selectedLanguage)) {
        alert('Invalid language selected.');
        return;
    }
  
    let data = {};
  
    // Add send date and time
    const sendDateTime = new Date().toISOString(); // Include both date and time
  
    switch (selectedLanguage) {
        case 'en':
            data = {
              enTitle: title,
              enDescription: des,
              enImage: image,
              enType: type,
              enDetails: details,
              SendDateTime: sendDateTime
            };
            break;
        case 'ht':
            data = {
              esTitle: title,  
              esDescription: des,
              esImage: image,
              esType: type,
              esDetails: details,
              SendDateTime: sendDateTime
            };
            break;
        case 'fr':
            data = {
              Title: title, 
              Description: des,
              Image: image,
              Type: type,
              Details: details,
              SendDateTime: sendDateTime
            };
            break;
    }
  
    // Save data to Firebase
    let refPath;
    switch (category) {
        case 'COURS':
            refPath = `${category}/${selectedCategory}/${title}`;
            break;
        case 'Bolg':
            refPath = `${category}/${title}`;
            break;
        case 'Bouillon':
        refPath = `${category}/${title}`;
        break;
        default:
            alert('Invalid category.');
            return;
    }
  
    database.ref(refPath).update(data, (error) => {
        if (error) {
            console.error('Data could not be saved:', error);
            alert('Data could not be saved. Please try again.');
        } else {
            alert('Data saved successfully.');
        }
    });
  }
  