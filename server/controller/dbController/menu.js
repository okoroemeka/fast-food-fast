import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import dbConnection from '../../model/dbConfig/config';
import validateUserType from '../../utils/validation';

dotenv.config();

class Menu {
  /**
 * @return {object} createMenuItem
 * @param {*} req
 * @param {*} res
 */
  static createMenuItem(req, res) {
    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
    });
    const { food, price } = req.body;
    const getMenuQuery = {
      text: 'SELECT * FROM menus WHERE food=$1',
      values: [food],
    };
    dbConnection.query(getMenuQuery)
      .then((menu) => {
        if (menu.rowCount !== 0) {
          return res.status(409).json({
            status: 'Fail',
            message: 'Food is already on the menu',
          });
        }
        if (validateUserType.validate) {
          return cloudinary.v2.uploader.upload(req.file.path, { use_filename: true })
            .then((result) => {
              const foodImage = result.url;
              const createItemQuery = {
                text: 'INSERT INTO menus(food,price,food_image) VALUES($1, $2, $3) RETURNING *',
                values: [food, parseInt(price, 10), foodImage],
              };
              dbConnection.query(createItemQuery)
                .then(menuItem => res.status(201).json({
                  status: 'Success',
                  message: 'Menu item created successfully',
                  menu: menuItem.rows[0],
                }))
                .catch(() => res.status(500).json({
                  status: 'Error',
                  message: 'Internal server error, please try again later',
                }));
            })
            .catch(() => res.status(500).json({
              status: 'Error',
              message: 'Image upload was not succesfull, due to server error, please try again'
            }));
        }
        return res.status(403).json({
          status: 'Fail',
          message: 'You are not authorised to perform this action',
        });
      })
      .catch(err => res.status(500).json({
        status: 'Error',
        message: 'Internal server error, please try again later',
      }));
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
            menu: menu.rows,
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

  /**
   * @return {object} deleteMenuItem
   * @param {*} req
   * @param {*} res
   */
  static deleteMenuItem(req, res) {
    const { menuId } = req.params;
    const deleteQuery = {
      text: 'DELETE FROM menus WHERE id=$1',
      values: [parseInt(menuId, 10)],
    };
    const selectQuery = {
      text: 'SELECT * FROM menus WHERE id=$1',
      values: [parseInt(menuId, 10)],
    };
    if (!validateUserType.validate) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to perform this action',
      });
    }
    return dbConnection.query(selectQuery)
      .then((data) => {
        if (data.rowCount !== 1) {
          return res.status(404).json({
            status: 'The menu Item you want to delete does not exist',
          });
        }
        return dbConnection.query(deleteQuery)
          .then(deletedData => res.status(200).json({
            status: 'success',
            message: 'Menu item deleted successfully',
          }))
          .catch(() => res.status(500).json({
            status: 'error',
            message: 'Internal server error, please try again later',
          }));
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error, please try again later',
      }));
  }
}
export default Menu;
