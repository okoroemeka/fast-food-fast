/**
 * @param {*} alertText
 */
const alertMessage = (alertText) => {
  const alertBox = document.getElementById('alert-box');
  document.getElementById('message').innerText = `${alertText}`;
  alertBox.style.display = 'block';
};

// order Id
let orderId;

/**
 * @param {*}
 */
const getOrders = () => {
  const table = document.getElementById('online-order');
  fetch('api/v1/orders', {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  })
    .then(res => res.json())
    .then((orders) => {
      if (orders.status === 'success') {
        let output = `<tr>
                            <th>Order Id</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Status</th>
                      </tr>`;
        orders.orders.forEach((order) => {
          output += `<tr class="order" id=${order.id}>
            <td>${order.id}</td>
            <td>${order.food}</td>
            <td>${order.quantity}</td>
            <td>${order.order_status}</td>
        </tr>`;
        });
        table.innerHTML = output;

        /**
        * Add event listeners to Get specific order
        * Consume Get specific order API
        */
        const allOrders = document.querySelectorAll('.order');
        allOrders.forEach((order) => {
          order.addEventListener('click', () => {
            orderId = parseInt(order.id, 10);
            fetch(`api/v1/orders/${orderId}`, {
              headers: {
                'x-access-token': localStorage.getItem('token'),
              },
            })
              .then(res => res.json())
              .then((orderData) => {
                if (orderData.status === 'Success') {
                  const orderOutput = `<div class="col-12" id='order-card'>
                                        <ul>
                                            <li><span class='facts'>Food</span>:<span> ${orderData.order.food}</span></li>
                                            <li><span class='facts'>Quantity</span>:<span> ${orderData.order.quantity}</span></li>
                                            <li><span class='facts'>Customers name</span>:<span> ${orderData.order.fullname}</span></li>
                                            <li><span class='facts'>Customers Address</span>:<span> ${orderData.order.delivary_address}</span></li>
                                            <li><span class='facts'>Phone</span>:<span> ${orderData.order.telephone}</span></li>
                                            <li><span class='facts'>Order status</span>:<span> ${orderData.order.order_status}</span></li>
                                            <li><span class='facts'>Order Date</span>:<span> ${orderData.order.createdat.split('T')[0]}</span></li>
                                        </ul>
                                    </div>`;
                  document.getElementById('specific-order').innerHTML = orderOutput;
                  const modal = document.getElementById('orderModal');
                  modal.style.display = 'block';
                  const orderModalClose = document.getElementById('order-modal-close');

                  // When the user clicks on <span> (x), close the modal
                  orderModalClose.onclick = () => {
                    modal.style.display = 'none';
                  };

                  // When the user clicks anywhere outside of the modal, close it
                  window.onclick = (event) => {
                    if (event.target === modal) {
                      modal.style.display = 'none';
                    }
                  };
                } else {
                  alertMessage(orderData.message);
                }
              })
              .catch(err => alertMessage(err));
          });
        });
      } else if (orders.status === 'Fail') {
        alertMessage(orders.message);
      } else {
        alertMessage(orders.message);
      }
    })
    .catch(error => alertMessage(error));
};
document.addEventListener('DOMContentLoaded', getOrders);

/**
 * Consuming the API for Updating order status.
 */
const orderButtons = document.querySelectorAll('.order-button');
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Getting the button value
    const buttonValue = button.textContent;
    const updateValue = (buttonValue === 'Accept') ? 'Processing' : 'Cancelled';
    const data = {
      status: updateValue,
    };
    fetch(`api/v1/orders/${orderId}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((updateData) => {
        alertMessage(updateData.message);
      })
      .catch((err) => {
        alertMessage(err);
      });
  });
});
console.log('connected');
