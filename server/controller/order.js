import seed from '../seed/dummydb';
class Order{
    static getAllOrder(req, res){
        if (seed.length > 0) {
            return res.status(200).json({
                status: 'success',
                data: seed,
            })
        }
        return res.status(404).json({
            status: 'fail',
            message: 'No orders available'
        })
    }
}
export default Order;