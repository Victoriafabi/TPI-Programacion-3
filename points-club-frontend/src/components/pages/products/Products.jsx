import  { useState, useEffect } from "react";
import ProductsList from "./productsList/ProductsList";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId] = useState(null); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("http://localhost:3000/api/products", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`Error al obtener productos (${res.status}): ${res.statusText}`);
                }

                const data = await res.json();
                setProducts(data);
            } catch (err) {
                toast.error("Error fetching products: " + err.message);
                setError("Error al cargar productos. Por favor, intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        if (token) {  
            fetchProducts();
        } else {
            setProducts([]); 
        }
    }, [token]);

    const handleRedeem = async (product) => {
        if (!user) {
            setError("Debes estar logueado para canjear productos.");
            return;
        }

        if (product.stock <= 0) {
            setError("Producto sin stock.");
            return;
        }

        setLoading(true);
        setError(null);

        setProducts(prev =>
            prev.map(p =>
                p.id === product.id ? { ...p, stock: p.stock - 1 } : p
            )
        );

        try {
            const response = await fetch("http://localhost:3000/api/records", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: user.id,
                    productId: product.id
                })
            });

            if (!response.ok) {
                setProducts(prev =>
                    prev.map(p =>
                        p.id === product.id ? { ...p, stock: p.stock + 1 } : p
                    )
                );
                const errorData = await response.json();
                throw new Error(`Error al canjear (${response.status}): ${errorData.error || response.statusText}`);
            }

            const data = await response.json();
            toast.success(data.message);

        } catch (err) {
            console.error("Error al canjear producto:", err);
            toast.error(err.message || "Error al canjear. Por favor, intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="products-page">
            <h3>Productos Disponibles</h3>
            {error && <p className="error-message">{error}</p>}
            {loading && <p>Cargando...</p>}
            <ProductsList
                products={products}
                onRedeem={handleRedeem}
                selectedId={selectedProductId}
            />
        </div>
    );
};

export default Products;
