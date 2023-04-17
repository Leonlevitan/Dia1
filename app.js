const express = require('express');
const productsRouter = require('./routes/products');
const app = express();
const morgan = require("morgan");


// Middleware
app.use(express.json());
app.use(morgan("dev"));
// Rutas
app.use('/products', productsRouter);

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
