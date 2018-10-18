const getOrderHistory = () => {
  const table = document.getElementById('order-history-table');
  fetch('https://fast-food-fast-12.herokuapp.com/api/v1/users/orders', {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    //   'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2tvcm8gc29sbyIsInVzZXJJZCI6MSwiZW1haWwiOiJlbWVrYUBnbWFpbC5jb20gIiwic3RhdHVzIjoiYWRtaW4iLCJpYXQiOjE1Mzk0MzA4OTYsImV4cCI6MTU0MTE1ODg5Nn0.CXFGhTllcqAibP47AMs_eExpdRQD9gkJGjnR3CpPJ70',
    },
  })
    .then(res => res.json())
    .then((orders) => {
      if (orders.status === 'Success') {
        let output = `<tr>
                        <th>Product</th>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Price</th>  
                    </tr>`;
        orders.orders.forEach((order) => {
          output += `<tr>
                        <td>${order.food}</td>
                        <td>${order.id}</td>
                        <td>${order.createdat.split('T')[0]}</td>
                        <td>${order.order_status}</td>
                        <td>&#8358; ${order.price}</td>
                       </tr>`;
        });
        table.innerHTML = output;
      }
    })
    .catch(error => console.log(error));
};
window.addEventListener('load', getOrderHistory);
console.log('connected');
