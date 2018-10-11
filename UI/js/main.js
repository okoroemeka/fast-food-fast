/* navigation bar*/
let mainNav=document.getElementById('main-nav');
let navbarToggle=document.getElementById('navbar-toggle');

navbarToggle.addEventListener('click',function(){

    if(this.classList.contains('active')){
        mainNav.style.display="none";
        this.classList.remove('active');
    }
    else{
        mainNav.style.display="flex";
        this.classList.add('active');
    }
});
/* pop up*/
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let btn = document.getElementById("add-item");
// Get the <span> element that closes the modal
// const span = document.getElementsByClassName("close")[0];
const span = document.getElementById("close");
// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Admin add menu item
let addMenu = document.getElementById("add-menu-button");
let adminAction = document.getElementById("admin-menu");
addMenu.addEventListener('click',function(){

    if(this.classList.contains('active')){
        adminAction.style.display="block";
        this.classList.remove('active');
    }
    else{
        adminAction.style.display="none";
        this.classList.add('active');
    }
});
// online order list 
let orderList = document.getElementById("accepted-list-button");
let orderListAction = document.getElementById("accepted-oders");
orderList.addEventListener('click',function(){

    if(this.classList.contains('active')){
        orderListAction.style.display="block";
        this.classList.remove('active');
    }
    else{
        orderListAction.style.display="none";
        this.classList.add('active');
    }
})
console.log("connected");
