//upload et save texte

function formatText(tag) {
    document.execCommand('formatBlock', false, tag);
}

let autoSaveInterval;
let autoSaveEnabled = false;
let savedFileName = '';

function saveDocument(isAutoSave = false) {
    const htmlContent = document.getElementById('editor').innerHTML;

    if (!autoSaveEnabled && !isAutoSave) {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = savedFileName || 'document.html';
        link.click();

        if (!savedFileName) return;

        autoSaveEnabled = true;
        startAutoSave();
    } else if (isAutoSave && savedFileName) {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = savedFileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function startAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
    autoSaveInterval = setInterval(() => {
        saveDocument(true); // Sauvegarde automatique
    }, 5000); // Sauvegarde toutes les 5 secondes
}

function uploadDocument(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('editor').innerHTML = e.target.result;
        };
        reader.readAsText(file);
    }
}
// deslect tout
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    let isSelecting = false;

    function wrapSelection(range) {
        const span = document.createElement('span');
        span.className = 'selected';
        range.surroundContents(span);
        // Efface la sélection après l'ajout
        window.getSelection().removeAllRanges();
    }

    function removeAllSelections() {
        const selectedElements = editor.getElementsByClassName('selected');
        while (selectedElements.length > 0) {
            const span = selectedElements[0];
            const parent = span.parentNode;
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
        }
    }

    function handleMouseDown(event) {
        if (event.ctrlKey) {
            isSelecting = true;
            // Prévenir la sélection par défaut
            event.preventDefault();
        }
    }

    function handleMouseUp(event) {
        if (isSelecting) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                wrapSelection(range);
                isSelecting = false; // Réinitialiser l'état de sélection
            }
        }
    }

    function handleDocumentClick(event) {
        if (!editor.contains(event.target)) {
            // Si on clique en dehors de l'éditeur, désélectionner tout
            removeAllSelections();
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            // Désélectionner tout en appuyant sur ESC
            removeAllSelections();
        }
    }

    // Ajouter les gestionnaires d'événements
    editor.addEventListener('mousedown', handleMouseDown);
    editor.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
});


//selectionner texte

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    let isSelecting = false;

    function wrapSelection(range) {
        const span = document.createElement('span');
        span.className = 'selected';
        range.surroundContents(span);
        // Efface la sélection après l'ajout
        window.getSelection().removeAllRanges();
    }

    function handleMouseDown(event) {
        if (event.ctrlKey) {
            isSelecting = true;
            // Prévenir la sélection par défaut
            event.preventDefault();
        }
    }

    function handleMouseUp(event) {
        if (isSelecting) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                wrapSelection(range);
                isSelecting = false; // Réinitialiser l'état de sélection
            }
        }
    }

    function handleDocumentClick(event) {
        if (!editor.contains(event.target)) {
            isSelecting = false;
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            isSelecting = false;
        }
    }

    // Ajouter les gestionnaires d'événements
    editor.addEventListener('mousedown', handleMouseDown);
    editor.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
});










//update editeur et preview
  
  // Function to update the preview code
  function updatePreviewCode() {
    var editorContent = document.getElementById('editor').innerHTML;
    var previewElement = document.getElementById('previewcode');

    // Debugging: Log the content of the editor
    console.log('Editor Content:', editorContent);

    // Set the content directly as innerText to display the raw HTML
    previewElement.innerText = editorContent;
}

// Event listener to update the preview code when the editor content changes
document.getElementById('editor').addEventListener('input', updatePreviewCode);

// Initial call to display any pre-existing content
updatePreviewCode();





// Function to update the editor with rendered HTML
function updateEditor() {
    var previewContent = document.getElementById('previewcode').innerText;
    var editorElement = document.getElementById('editor');

    // Debugging: Log the content of the preview
    console.log('Preview Content:', previewContent);

    // Set the content directly as innerHTML to render the HTML in the editor
    editorElement.innerHTML = previewContent;
}

// Event listener to update the editor when the preview code changes
document.getElementById('previewcode').addEventListener('input', updateEditor);

// Initial call to display any pre-existing content
updateEditor();



//configuration preview code
const editor = document.getElementById('previewcode');

editor.addEventListener('input', function () {
    const content = editor.innerText;
    const highlightedContent = highlightSyntax(content);
    editor.innerHTML = highlightedContent;
    placeCaretAtEnd(editor); // Garder le curseur à la fin
});

function highlightSyntax(code) {
    // Échappe les balises HTML
    code = code.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');

    // Coloration pour les balises HTML
    code = code.replace(/(&lt;\/?\w+)(.*?)(\/?&gt;)/g, function (match, p1, p2, p3) {
        const tag = `<span class="tag">${p1}</span>`;
        const attrs = p2.replace(/(\w+)(="[^"]*")/g, `<span class="attribute">$1</span><span class="attr-value">$2</span>`);
        return `${tag}${attrs}${p3}`;
    });

    // Coloration pour les commentaires HTML
    code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, `<span class="comment">$1</span>`);

    // Retourne le code coloré
    return code;
}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}



//pour ajouter lien dans un text de l'editeur
let savedRange;

document.getElementById('linkButton').addEventListener('click', function() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
        // Sauvegarder la sélection actuelle
        savedRange = selection.getRangeAt(0);

        // Afficher les éléments pour entrer l'URL
        document.getElementById('linkUrl').style.display = 'inline';
        document.getElementById('confirmLinkButton').style.display = 'inline';

        // Pré-remplir le champ avec l'URL si un lien est sélectionné
        const link = savedRange.startContainer.parentNode;
        if (link && link.nodeName === 'A') {
            document.getElementById('linkUrl').value = link.href;
        } else {
            document.getElementById('linkUrl').value = '';
        }
    } else {
        alert("Veuillez d'abord sélectionner du texte à lier.");
    }
});

document.getElementById('confirmLinkButton').addEventListener('click', function() {
    const url = document.getElementById('linkUrl').value;
    if (url && savedRange) {
        const selection = window.getSelection();
        
        // Rétablir la sélection sauvegardée
        selection.removeAllRanges();
        selection.addRange(savedRange);

        // Insérer ou modifier le lien
        let link = selection.anchorNode.parentNode;
        if (link && link.nodeName === 'A') {
            // Modifier le lien existant
            link.href = url;
            link.style.color = 'red';
            link.title = url; // Ajouter le title avec l'URL
        } else {
            // Créer un nouveau lien
            document.execCommand('createLink', false, url);
            link = selection.anchorNode.parentNode;
            if (link && link.nodeName === 'A') {
                link.style.color = 'red';
                link.title = url; // Ajouter le title avec l'URL
            }
        }
    }
});


    //inserer une image 1
    function insertImage() {
        const fileInput = document.getElementById('imageInput');
        const file = fileInput.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%'; // Limite la taille de l'image à la largeur du conteneur
                document.getElementById('editor').appendChild(img);
            };
            
            reader.readAsDataURL(file);
        }
    }






    function setColor(color) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.style.color = color;
            range.surroundContents(span);
            selection.removeAllRanges();  // Clear the selection
        }
    }

    function setColor(color) {
        document.execCommand('foreColor', false, color);
    }

      //changer couleur du texte
      function setColor(color) {
        document.execCommand('foreColor', false, color);
    }

    //modifier couleur du texte
    function setCustomColor() {
        const colorInput = document.getElementById('colorInput');
        const color = colorInput.value;
        setColor(color);
    }

    document.getElementById('customColorButton').addEventListener('click', function() {
        document.getElementById('colorInput').click();
    });

    //selectionner font family du texte
    function changeFontFamily() {
        const fontFamilySelect = document.getElementById('fontFamily');
        document.execCommand('fontName', false, fontFamilySelect.value);
    }


//button click to view editeur et preview

function editorcode(){
    document.getElementById('editor').style.display='none';
    document.getElementById('previewcode').style.display='block';
    document.querySelector('.editorcode').style.display='none';
    document.querySelector('.viewtexte').style.display='block';
}

function viewtexte(){
    document.getElementById('editor').style.display='block';
    document.getElementById('previewcode').style.display='none';
    document.querySelector('.editorcode').style.display='block';
    document.querySelector('.viewtexte').style.display='none';
}



	// Function to show add form and buttons
function addAdd() {
  document.querySelector('.form').style.display = 'block';
  document.querySelector('.btnclose').style.display = 'block';
}

// Function to show myInput and buttons
function myInput() {
  document.querySelector('.myInput').style.display = 'block';
  document.querySelector('.btnclose').style.display = 'block';
}

// Function to hide add form and buttons
function closeadd() {
  document.querySelector('.myInput').style.display = 'none';
  document.querySelector('.form').style.display = 'none';
  document.querySelector('.btnclose').style.display = 'none';
}





var imglink = document.getElementById('imagelink').value;
function updateSubcategory() {
  const selectedCategory = document.getElementById('category').value;
  const subcategorySelect = document.getElementById('subcategory');
  const stitre = document.getElementById('subtitre');

  // Clear previous options
  subcategorySelect.innerHTML = '';
  stitre.innerHTML = '';

  // Handle different categories
  switch (selectedCategory) {
      case 'COURS':
          database.ref(selectedCategory).once('value').then((snapshot) => {
              const categoryData = snapshot.val();

              if (categoryData) {
                  Object.keys(categoryData).forEach(title => {
                      const option = document.createElement('option');
                      option.value = title;
                      option.text = title;
                      subcategorySelect.appendChild(option);
                  });
              } else {
                  alert('No data found for the selected category.');
              }
          });
          document.getElementById('subcategory').style.display='block';
          break;

      case 'Bolg':
          database.ref(selectedCategory).once('value').then((snapshot) => {
              const categoryData = snapshot.val();

              if (categoryData) {
                  Object.keys(categoryData).forEach(title => {
                      const option = document.createElement('option');
                      option.value = title;
                      option.text = title;
                      stitre.appendChild(option);
                  });
              } else {
                  alert('No data found for the selected category.');
              }
          });
          document.getElementById('subcategory').style.display='none';
          break;

          case 'Bouillon':
            database.ref(selectedCategory).once('value').then((snapshot) => {
                const categoryData = snapshot.val();
  
                if (categoryData) {
                    Object.keys(categoryData).forEach(title => {
                        const option = document.createElement('option');
                        option.value = title;
                        option.text = title;
                        stitre.appendChild(option);
                    });
                } else {
                    alert('No data found for the selected category.');
                }
            });
            document.getElementById('subcategory').style.display='none';
            break;

            case 'Statues':
                database.ref(selectedCategory).once('value').then((snapshot) => {
                    const categoryData = snapshot.val();
      
                    if (categoryData) {
                        Object.keys(categoryData).forEach(title => {
                            const option = document.createElement('option');
                            option.value = title;
                            option.text = title;
                            stitre.appendChild(option);
                        });
                    } else {
                        alert('No data found for the selected category.');
                    }
                });
                document.getElementById('subcategory').style.display='none';
                document.getElementById('details').style.display='none';
                break;
      
      default:
          alert('Invalid category.');
  }
}

function updateSubtitle() {
  const Category = document.getElementById('category').value;
  const selectedCategory = document.getElementById('subcategory').value;
  const subcategorySelect = document.getElementById('subtitre');

  // Clear previous options
  subcategorySelect.innerHTML = '';

  const base = Category;
  database.ref(`${base}/${selectedCategory}`).once('value').then((snapshot) => {
      const categoryData = snapshot.val();

      if (categoryData) {
          const titles = Object.keys(categoryData);
          for (let i = 4; i < titles.length; i++) {
              const title = titles[i];
              const option = document.createElement('option');
              option.value = title;
              option.text = title;
              subcategorySelect.add(option);
          }
      } else {
          alert('No data found for the selected category.');
      }
  });
}

function updateTitle() {
  // Get the selected subtitle
  const selectedSubtitle = document.getElementById('subtitre').value;

  // Update the title input value with the selected subtitle
  document.getElementById('title').value = selectedSubtitle;
}


/* function convertToRC() {
  var htgAmount = parseFloat(document.getElementById("prix").value);
  var rcAmount = htgAmount / 0.005; // Taux de conversion HTG Ã  RC
  document.getElementById("resultat").innerHTML = rcAmount;
}*/



function addAdd() {
  document.querySelector('.form').style.display = 'block';
  document.querySelector('.btnclose').style.display = 'block';
}

function myInput() {
  document.querySelector('.myInput').style.display = 'block';
  document.querySelector('.btnclose').style.display = 'block';
}

function closeadd() {
  document.querySelector('.myInput').style.display = 'none';
  document.querySelector('.form').style.display = 'none';
  document.querySelector('.btnclose').style.display = 'none';
}

