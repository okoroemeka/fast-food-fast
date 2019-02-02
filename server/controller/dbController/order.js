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
      telephone, product,
    } = req.body;
    const address = `${req.body.street}, ${req.body.city}`;
    let total = 0;
    product.forEach((item) => {
      total += parseInt(item.price, 10) * parseInt(item.quantity, 10);
    });
    const createOrderQuery = {
      text: 'INSERT INTO orders(delivary_address, telephone, product, total, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [address, telephone, product, total, req.decoded.userId],
    };
    dbConnection.query(createOrderQuery)
      .then(data => res.status(200).json({
        status: 'Success',
        message: 'Order placed successfully',
        order: data.rows,
      }))
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
        orders.id,
        fullname, 
        delivary_address,
        telephone,
        product,
        total,
        order_status,
        orders.createdAt,
        orders.updatedAt
        FROM
        orders
        INNER JOIN
        users ON users.id = orders.user_id`,
    };
    if (req.decoded.status !== 'admin') {
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
            message: 'Fetch orders was successful',
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
    const getSpecificOrderQuery = {
      text: `SELECT
        fullname, 
        delivary_address,
        telephone,
        product,
        total,
        order_status,
        or_io.createdAt
        FROM
        orders or_io
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
    if (req.decoded.status === 'admin') {
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
        .catch(() => res.status(500).json({
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
    if (req.decoded.status !== 'admin') {
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
    const getOrderHistoryQuery = {
      text: `SELECT
        z.id,
        product,
        total,
        z.order_status,
        z.createdAt
        FROM
        orders z
        WHERE z.user_id=$1`,
      values: [parseInt(req.decoded.userId, 10)],
    };
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
          message: 'Fetch order history successful',
          orders: orders.rows,
        });
      })
      .catch(err => res.status(500).json({
        status: 'Error',
        message: 'Internal server error',
        err,
      }));
  }

  /**
 *  @returns {object} deleteOrderHistory
 * @param {*} req
 * @param {*} res
 */
  static deleteOrder(req, res) {
    const userId = parseInt(req.decoded.userId, 10);
    const { orderId } = req.params;
    const getSpecificOrderQuery = {
      text: 'SELECT * FROM orders WHERE id=$1',
      values: [parseInt(orderId, 10)],
    };
    const deleteOrderquery = {
      text: 'DELETE FROM orders z WHERE z.id=$1 AND z.user_id=$2',
      values: [parseInt(orderId, 10), userId],
    };
    return dbConnection.query(getSpecificOrderQuery)
      .then((order) => {
        if (order.rowCount === 0) {
          return res.status(404).json({
            status: 'Fail',
            message: 'The order you want to delete does not exist',
          });
        }
        return dbConnection.query(deleteOrderquery)
          .then(() => res.status(200).json({
            status: 'success',
            message: 'Order deleted successfully',
          }))
          .catch(error => res.status(500).json({
            status: 'error',
            message: error.message,
          }));
      })
      .catch(error => res.status(500).json({
        status: 'error',
        message: error.message,
      }))
  }
}
export default Order;
