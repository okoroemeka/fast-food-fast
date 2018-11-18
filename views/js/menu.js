/* eslint-disable no-undef */
/**
 * @param {*} alertText
 */
const alertMessage = (alertText) => {
  const alertBox = document.getElementById('alert-box');
  document.getElementById('message').innerText = `${alertText}`;
  alertBox.style.display = 'block';
};
/**
 * Get menu
 */
const getMenu = () => {
  const menuContainer = document.getElementById('food-cards-sub-container');
  let food;
  fetch('https://fast-food-fast-12.herokuapp.com/api/v1/menu')
    .then(res => res.json())
    .then((menus) => {
      let outPut = '<div class="col-12" id="available-food"> <h1>Availabe Items</h1></div>';
      if (menus.status === 'success') {
        menus.menu.forEach((menuItem) => {
          outPut += `<div class="col-3 food-card">
            <div class="food-card-child">
                <img src=${menuItem.food_image} alt="food image" class="food-image">
                <div class="col-12 food-details">
                    <ul>
                        <li>
                            <span class="facts">Name:</span> 
                            <span class="food">${menuItem.food}</span>
                        </li>
                        <li>
                            <span class="facts">Price:</span>
                            <span class="Price"> &#8358; ${menuItem.price}</span>
                        </li>
                    </ul>
                    <div class="row">
                        <div class="col-6 order-button">
                            <button class="order-now" type="submit">Order now</button>
                        </div>
                        <div class="col-6 add-to-cart-button">
                            <button class="add-to-cart" type="submit">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        });
        menuContainer.innerHTML = outPut;
        // Get the button that opens the modal
        const orderButtons = document.querySelectorAll('.order-now');

        // When the user clicks the button, open the modal
        orderButtons.forEach((button, i, orderButtons) => button.addEventListener('click', () => {
          // get item price
          let itemPrice = document.getElementsByClassName('Price')[i].innerText;
          itemPrice = itemPrice.split(' ');
          itemPrice = parseInt(itemPrice[itemPrice.length - 1], 10);
          const product = [];
          // get item name
          food = document.getElementsByClassName('food')[i].innerText;
          const orderedProduct = {
            food,
            price: itemPrice,
            quantity: 1,
          };
          product.push(orderedProduct);
          localStorage.setItem('product', JSON.stringify(product));
          window.location = 'shoppingcart.html';
        }));

        /**
         *  HANDLING ADD TO CART FUNCTIONALITY
         */
        const cartButtons = document.querySelectorAll('.add-to-cart');
        const counter = document.getElementById('count');
        const product = [];
        cartButtons.forEach((button, i, cartButtons) => {
          button.addEventListener('click', () => {
            const foodItem = document.getElementsByClassName('food')[i].innerText;
            let cartItemPrice = document.getElementsByClassName('Price')[i].innerText;
            cartItemPrice = cartItemPrice.split(' ');
            cartItemPrice = parseInt(cartItemPrice[cartItemPrice.length - 1], 10);
            const orderedProduct = {
              food: foodItem,
              price: cartItemPrice,
              quantity: 1,
            };
            product.push(orderedProduct);
            localStorage.setItem('product', JSON.stringify(product));
            const productCount = JSON.parse(localStorage.getItem('product'));
            counter.innerText = productCount.length;
          });
        });
      } else if (menus.status === 'fail') {
        alertMessage(menus.message);
      } else {
        alertMessage(menus.message);
      }
    })
    .catch(error => alertMessage(error));
};
document.addEventListener('DOMContentLoaded', getMenu);

console.log('connected');
