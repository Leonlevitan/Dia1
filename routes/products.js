const express = require('express');
const router = express.Router();
const { LocalStorage } = require('node-localstorage');

// Configuración de LocalStorage
const localStorageDir = './.localstorage'; // Directorio donde se almacenará el local storage
const localStorage = new LocalStorage(localStorageDir); // Crear instancia de LocalStorage

let products = JSON.parse(localStorage.getItem('products')) || [];
let productId = parseInt(localStorage.getItem('productId')) || 0;

// Listar todos los productos
router.get('/', (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Agregar un producto nuevo
router.post('/', async (req, res) => {
  try {
    const product = {
      id: ++productId,
      name: req.body.name,
      model: req.body.model,
      price: req.body.price
    };
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('productId', productId.toString());
    res.status(200).send('Product added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Modificar un producto existente
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex >= 0) {
      const product = {
        id: id,
        name: req.body.name,
        model: req.body.model,
        price: req.body.price
      };
      products[productIndex] = product;
      localStorage.setItem('products', JSON.stringify(products));
      res.status(200).send('Product updated successfully');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Eliminar un producto existente
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    res.status(200).send('Product deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;