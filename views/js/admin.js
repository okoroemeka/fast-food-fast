const createMenu = (e) => {
  e.preventDefault();
  const foodImage = document.querySelector("input[type='file']");
  const food = document.getElementById('item-name').value;
  const price = document.getElementById('item-price').value;
  const formData = new FormData();
  formData.append('food', food);
  formData.append('price', price);
  formData.append('foodImage', foodImage.files[0]);
  const fetchData = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'x-access-token': localStorage.getItem('token'),
    },
    body: formData,
  };

  fetch('https://fast-food-fast-12.herokuapp.com/api/v1/menu', fetchData)
    .then(res => res.json())
    .then(menuData => alert(menuData.message))
    .catch(error => alert(error));
};
document.getElementById('add-menu').addEventListener('submit', createMenu);
