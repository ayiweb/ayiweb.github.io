 // Add event listeners to all buttons
 document.querySelectorAll('.offer-item button').forEach(function(button) {
    button.addEventListener('click', function() {
        // Get the corresponding offer item
        var offerItem = this.closest('.offer-item');
        // Extract offer details
        var offerTitle = offerItem.querySelector('h3').textContent;
        var prix = offerItem.querySelector('#prix').textContent;
        var rabais = offerItem.querySelector('#rabais').textContent;
        // Compose WhatsApp message
        var message = "Je suis intéressé par " + offerTitle + ".\n" + prix + "\n" + rabais;
        // Send the message via WhatsApp (replace this with your actual sending mechanism)
        sendMessage('+1234567890', message);
    });
});

// Function to send message (replace this with your actual implementation)
function sendMessage(phoneNumber, message) {

    var offerTitle = offerItem.querySelector('h3').textContent;
    var prix = offerItem.querySelector('#prix').textContent;
    var rabais = offerItem.querySelector('#rabais').textContent;

    console.log("Sending message to", phoneNumber, "with message:", message);
    var n = "\n"
    var url = "https://wa.me/?text="

    + offerTitle + "%0a"
    + n + "%0a"
    + prix + "%0a"
    + n + "%0a"
    + "_Accédez gratuitement en cliquant sur le lien suivant :_" + n +"%0a" + rabais + "%0a"
    + n + "%0a"
    + "_Pour nous aider à travailler, veuillez partager ce lien dans au moins 5 groupes._" + "%0a"
    
  
    window.open(url, '_blank').focus();
}