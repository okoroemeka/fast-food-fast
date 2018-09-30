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
     * @return {object} getAllorders
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
          mesage: 'order not found',
        });
      })
      .catch(() => res.status(500).json({
        status: 'error',
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
      text: 'SELECT * FROM orders WHERE id=$1',
      values: [parseInt(orderId, 10)],
    };
    if (req.decoded.status !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not autthorized to perform this action',
      });
    }
    return dbConnection.query(getSpecificOrderQuery)
      .then((order) => {
        if (order.rowCount !== 0) {
          return res.status(200).json({
            status: 'success',
            data: order.rows[0],
          });
        }
        return res.status(404).json({
          status: 'fail',
          message: 'Order not found',
        });
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error, please try again later',
      }));
  }
  // /**
  //  * @returns {object} updateOrderStatus
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // static updateOrderStatus(req, res) {
  //   const { orderId } = req.params;
  //   const { status } = req.body;
  //   const getSpecificOrderQuery = {
  //     text: 'SELECT * FROM orders WHERE id=$1',
  //     values: [parseInt(orderId, 10)],
  //   };
  //   const updateOrderQuery = {
  //     text: 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
  //     values: [status.trim(), parseInt(orderId, 10)],
  //   };
  //   if (status !== undefined && status.trim().length !== 0) {
  //     if (status === 'accept' || status === 'decline') {
  //       return dbConnection.query(getSpecificOrderQuery)
  //         .then((order) => {
  //           if (order.rowCount !== 0) {
  //             return dbConnection.query(updateOrderQuery)
  //               .then(upDatedOrder => res.status(200).json({
  //                 status: 'success',
  //                 message: 'Order status updated successfully',
  //                 data: upDatedOrder.rows[0],
  //               }))
  //               .catch(() => res.status(500).json({
  //                 status: 'error',
  //                 message: 'Internal server error, please try again later',
  //               }));
  //           }
  //           return res.status(404).json({
  //             status: 'fail',
  //             message: 'order does not exist',
  //           });
  //         })
  //         .catch(() => res.status(500).json({
  //           status: 'error',
  //           message: 'Internal server error, please try again later',
  //         }));
  //     }
  //     return res.status(400).json({
  //       status: 'fail',
  //       message: 'Status need to be either "accept" or "decline"',
  //     });
  //   }
  //   return res.status(400).json({
  //     status: 'fail',
  //     message: 'Field can not be empty',
  //   });
  // }
}
export default Order;
