import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import dbConnection from '../../model/dbConfig/config';

class Users {
  static signUp(req, res) {
    const {
      fullname, email, telephone, password, imgUrl,
    } = req.body;
    const getUserQuery = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    const createUserQuery = {
      text: 'INSERT INTO users(fullname,email,telephone,password) VALUES($1, $2, $3, $4) RETURNING *',
      values: [fullname, email, telephone,
        bcrypt.hashSync(password, 10)],
    };

    dbConnection.query(getUserQuery)
      .then((users) => {
        if (users.rowCount !== 0) {
          return res.status(409).send({
            status: 'fail',
            message: 'user alredy exist',
          });
        }
        return dbConnection.query(createUserQuery)
          .then(newUser => res.status(201).send({
            status: 'success',
            message: 'Signup successfully, please proceed to login',
            data: {
              full_name: newUser.rows[0].fullname,
              email: newUser.rows[0].email,
              telephone: newUser.rows[0].telephone,
              // Address: `${newUser.rows[0].house_no} ${newUser.rows[0].street}`,
            },
          }))
          .catch(error => res.status(500).send(error));
      })
      .catch(err => res.status(500).send({
        status: 'error',
        message: 'Internal server error, please try agin later',
      }));
  }

//   /**
//  * @return {object} signIn
//  * @param {*} req
//  * @param {*} res
//  */
//   static signIn(req, res) {
//     const getUserQuery = {
//       text: 'SELECT * FROM users WHERE email = $1',
//       values: [req.body.email.trim()],
//     };
//     if ((req.body.email !== undefined && req.body.email.trim().length !== 0)
//         && (req.body.password !== undefined && req.body.password.trim().length !== 0)) {
//       return dbConnection.query(getUserQuery)
//         .then((user) => {
//           if (user.rowCount === 0) {
//             return res.status(400).json({
//               status: 'fail',
//               message: 'User does not exist, please sign up to continue',
//             });
//           }
//           if (bcrypt.compareSync(req.body.password, user.rows[0].password)) {
//             const token = jwt.sign(
//               {
//                 user_id: user.rows[0].id,
//                 fullname: user.rows[0].fullname,
//                 email: user.rows[0].email,
//                 // address: `${user.rows[0].house_no} ${user.rows[0].street}`,
//               },
//               process.env.SECRET_KEY,
//               {
//                 expiresIn: '24hr',
//               },
//             );
//             return res.status(200).json({
//               status: 'success',
//               message: 'welcome to fast-food-fast resturant',
//               token,
//             });
//           }
//           return res.status(400).json({
//             status: 'fail',
//             message: 'Wrong email or password',
//             data: user.rows[0].password,
//             pass: req.body.password.trim(),
//             password: bcrypt.compareSync(user.rows[0].password, req.body.password.trim()),
//           });
//         })
//         .catch(error => res.status(500).json({
//           status: 'error',
//           message: 'Internal server error, please try again later',
//         }));
//     }
//     return res.status(400).json({
//       status: 'fail',
//       message: 'All feilds are required',
//     });
//   }
}
export default Users;
