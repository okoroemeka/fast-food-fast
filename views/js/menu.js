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
        /* pop up */
        const menuModal = document.getElementById('myModal');

        // Get the button that opens the modal
        const orderButtons = document.querySelectorAll('.order-now');
        // let menubtn = document.getElementById("order-now");

        // Get the <span> element that closes the modal
        const menuSpan = document.getElementById('close');

        // When the user clicks the button, open the modal
        orderButtons.forEach((button, i, orderButtons) => button.addEventListener('click', () => {
          // get item price
          let itemPrice = document.getElementsByClassName('Price')[i].innerText;
          itemPrice = itemPrice.split(' ');
          itemPrice = parseInt(itemPrice[itemPrice.length - 1], 10);

          // get item name
          food = document.getElementsByClassName('food')[i].innerText;
          // display modal containing form
          menuModal.style.display = 'block';

          const inputElement = document.getElementById('quantity');

          // clear input area
          inputElement.value = '';

          // clear item total container
          document.getElementById('total-amount').innerText = '';

          // tracking changes in quantity input and adding event listener.
          inputElement.oninput = () => {
            const quantity = document.getElementById('quantity').value;
            document.getElementById('total-amount').innerHTML = `Total: &#8358;${itemPrice * quantity}`;
          };
        }));

        // When the user clicks on <span> (x), close the modal
        menuSpan.onclick = () => {
          menuModal.style.display = 'none';
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
          if (event.target === modal) {
            menuModal.style.display = 'none';
          }
        };
      } else if (menus.status === 'fail') {
        alert(`${menus.message}`);
      } else {
        alert(`${menus.message}`);
      }
      //  console.log(menus);
    })
    .catch(error => console.log(error));

  /* Event Listener for creating Order */
  const createOrder = (e) => {
    e.preventDefault();
    // const food = document.getElementById('item-name').value;
    const quantity = document.getElementById('quantity').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const telephone = document.getElementById('telephone').value;
    const orderData = {
      food,
      quantity,
      street,
      city,
      telephone,
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
      .then(order => alert(order.message))
      .catch(error => alert(error));
  };
  document.getElementById('create-order').addEventListener('submit', createOrder);
};
window.addEventListener('load', getMenu);

console.log('connected');
