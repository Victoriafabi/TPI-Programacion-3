import React, { useState, useEffect } from "react";


const Products = () => {
 
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleRedeem = async (product) => {
    if (product.stock <= 0) {
      alert("Producto sin stock");
      return;
    }

    await fetch(`/api/products/redeem/${product.id}`, {
      method: "POST",
    });

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );

    setSelectedProductId(product.id);
  };

  return (
    <div className="products-page">
      <h3>Productos Disponibles</h3>
      <ProductsList
        products={products}
        onRedeem={handleRedeem}
        selectedId={selectedProductId}
      />
    </div>
  );
};

export default Products;
