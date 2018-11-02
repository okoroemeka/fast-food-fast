/**
 * @param {*} alertText
 */
const menuAlertMessage = (alertText) => {
  const alertBox = document.getElementById('alert-box');
  document.getElementById('message').innerText = `${alertText}`;
  alertBox.style.display = 'block';
};

/**
 * @return {*} createMenu
 * @param {*} e
 */
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
  fetch('api/v1/menu', fetchData)
    .then(res => res.json())
    .then(menuData => menuAlertMessage(menuData.message))
    .catch(error => menuAlertMessage(error));
};
document.getElementById('add-menu').addEventListener('submit', createMenu);

// Get available Menu
const getMenu = () => {
  fetch('api/v1/menu')
    .then(res => res.json())
    .then((allMenu) => {
      const table = document.getElementById('menu-item');
      if (allMenu.status === 'success') {
        let outPut = `<tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Action</th>
                     </tr>`;
        allMenu.menu.forEach((menuItem) => {
          outPut += `<tr>
                      <td>${menuItem.food}</td>
                      <td>&#8358;${menuItem.price}</td>
                      <td>
                          <button class="edit-item" id="E-${menuItem.id}">Edit</button>
                          <button class="delete-item" id="D-${menuItem.id}">Delete</button>
                      </td>
                    </tr>`;
        });
        table.innerHTML = outPut;

        /* Consume  Delete menu item API */
        const deleteButtons = document.querySelectorAll('.delete-item');
        deleteButtons.forEach((deleteButton) => {
          deleteButton.addEventListener('click', () => {
            const menuId = parseInt(deleteButton.id.split('-')[1], 10);
            fetch(`api/v1/menu/${menuId}`, {
              method: 'DELETE',
              headers: {
                'x-access-token': localStorage.getItem('token'),
              },
            })
              .then(res => res.json())
              .then((menu) => {
                menuAlertMessage(menu.message);
              })
              .catch((error) => {
                menuAlertMessage(error);
              });
          });
        });

        /** Consume Edit menu */
        const editButtons = document.querySelectorAll('.edit-item');
        editButtons.forEach((editButton) => {
          editButton.addEventListener('click', () => {
            const editId = parseInt(editButton.id.split('-')[1], 10);
            const editModal = document.getElementById('myModal');
            document.getElementById('form-header').innerText = 'Edit Menu';
            
            const addButton = document.getElementById('action-button');
            addButton.innerText = 'Update';
            addButton.addEventListener('click', () => {
              const foodImage = document.querySelector("input[type='file']");
              const food = document.getElementById('item-name').value;
              const price = document.getElementById('item-price').value;
              const formData = new FormData();
              formData.append('food', food);
              formData.append('price', price);
              formData.append('foodImage', foodImage.files[0]);
              const editData = {
                method: 'PUT',
                headers: {
                  Accept: 'application/json, text/plain, */*',
                  'x-access-token': localStorage.getItem('token'),
                },
                body: formData,
              };
              fetch(`api/v1/menu/${editId}`, editData)
                .then(res => res.json())
                .then(editInfo => menuAlertMessage(editInfo.message))
                .catch(err => menuAlertMessage(err));
            });
            // console.log(editId);
            editModal.style.display = 'block';
            closeSpan.onclick = () => {
              editModal.style.display = 'none';
            };
          });
        });
      } else {
        menuAlertMessage(allMenu.message);
      }
    })
    .catch(err => menuAlertMessage(err));
};
document.getElementById('add-menu-button').addEventListener('click', getMenu);
