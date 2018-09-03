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
}
export default Order;
