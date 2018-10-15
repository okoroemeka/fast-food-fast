import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import errorhandler from 'errorhandler';
import cors from 'cors';
// import swaggerUi from 'swagger-ui-express';
import router from './routes/route';
// const swaggerDocument = require'../docs/swagger.json';

const app = express();
const port = parseInt(process.env.PORT, 10) || 5080;

// making use of middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorhandler());
app.use(logger('dev'));
app.use(express.static('./views'));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.set('port', port);

app.all('*', (req, res) => res.status(404).json({
  status: 'fail',
  message: 'Not found, try api/v1/orders or api/v1/orders/<orderId>',
}));
app.listen(port, () => console.log(`listening on port ${port}`));
export default app;
