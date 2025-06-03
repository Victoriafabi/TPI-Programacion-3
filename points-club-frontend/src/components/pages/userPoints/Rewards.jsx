import  {  useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import QRCode from "react-qr-code";

const Rewards = () => {
    const { token, user } = useAuth();
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (!user || !token) {
            setLoading(false); 
            return;
        }

        const fetchHistory = async () => {
            setLoading(true); 
            setError(null);   
            try {
                const res = await fetch(
                    `http://localhost:3000/api/records/user/${user.id}`, 
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (!res.ok) {
                    const errorData = await res.json(); 
                    throw new Error(errorData.message || `Error al cargar historial (${res.status}): ${res.statusText}`);
                }
                const data = await res.json();
                setHistory(data);
            } catch (err) {
                console.error("Error al obtener historial:", err);
                setError(err.message || "Error al cargar el historial de canjes.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user, token]);

    return (
        <div>
            <h5>Historial de premios canjeados</h5>
            {loading && <p>Cargando historial...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && history.length === 0 && <p>No has canjeado premios aún.</p>}

            <div className="row">
                {!loading && !error && history.map((item) => (
                    <div key={item.id} className="col-12 col-md-6 mb-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title">{item.nombre}</h6>
                                <p className="card-text mb-1">
                                    Puntos requeridos: {item.puntosRequeridos}
                                </p>
                                <p className="card-text mb-2">
                                    Fecha: {new Date(item.fechaCanje).toLocaleDateString()} - {new Date(item.fechaCanje).toLocaleTimeString()}
                                </p>
                                <div style={{ width: '100%', maxWidth: 128, height: 128, margin: '10px auto', padding: '5px' }}>
                                    <QRCode value={item.qr || "No QR disponible"} size={128} level="H" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Rewards;