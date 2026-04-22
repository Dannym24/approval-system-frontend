import React, { useState } from "react";

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
      const response = await fetch("http://localhost:8080/api/purchase-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setMessage(`Solicitud creada con ID: ${data.requestId}`);
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
          <label>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Descripción</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Monto</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

          <button type="submit">Crear Solicitud</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default CreateRequestPage;