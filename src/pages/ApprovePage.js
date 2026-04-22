import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { approveRequest } from "../services/api";

const ApprovePage = () => {
  const [searchParams] = useSearchParams();

  const solicitudId = searchParams.get("solicitud_id");
  const token = searchParams.get("approval_token");
  const email = searchParams.get("approval_email");

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [decision, setDecision] = useState("");

  useEffect(() => {
  }, []);

  const handleApprove = async (dec) => {
    if (!otp) {
      setMessage("Debes ingresar OTP");
      return;
    }

    try {
      const payload = {
        approvalToken: token,
        otp,
        decision: dec,
      };

      const res = await approveRequest(payload);

      setMessage(res.message || "Acción realizada");
      setDecision(dec);
    } catch (err) {
      console.error(err);
      setMessage("Error procesando aprobación");
    }
  };

  return (
    <div className="container">

      <div className="card">
        <h2>Flujo de Aprobación</h2>

        <p><b>Solicitud ID:</b> {solicitudId}</p>
        <p><b>Email aprobador:</b> {email}</p>
        <p><b>Token:</b> {token}</p>

        <input
          type="text"
          placeholder="Ingresa OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          className="primary"
          onClick={() => handleApprove("APPROVED")}
        >
          Aprobar
        </button>

        <button
          className="danger"
          onClick={() => handleApprove("REJECTED")}
        >
          Rechazar
        </button>

        {message && <p>{message}</p>}
        {decision && <p>Decisión: {decision}</p>}
      </div>

    </div>
  );
};

export default ApprovePage;