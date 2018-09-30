import dbConnection from '../../model/dbConfig/config';

class Menu {
  /**
 * @return {object} createMenuItem
 * @param {*} req
 * @param {*} res
 */
  static createMenuItem(req, res) {
    const { food, price, foodImage } = req.body;
    const createItemQuery = {
      text: 'INSERT INTO menus(food,price,food_image) VALUES($1, $2, $3) RETURNING *',
      values: [food, parseInt(price, 10), foodImage],
    };
    if (req.decoded.status === 'admin') {
      return dbConnection.query(createItemQuery)
        .then(menuItem => res.status(200).json({
          status: 'success',
          message: 'menu item created successfully',
          data: menuItem.rows[0],
        }))
        .catch(err => res.status(500).json({
          status: 'error',
          message: 'Internal server error, please try again later',
        }));
    }
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorised to perform this action',
    });
  }

  static getMenu(req, res) {
    const getMenuQuery = {
      text: 'SELECT * FROM menus',
    };
    dbConnection.query(getMenuQuery)
      .then((menu) => {
        if (menu.rowCount > 0) {
          return res.status(200).json({
            status: 'success',
            data: menu.rows,
          });
        }
        return res.status(404).json({
          status: 'fail',
          message: 'No food in the menu',
        });
      })
      .catch(err => res.status(500).json({
        status: 'error',
        message: 'Internal server error, please try again later',
      }));
  }
}
export default Menu;
