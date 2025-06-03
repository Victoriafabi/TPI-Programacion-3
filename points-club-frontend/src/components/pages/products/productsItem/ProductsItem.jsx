import React from "react";
import "../Products.css";


const ProductItem = ({ product, onRedeem }) => { 
  return (
    <div className="product-card">
      <img src={product.imagen} alt={product.nombre} />
      <h2>{product.nombre}</h2>
      <p>{product.descripcion}</p>
      <p>Puntos: {product.puntosRequeridos}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={() => onRedeem(product)} disabled={product.stock <= 0}>
        Canjear
      </button>
    </div>
  );
};

export default ProductItem;