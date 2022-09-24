const express = require('express');
require("./src/config/db");
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const AuthMiddleWare = require("./src/middlewares/auth.middleware")
const auth = new AuthMiddleWare();

//const morgan = require('morgan');

// require('dotenv').config({ path: './enviornment/.env.local' });

const PORT = process.env.PORT || 7000;

// Dev loggin

// if (process.env.NODE_ENV === 'local') {
//   app.use(morgan('dev'));
// }

const authenticationRoute = require('./src/routes/authentication.route');
const fleetRoute = require('./src/routes/fleet.route');


app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Hello World !');
});

app.use('/login',
 authenticationRoute);



app.use('/fleets', auth.verifyToken, fleetRoute);


if (process.env.ENVIRONMENT === "lambda") {
  module.exports.handler = serverless(app);
} else {

  const server = app.listen(PORT, () => {
    console.log(
      `node-express server running in ${process.env.NODE_ENV} mode on ${PORT}`
    );
  })

  process.on("unhandledRejection", (err, proimse) => {
    console.log(`Error, ${err.message}`);

    
    server.close(() => process.exit(1));
  })
}


