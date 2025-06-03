import React, { useEffect, useState } from "react";
import "./Branches.css";

const Branches = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/branches")
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(err => console.error("Error al cargar sucursales:", err));
  }, []);

  return (
    <div className="container my-4 branches-container">
      <h2 className="text-center mb-4 branches-title">Nuestras Sucursales</h2>
      <div className="row">
        {branches.map(branch => (
          <div key={branch.id} className="col-md-4 mb-4">
            <div className="card h-100 p-4 ">
              <h5 className="card-title text-center">{branch.name}</h5>
              {branch.imageUrl && (
                <img
                  src={branch.imageUrl}
                  alt={branch.name}
                  className="card-img-top branch-image mb-2"
                />
              )}
              <p className="card-text">
                <strong>Dirección:</strong> {branch.address}
              </p>
              <p className="card-text">
                <strong>Teléfono:</strong> {branch.phone}
              </p>
              <p className="card-text">
                <strong>Horario:</strong> {branch.hours}
              </p>
              {branch.mapUrl && (
                <p className="mt-2 text-center">
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en el mapa
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branches;