const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const router = require('./routes');
const errorHandler = require('./middleware/error-handler.js');

const morgan = require('morgan');
app.use(morgan('tiny'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
