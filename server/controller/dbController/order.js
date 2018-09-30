import dbConnection from '../../model/dbConfig/config';

class Order {
  /**
     * @return {object} createOrder
     * @param {*} req
     * @param {*} res
     */
  static createOrder(req, res) {
    const {
      food, quantity, telephone, price,
    } = req.body;
    const address = `${req.body.street}, ${req.body.city}`;
    const getMenuQuery = {
      text: 'SELECT * FROM menus WHERE food=$1',
      values: [food.trim()],
    };
    const createOrderQuery = {
      text: 'INSERT INTO orders(customer_name,food,delivary_address,telephone,quantity,user_id) VALUES($1, $2, $3, $4, $5,$6) RETURNING *',
      values: [req.decoded.name, food.trim(), address,
        telephone.trim(),
        parseInt(quantity.trim(), 10), req.decoded.user_id],
    };
    dbConnection.query(getMenuQuery)
      .then((menu) => {
        if (menu.rowCount < 1) {
          return res.status(404).json({
            status: 'fail',
            message: 'Sorry, this food has been removed from the menu',
          });
        }
        return dbConnection.query(createOrderQuery)
          .then(order => res.status(201).json({
            status: 'success',
            message: 'Order placed successfully',
            data: {
              food: order.rows[0].food,
              address,
              quantity: order.rows[0].quantity,
              totalCost: order.rows[0].quantity * parseInt(price, 10),
            },
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

  /**
     * @return {object} createOrder
     * @param {*} req
     * @param {*} res
     */
  static getAllOrder(req, res) {
    const getAllOrdersQuery = {
      text: 'SELECT * FROM orders',
    };
    if (req.decoded.status !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not autthorized to perform this action',
      });
    }
    return dbConnection.query(getAllOrdersQuery)
      .then((orders) => {
        if (orders.rowCount !== 0) {
          return res.status(200).json({
            status: 'success',
            data: orders.rows,
          });
        }
        return res.status(404).json({
          status: 'fail',
          mesage: 'No available order',
        });
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error, please try again later',
      }));
  }
}
export default Order;
