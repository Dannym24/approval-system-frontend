import React, { useState } from "react";

const BASE_URL =
  "http://approval-system-env.eba-mjkh2mys.us-east-2.elasticbeanstalk.com/api/purchase-requests";

const CreateRequestPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      amount: parseFloat(amount),
      createdBy: "solicitante1",
    };

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setMessage(
        `ID: ${data.requestId} | OTPs: ${data.otpList.join(", ")}`
      );
    } catch (err) {
      console.error(err);
      setMessage("Error creando la solicitud");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Crear Solicitud de Compra</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit">Crear Solicitud</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default CreateRequestPage;