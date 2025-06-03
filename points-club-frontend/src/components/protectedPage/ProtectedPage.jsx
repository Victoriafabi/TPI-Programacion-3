import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedPage = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Debes iniciar sesión para acceder");
      navigate("/");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return <>{children}</>;
};

export default ProtectedPage;
