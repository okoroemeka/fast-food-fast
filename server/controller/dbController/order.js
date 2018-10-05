import dbConnection from '../../model/dbConfig/config';
import validate from '../../utils/validation';

class Order {
  /**
     * @return {object} createOrder
     * @param {*} req
     * @param {*} res
     */
  static createOrder(req, res) {
    const {
      food, quantity, telephone,
    } = req.body;
    const address = `${req.body.street}, ${req.body.city}`;
    const getMenuQuery = {
      text: 'SELECT * FROM menus WHERE food=$1',
      values: [food.trim()],
    };
    dbConnection.query(getMenuQuery)
      .then((menu) => {
        if (menu.rowCount < 1) {
          return res.status(404).json({
            status: 'Fail',
            message: 'Sorry, this food has been removed from the menu',
          });
        }
        const { price } = menu.rows[0];
        const menuId = menu.rows[0].id;
        const createOrderQuery = {
          text: 'INSERT INTO orders(delivary_address,telephone,quantity,user_id,menu_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
          values: [address, telephone.trim(), parseInt(quantity.trim(), 10), req.decoded.user_id, menuId],
        };
        return dbConnection.query(createOrderQuery)
          .then(order => res.status(201).json({
            status: 'Success',
            message: 'Order placed successfully',
            order: {
              food: order.rows[0].food,
              address,
              quantity: order.rows[0].quantity,
              totalCost: order.rows[0].quantity * parseInt(price, 10),
            },
          }))
          .catch(err => res.status(500).json({
            status: 'Error',
            message: 'Internal server error, please try again later',
            id: req.decoded.user_id,
            menuId,
            err,
          }));
      })
      .catch(err => res.status(500).json({
        status: 'Error',
        message: 'Internal server error, please try again later',
        err,
      }));
  }

  /**
     * @return {object} getAllorders
     * @param {*} req
     * @param {*} res
     */
  static getAllOrder(req, res) {
    const getAllOrdersQuery = {
      text: `SELECT
        fullname, 
        delivary_address,
        telephone,
        quantity,
        food,
        price,
        order_status,
        orders.createdAt,
        orders.updatedAt
        FROM
        orders
        INNER JOIN
        menus ON menus.id = orders.menu_id
        INNER JOIN
        users ON users.id = orders.user_id`,
    };
    if (!validate.validate) {
      return res.status(403).json({
        status: 'Fail',
        message: 'You are not autthorized to perform this action',
      });
    }
    return dbConnection.query(getAllOrdersQuery)
      .then((orders) => {
        if (orders.rowCount !== 0) {
          return res.status(200).json({
            status: 'success',
            message: 'fetch orders was successful',
            orders: orders.rows,
          });
        }
        return res.status(404).json({
          status: 'Fail',
          mesage: 'No availabe order',
        });
      })
      .catch(() => res.status(500).json({
        status: 'Error',
        message: 'Internal server error, please try again later',
      }));
  }

  /**
 * @return {object} getSpecificOrder
 * @param {*} req
 * @param {*} res
 */
  static getSpecificOrder(req, res) {
    const { orderId } = req.params;
    // orderId = parseInt(orderId, 10);
    const getSpecificOrderQuery = {
      text: `SELECT
        fullname, 
        delivary_address,
        telephone,
        quantity,
        food,
        price,
        order_status,
        or_io.createdAt
        FROM
        orders or_io
        INNER JOIN
        menus ON menus.id = or_io.menu_id
        INNER JOIN
        users ON users.id = or_io.user_id WHERE or_io.id=$1`,
      values: [parseInt(orderId, 10)],
    };
    if (!validate.validateQueryParameter(orderId)) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Wrong query parameter, use integers please',
      });
    }
    if (validate.validate) {
      return dbConnection.query(getSpecificOrderQuery)
        .then((orders) => {
          if (orders.rowCount !== 0) {
            return res.status(200).json({
              status: 'Success',
              message: 'Fetch specific order was successful',
              order: orders.rows[0],
            });
          }
          return res.status(404).json({
            status: 'Fail',
            mesage: 'Order not found',
          });
        })
        .catch(err => res.status(500).json({
          status: 'Error',
          message: 'Internal server error, please try again later',
        }));
    }
    return res.status(403).json({
      status: 'Fail',
      message: 'You are not autthorized to perform this action',
    });
  }

  /**
   * @returns {object} updateOrderStatus
   * @param {*} req
   * @param {*} res
   */
  static updateOrderStatus(req, res) {
    const { orderId } = req.params;
    const { status } = req.body;
    const getSpecificOrderQuery = {
      text: 'SELECT * FROM orders WHERE id=$1',
      values: [parseInt(orderId, 10)],
    };
    const updateOrderQuery = {
      text: 'UPDATE orders SET order_status=$1 WHERE id=$2 RETURNING *',
      values: [status.trim(), parseInt(orderId, 10)],
    };
    if (!validate.validateQueryParameter(orderId)) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Wrong query parameter, use integers please',
      });
    }
    if (!validate.validate) {
      return res.status(403).json({
        status: 'Fail',
        message: 'You are not authorized to perform this action',
      });
    }
    if (status === 'Processing' || status === 'Cancelled' || status === 'Complete') {
      return dbConnection.query(getSpecificOrderQuery)
        .then((order) => {
          if (order.rowCount !== 0) {
            return dbConnection.query(updateOrderQuery)
              .then(upDatedOrder => res.status(200).json({
                status: 'Success',
                message: 'Order status updated successfully',
                order: upDatedOrder.rows[0],
              }))
              .catch(() => res.status(500).json({
                status: 'Error',
                message: 'Internal server error, please try again later',
              }));
          }
          return res.status(404).json({
            status: 'Fail',
            message: 'order does not exist',
          });
        })
        .catch(() => res.status(500).json({
          status: 'Error',
          message: 'Internal server error, please try again later',
        }));
    }
    return res.status(400).json({
      status: 'Fail',
      message: 'Status need to be either "Processing","Complete" or "Cancelled"',
    });
  }

  /**
 *  @returns {object} getOrderHistory
 * @param {*} req
 * @param {*} res
 */
  static getOrderHistory(req, res) {
    const { userId } = req.params;
    const getOrderHistoryQuery = {
      text: `SELECT
        z.quantity,
        food,
        price,
        z.order_status,
        z.createdAt
        FROM
        orders z
        INNER JOIN
        menus ON menus.id = z.menu_id
        WHERE z.user_id=$1`,
      values: [parseInt(userId, 10)],
    };
    if (!validate.validateQueryParameter(userId)) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Wrong query parameter, use integers please',
      });
    }
    return dbConnection.query(getOrderHistoryQuery)
      .then((orders) => {
        if (orders.rowCount === 0) {
          return res.status(404).json({
            status: 'Fail',
            message: 'User has no order history',
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'fetch order history successful',
          orders: orders.rows,
        });
      })
      .catch(err => res.status(500).json({
        status: 'Error',
        message: 'Internal server error',
        err,
      }));
  }
}
export default Order;
