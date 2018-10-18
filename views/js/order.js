const getOrders = () => {
  const table = document.getElementById('online-order');
  fetch('https://fast-food-fast-12.herokuapp.com/api/v1/orders', {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  })
    .then(res => res.json())
    .then((orders) => {
      if (orders.status === 'success') {
        let output = `<tr>
                            <th>Name</th>
                            <th>Order Id</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Response</th>
                      </tr>`;
        orders.orders.forEach((order) => {
          output += `<tr>
            <td>${order.fullname}</td>
            <td>${order.id}</td>
            <td>${order.food}</td>
            <td>${order.quantity}</td>
            <td>
                <span>
                    <button class="accept-button">Accept</button>
                </span>
                <span>
                    <button class="reject-button">Decline</button>
                </span>
            </td>
        </tr>`;
        });
        table.innerHTML = output;
      } else if (orders.status === 'Fail') {
        alert(orders.message);
      } else {
        alert(orders.message);
      }
    })
    .catch(error => console.log(error));
};
window.addEventListener('load', getOrders);
console.log('connected');
