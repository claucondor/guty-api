import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';

const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:8080',
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

function createRouter(): Express {
  return express();
}

function setExpressMiddlewares(router: express.Router) {
  router.use(cors(options));
  router.use(bodyParser.json());
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin'
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      return res.status(200).json({});
    }
    next();
  });
  router.use(express.json());
}

export { createRouter, setExpressMiddlewares };
