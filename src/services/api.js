const BASE_URL = "http://localhost:8080/api";

export const createRequest = async (data) => {
  const response = await fetch(`${BASE_URL}/purchase-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creando solicitud");
  }

  return response.json();
};


export const approveRequest = async (data) => {
  const response = await fetch(`${BASE_URL}/purchase-requests/approval`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error en aprobación");
  }

  return response.json();
};


export const getEvidence = async (id) => {
  const response = await fetch(
    `${BASE_URL}/purchase-requests/${id}/evidencia.pdf`
  );

  if (!response.ok) {
    throw new Error("Error descargando PDF");
  }

  return response.blob();
};