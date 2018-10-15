/* pop up*/
const menuModal = document.getElementById('myModal');

// Get the button that opens the modal
const orderButtons = document.querySelectorAll('.order-now')
// let menubtn = document.getElementById("order-now");

// Get the <span> element that closes the modal
const menuSpan = document.getElementById("close");

// When the user clicks the button, open the modal 
orderButtons.forEach((button,i,orderButtons) => button.addEventListener('click',function () {
    // get item price
    let itemPrice = document.getElementsByClassName("Price")[i].innerText;
    itemPrice = itemPrice.split(" ");
    itemPrice = parseInt(itemPrice[itemPrice.length-1],10);
        
    // display modal containing form
    menuModal.style.display = "block";

    let inputElement = document.getElementById('quantity');

    // clear input area
    inputElement.value = ``;

    // clear item total container
    document.getElementById('total-amount').innerText = ``;

    // tracking changes in quantity input and adding event listener.
    inputElement.oninput = function() {
        let quantity = document.getElementById('quantity').value;
        document.getElementById('total-amount').innerHTML = `Total: &#8358;${itemPrice * quantity}`;
    };  
}))

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
