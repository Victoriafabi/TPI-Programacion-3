import { Product } from "../models/Product.js";


//Listar
export const getProducts = async (req, res) => {
    try{
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.messege});
    }
};

//Obtener por ID
export const getProductById = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Crear producto
export const createProduct = async (req, res) => {
    try {
      const { nombre, descripcion, puntosRequeridos, imagen, stock } = req.body;
      const prod = await Product.create({
        nombre, descripcion, puntosRequeridos, imagen, stock
      });
      res.status(201).json(prod);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // Actualizar producto
export const updateProduct = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  
      // Actualizamos el producto con los datos 
      const { nombre, descripcion, puntosRequeridos, imagen, stock } = req.body;
      await product.update({ nombre, descripcion, puntosRequeridos, imagen, stock });
      
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // Eliminar producto
export const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  
      await product.destroy();
      res.json({ message: "Producto eliminado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  