/**
 * @param {*} alertText
 */
const alertMessage = (alertText) => {
  const alertBox = document.getElementById('alert-box');
  document.getElementById('message').innerText = `${alertText}`;
  alertBox.style.display = 'block';
};

/**
 * @param {*} e
 */
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

  fetch('api/v1/auth/signin', fetchData)
    .then(user => user.json())
    .then((userData) => {
      if (userData.status === 'Success') {
        localStorage.setItem('token', userData.token);
        if (userData.userStatus === 'admin') {
          window.location = 'admin.html';
        } else {
          window.location = 'menu.html';
        }
      } else if (userData.status === 'Fail') {
        document.getElementById('response').innerHTML = `<h4 style="font-weight: lighter; color:#fff; font-size:1rem;"> ${userData.message} </h4>`;
      } else {
        alertMessage(userData.message);
      }
    })
    .catch((error) => {
      // document.querySelector('html').innerHTML = '<h3 style="font-weight: lighter; color:black;"> Internal server error, please try again </h3>';
      alertMessage(error);
    });
};
document.getElementById('login-user').addEventListener('submit', userLogin);
