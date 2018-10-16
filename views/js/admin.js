const createMenu = (e) => {
  e.preventDefault();
  const foodImage = document.getElementById('food-image').value;
  const food = document.getElementById('item-name').value;
  const price = document.getElementById('item-price').value;
  const foodData = {
    foodImage,
    food,
    price,
  };
  const fetchData = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      // 'Content-type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify(foodData),
  };

  fetch('https://fast-food-fast-12.herokuapp.com/api/v1/menu', fetchData)
    .then(res => res.json())
    .then(menuData => console.log(menuData))
    .catch(error => console.log(error));
};
document.getElementById('add-menu').addEventListener('submit', createMenu);
