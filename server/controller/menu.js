import menuDummyDb from '../seed/menuDummy';

class Menu {
  /**
     * @returns {object} createMenuItem
     * @param {*} req
     * @param {*} res
  */
  static createMenuItem(req, res) {
    const { food, price, itemImage } = req.body;
    const item = {
      menuItem_id: menuDummyDb.length + 1,
      food,
      price,
      itemImage,
    };

    // Validating food,price, and itemImage fields
    if ((food !== undefined && food.trim().length !== 0)
        && (price !== undefined && price.trim().length !== 0)
        && (itemImage !== undefined && itemImage.trim().length !== 0)) {
      menuDummyDb.push(item);
      return res.status(201).json({
        status: 'success',
        message: 'Item created successfully',
        data: item,
      });
    }
    return res.status(400).json({
      status: 'fail',
      message: 'All field are required',
    });
  }
}
export default Menu;
