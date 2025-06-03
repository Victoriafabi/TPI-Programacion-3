import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

const Points = () => {
  const { user, token } = useAuth();
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !token) {
      setPoints(null);
      setLoading(false);
      return;
    }

    const fetchPoints = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener puntos del usuario");
        const data = await res.json();
        setPoints(data.puntos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [user, token]);

  if (loading) return <p>Cargando puntos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (points === null) return <p>No hay usuario logueado.</p>;

  return <p>Puntos disponibles: {points}</p>;
};

export default Points;
