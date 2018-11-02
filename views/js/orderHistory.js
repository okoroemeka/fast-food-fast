/**
 * @param {*} alertText
 */
const alertMessage = (alertText) => {
  const alertBox = document.getElementById('alert-box');
  document.getElementById('message').innerText = `${alertText}`;
  alertBox.style.display = 'block';
};

/**
 * Get order history
 */
const getOrderHistory = () => {
  const table = document.getElementById('order-history-table');
  fetch('https://fast-food-fast-12.herokuapp.com/api/v1/users/orders', {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  })
    .then(res => res.json())
    .then((orders) => {
      if (orders.status === 'Success') {
        let output = `<tr>
                        <th>Product</th>
                        <th>Id</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th> 
                    </tr>`;
        orders.orders.forEach((order) => {
          output += `<tr>
                        <td>${order.food}</td>
                        <td>${order.id}</td>
                        <td>${order.quantity}</td>
                        <td>&#8358; ${order.price}</td>
                        <td>&#8358; ${order.total}</td>
                        <td>${order.createdat.split('T')[0]}</td>
                        <td>${order.order_status}</td>
                       </tr>`;
        });
        table.innerHTML = output;
      } else {
        alertMessage(orders.message);
      }
    })
    .catch(error => alertMessage(error));
};
document.addEventListener('DOMContentLoaded', getOrderHistory);
console.log('connected');
