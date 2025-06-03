import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductsTable from "../productsTable/ProductsTable";
import ProductSearch from "./productSearch/ProductSearch";
import { useAuth } from "../../../hooks/useAuth";
import { isTokenValid } from "../../utils/validation"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token || !isTokenValid(token)) {
        console.log("Token no válido o expirado al cargar productos.");
        await logout();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.error("Token expirado o inválido (respuesta API al cargar productos). Cerrando sesión.");
            await logout();
            navigate("/login");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        toast.error("Hubo un error al cargar los productos.");
      }
    };

    fetchProducts();
  }, [navigate, logout]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    if (query) {
      const filtered = products.filter((product) =>
        product.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/ModifyProduct/${productId}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token || !isTokenValid(token)) {
      console.log("Token no válido o expirado al intentar eliminar producto.");
      await logout();
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error("Token expirado o inválido (respuesta API al eliminar). Cerrando sesión.");
          await logout();
          navigate("/login");
          return;
        }
        toast.error("No se pudo eliminar el producto.");
        return;
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));
      setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Producto eliminado con éxito");
    } catch (error) {
      console.error("Hubo un error al eliminar el producto:", error);
      toast.error("Hubo un problema al eliminar el producto.");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredProducts(products);
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <ProductSearch onSearch={handleSearch} searchTerm={searchTerm} />
        <button onClick={handleClearSearch}>Limpiar búsqueda</button>
      </div>
      <ProductsTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default AdminProducts;