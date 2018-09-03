import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './routes/route';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;

// making use of middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.set('port', port);

app.use('/api/v1', router);
app.get('/', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to fast-food-fast resturant',
}));
app.all('*', (req, res) => res.status(404).json({
  status: 'fail',
  message: 'Not found',
}));

app.listen(port, () => console.log(`listening on ${port}`));
export default app;
