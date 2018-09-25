import seed from '../seed/dummydb';

class Order {
  /**
   *@return {array} getAllOrder
   * @param {*} req
   * @param {*} res
   */
  static getAllOrder(req, res) {
    if (seed.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: seed,
      });
    }
    return res.status(404).json({
      status: 'fail',
      message: 'No orders available',
    });
  }

  /**
 * @return {object} getSpecificOrder
 * @param {*} req
 * @param {*} res
 */
  static getSpecificOrder(req, res) {
    const { orderId } = req.params;
    const order = seed.find(iterator => (parseInt(iterator.order_id, 10) === parseInt(orderId, 10)));
    if (order) {
      return res.status(200).json({
        status: 'success',
        data: order,
      });
    }
    return res.status(404).json({
      status: 'fail',
      message: 'No order found',
    });
  }

  /**
   * @return {object} createOrder
   * @param {*} req
   * @param {*} res
   */
  static createOrder(req, res) {
    const {
      food, fullName, address, telephone,
    } = req.body;
    const price = parseInt(req.body.price, 10);
    const quantity = parseInt(req.body.quantity, 10);
    const order = {
      fullName,
      address,
      telephone,
      order_id: (seed.length + 1),
      food,
      price,
      quantity,
      status: 'Pending',
    };
    if ((food !== undefined && food.trim().length !== 0)
      && (price !== undefined && req.body.price.trim().length !== 0)
      && (fullName !== undefined && fullName.trim().length !== 0)
      && (address !== undefined && address.trim().length !== 0)
      && (telephone !== undefined && telephone.trim().length !== 0)
      && (quantity !== undefined && req.body.quantity.trim().length !== 0)) {
      seed.push(order);
      return res.status(201).json({
        status: 'success',
        message: `your order for ${food} was placed successfully`,
        data: {
          fullName,
          address,
          telephone,
          order_id: order.order_id,
          food,
          price,
          quantity,
          total: price * quantity,
        },
      });
    }
    return res.status(400).json({
      status: 'fail',
      message: 'All feilds are required',
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
    const order = seed.find(iterator => parseInt(iterator.order_id, 10) === parseInt(orderId, 10));
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'Order not found',
      });
    }
    if (status !== undefined && status.trim().length !== 0) {
      if (status === 'accept' || status === 'decline') {
        seed[orderId - 1] = Object.assign(seed[orderId - 1], req.body);
        // seed[orderId - 1].status = status;
        return res.status(200).json({
          status: 'success',
          message: 'Order status updated successfully',
          data: seed[orderId - 1],
        });
      }
      return res.status(400).json({
        status: 'fail',
        message: 'Status need to be either "accept" or "decline"',
      });
    }
    return res.status(400).json({
      status: 'fail',
      message: 'All feilds are required',
    });
  }
}
export default Order;
