// import menuDummyDb from '../seed/menuDummy';

// class Menu {
//   /**
//      * @returns {object} createMenuItem
//      * @param {*} req
//      * @param {*} res
//   */
//   static createMenuItem(req, res) {
//     const { food, price, itemImage } = req.body;
//     const item = {
//       menuItem_id: menuDummyDb.length + 1,
//       food,
//       price,
//       itemImage,
//     };

//     // Validating food,price, and itemImage fields
//     if ((food !== undefined && food.trim().length !== 0)
//         && (price !== undefined && price.trim().length !== 0)
//         && (itemImage !== undefined && itemImage.trim().length !== 0)) {
//       menuDummyDb.push(item);
//       return res.status(201).json({
//         status: 'success',
//         message: 'Item created successfully',
//         data: item,
//       });
//     }
//     return res.status(400).json({
//       status: 'fail',
//       message: 'All field are required',
//     });
//   }

//   // updat menu item
//   /**
//    * @returns {object} updateMenuItem
//    * @param {*} req
//    * @param {*} res
//    */
//   static upadeMenuItem(req, res) {
//     const { itemId } = req.params;
//     const { food, price, itemImage } = req.body;

//     // checking if all feilds are not empty
//     if ((food !== undefined && food.trim().length !== 0)
//     && (price !== undefined && price.trim().length !== 0)
//     && (itemImage !== undefined && itemImage.trim().length)) {

//       // checking if item exits
//       const menuItem = menuDummyDb.find(item => parseInt(item.menuItem_id, 10) === parseInt(itemId, 10));
//       if (menuItem) {
//         menuDummyDb[itemId - 1] = Object.assign(menuItem, req.body);
//         return res.status(200).json({
//           status: 'success',
//           message: 'menu item updated successfully',
//           data: menuDummyDb[itemId - 1],
//         });
//       }
//       return res.status(404).json({
//         status: 'fail',
//         message: 'unable to update item, item not found',
//       });
//     }
//     return res.status(400).json({
//       status: 'fail',
//       message: 'All field are required',
//     });
//   }

//   static deleteMenuItem(req, res) {
//     const { itemId } = req.params;
//     const menuItem = menuDummyDb.find(item => parseInt(itemId, 10) === parseInt(item.menuItem_id, 10));
//     if (menuItem) {
//       menuDummyDb.splice((parseInt(itemId, 10) - 1), 1);
//       return res.status(204).json();
//     }
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Unable to delete item, item not found',
//     });
//   }
// }
// export default Menu;
