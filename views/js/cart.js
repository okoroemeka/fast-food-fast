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
 * DISPLAY CART ITEMS IN A TABLE
 */
const products = JSON.parse(localStorage.getItem('product'));
const displayCart = () => {
//   const products = JSON.parse(localStorage.getItem('product'));
  let total = 0;
  let outPut = `<thead>
        <tr>
            <th>item</th>
            <th>quantity</th>
            <th>price</th>
            <th><i class="fa fa-remove"></i></th>
        </tr>
    </thead>`;
  products.forEach((product) => {
    total += product.price;
    outPut += `<tr>
    <td class="food-name">${product.food}</td>
    <td>
        <input type="number" value="1" class='quantity' name="item-quantity" class="quantity" placeholder="1" min="1">
    </td>
    <td>&#8358; <span class="price">${product.price}</span></td>
    <td>
        <input type="checkbox" class="check">
    </td>
</tr>`;
  });
  document.getElementById('cart-table-body').innerHTML = outPut;
  document.getElementById('cost').innerHTML = `Total: &#8358; ${total}`;
};
document.addEventListener('DOMContentLoaded', displayCart);

/**
 * PLACE MULTIPLE ORDER
 */
const completeOrder = document.getElementById('modal-order-button');
const placeOreder = (e) => {
  e.preventDefault();
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const telephone = document.getElementById('telephone').value;
  const foodName = document.querySelectorAll('.food-name');
  const quantity = document.querySelectorAll('.quantity');
  const price = document.querySelectorAll('.price');
  const mordifiedProducts = [];
  foodName.forEach((foodItem, i, foodName) => {
    const foodOrder = {
      food: foodItem.textContent,
      quantity: quantity[i].value,
      price: price[i].innerHTML,
    };
    mordifiedProducts.push(foodOrder);
  });
  const orderData = {
    street,
    city,
    telephone,
    product: mordifiedProducts,
  };
  const fetchData = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify(orderData),
  };
  fetch('https://fast-food-fast-12.herokuapp.com/api/v1/orders', fetchData)
    .then(res => res.json())
    .then((order) => {
      if (order.status === 'Success') {
        alertMessage(order.message);
        setTimeout(() => {
          localStorage.removeItem('product');
          window.location = 'menu.html';
        }, 3000);
      } else {
        alertMessage(order.message);
      }
    })
    .catch(error => alertMessage(error));
};
completeOrder.addEventListener('click', placeOreder);


/* pop up */
const menuModal = document.getElementById('myModal');

// Get the button that opens the modal
// const removeButton = document.querySelectorAll('.order-now')
const checkoutButton = document.getElementById('checkout-button');

// Get the <span> element that closes the modal
const menuSpan = document.getElementById('close');

// When the user clicks the button, open the modal
checkoutButton.onclick = function () {
  menuModal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
menuSpan.onclick = function () {
  menuModal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    menuModal.style.display = 'none';
  }
};


console.log('connected');
