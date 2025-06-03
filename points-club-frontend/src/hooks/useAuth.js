import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro del AuthenticationProvider");
  }
  return context;
};