const userLogin = (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = {
    email,
    password,
  };
  const fetchData = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch('https://fast-food-fast-12.herokuapp.com/api/v1/auth/signin', fetchData)
    .then(user => user.json())
    .then((userData) => {
      if (userData.status === 'Success') {
        localStorage.setItem('token', userData.token);
        window.location = 'https://fast-food-fast-12.herokuapp.com/menu.html';
      } else if (userData.status === 'Fail') {
        document.getElementById('response').innerHTML = `<h4 style="font-weight: lighter; color:#fff; font-size:1rem;"> ${userData.message} </h4>`;
      } else {
        alert(userData.message);
      }
    })
    .catch((error) => {
      document.querySelector('html').innerHTML = '<h3 style="font-weight: lighter; color:black;"> Internal server error, please try again </h3>';
    });
};
document.getElementById('login-user').addEventListener('submit', userLogin);
