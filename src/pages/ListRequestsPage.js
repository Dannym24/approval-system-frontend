import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const loadRequests = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/purchase-requests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error cargando solicitudes", error);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="container">
      <h2>Lista de Solicitudes</h2>

      {requests.length === 0 && (
        <div className="card">No hay solicitudes</div>
      )}

      {requests.map((req) => (
        <div
          key={req.id}
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/requests/${req.id}`)}
        >
          <h3>{req.title}</h3>
          <p>{req.description}</p>
          <p>Monto: {req.amount}</p>
          <p>Estado: {req.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ListRequestsPage;