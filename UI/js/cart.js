/* pop up*/
const menuModal = document.getElementById('myModal');

// Get the button that opens the modal
// const removeButton = document.querySelectorAll('.order-now')
let checkoutButton = document.getElementById("checkout-button");

// Get the <span> element that closes the modal
const menuSpan = document.getElementById("close");

// When the user clicks the button, open the modal 
checkoutButton.onclick = function() {
    menuModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
menuSpan.onclick = function() {
    menuModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        menuModal.style.display = "none";
    }
}

console.log("connected");
