
import ProductItem from "../productsItem/ProductsItem";
import "../Products.css";

const ProductsList = ({ products, onRedeem, selectedId }) => {
  if (products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onRedeem={onRedeem}
          isSelected={selectedId === product.id}
        />
      ))}
    </div>
  );
};

export default ProductsList;
