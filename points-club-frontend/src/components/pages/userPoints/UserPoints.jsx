
import Points from "./Points";
import Rewards from "./Rewards";
import "./UserPoints.css"; 
import { useAuth } from "../../../hooks/useAuth"; 
const UserPoints = () => { 
  const { user } = useAuth(); 


  const saludoFelicitacion = `¡Felicidades, ${user?.nombre || "Usuario"}!`;

  return (
    <div className="user-points-container"> 
      <div className="points-section"> 
        <h5 className="section-title">Tus puntos</h5>
       
        <p className="user-greeting">{saludoFelicitacion}</p> 
        <Points />
     
      </div>
      <div className="history-section"> 
        <h5 className="section-title">Historial de premios canjeados</h5>
        <Rewards />
      </div>
    </div>
  );
}; 

export default UserPoints;