import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { approveRequest, getEvidence } from "../services/api";

const RequestDetailPage = () => {
  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [selectedApprover, setSelectedApprover] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const loadRequest = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/purchase-requests/${id}`);
      const data = await res.json();
      setRequest(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRequest();
  }, [id]);

  const handleDecision = async (decision) => {
    const approval = request.approvals.find(
      (a) => a.email === selectedApprover
    );

    const payload = {
      approvalId: approval.id,
      otp,
      decision,
    };

    try {
      const data = await approveRequest(payload);
      setMessage(data.message);
      loadRequest();
    } catch (err) {
      setMessage("Error al procesar aprobación");
    }
  };

  const downloadPdf = async () => {
    const blob = await getEvidence(id);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "evidencia.pdf";
    a.click();
  };

  if (!request) return <div className="container">Cargando...</div>;

  return (
    <div className="container">

      <div className="card">
        <h2>{request.title}</h2>
        <p>{request.description}</p>
        <p>Monto: {request.amount}</p>
        <p>Estado: {request.status}</p>
      </div>

      <div className="card">
        <h3>Aprobadores</h3>

        <select
          value={selectedApprover}
          onChange={(e) => setSelectedApprover(e.target.value)}
        >
          <option value="">Selecciona aprobador</option>

          {request.approvals.map((a) => (
            <option key={a.id} value={a.email}>
              {a.email} ({a.status})
            </option>
          ))}
        </select>

        <input
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={() => handleDecision("APPROVED")}>
          Aprobar
        </button>

        <button onClick={() => handleDecision("REJECTED")}>
          Rechazar
        </button>

        {message && <p>{message}</p>}
      </div>

      <div className="card">
        <h3>Estado aprobadores</h3>

        {request.approvals.map((a) => (
          <div key={a.id} className="card">
            <p>{a.email}</p>
            <p>{a.status}</p>
            <p>{a.actionAt || "Pendiente"}</p>
          </div>
        ))}
      </div>

      {request.status === "COMPLETED" && (
        <div className="card">
          <button onClick={downloadPdf}>
            Descargar PDF
          </button>
        </div>
      )}

    </div>
  );
};

export default RequestDetailPage;