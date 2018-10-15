const createUser = (e) => {
  e.preventDefault();
  const fullname = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  const data = {
    fullname,
    email,
    password,
    confirmPassword,
  };
  const fetchData = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch('https://fast-food-fast-12.herokuapp.com/api/v1/auth/signup', fetchData)
    .then(user => user.json())
    .then(userData => console.log(userData))
    .catch(error => console.log(error));
};
document.getElementById('add-user').addEventListener('submit', createUser);
