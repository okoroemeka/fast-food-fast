import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnection from '../../model/dbConfig/config';

class Users {
  /**
   * @return {object} signin
   * @param {*} req
   * @param {*} res
   */
  static signUp(req, res) {
    const {
      fullname, email, password,
    } = req.body;
    const getUserQuery = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    const createUserQuery = {
      text: 'INSERT INTO users(fullname,email,password) VALUES($1, $2, $3) RETURNING *',
      values: [fullname, email, bcrypt.hashSync(password, 10)],
    };
    dbConnection.query(getUserQuery)
      .then((users) => {
        if (users.rowCount !== 0) {
          return res.status(409).send({
            status: 'fail',
            message: 'user already exist',
          });
        }
        return dbConnection.query(createUserQuery)
          .then((newUser) => {
            const token = jwt.sign(
              {
                name: newUser.rows[0].fullname,
                userId: newUser.rows[0].id,
                email: newUser.rows[0].email,
                status: newUser.rows[0].status,
              },
              process.env.SECRET_KEY,
              {
                expiresIn: '480hr',
              },
            );
            return res.status(201).send({
              status: 'success',
              message: 'Signup successfully',
              data: {
                id: newUser.rows[0].id,
                fullName: newUser.rows[0].fullname,
                email: newUser.rows[0].email,
                telephone: newUser.rows[0].telephone,
              },
              token,
            });
          })
          .catch(() => res.status(500).json({
            status: 'Fail',
            message: 'Internal server error, please try again later',
          }));
      })
      .catch(() => res.status(500).send({
        status: 'Error',
        message: 'Internal server error, please try again later',
      }));
  }

  /**
 * @return {object} signIn
 * @param {*} req
 * @param {*} res
 */
  static signIn(req, res) {
    const getUserQuery = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email],
    };
    return dbConnection.query(getUserQuery)
      .then((user) => {
        if (user.rowCount === 0) {
          return res.status(400).json({
            status: 'Fail',
            message: 'User does not exist, please sign up to continue',
          });
        }
        if (bcrypt.compareSync(req.body.password, user.rows[0].password)) {
          const token = jwt.sign(
            {
              name: user.rows[0].fullname,
              userId: user.rows[0].id,
              email: user.rows[0].email,
              status: user.rows[0].status,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: '480hr',
            },
          );
          return res.status(200).json({
            status: 'Success',
            message: 'Welcome to fast-food-fast resturant',
            token,
          });
        }
        return res.status(400).json({
          status: 'Fail',
          message: 'Wrong email or password',
        });
      })
      .catch(() => res.status(500).json({
        status: 'Error',
        message: 'Internal server error, please try again later',
      }));
  }

  static updateUserStatus(req, res) {
    const { status } = req.body;
    const updateUserQuery = {
      text: 'UPDATE users SET status=$1 WHERE id=$2 RETURNING *',
      values: [status.trim(), parseInt(req.params.userId, 10)],
    };
    dbConnection.query(updateUserQuery)
      .then(data => res.status(200).json(data.rows[0]))
      .catch(err => res.status(500).json(err));
  }
}
export default Users;
