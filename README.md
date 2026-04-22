# Approval System - Frontend

## Descripción

Aplicación web en React que implementa un flujo de aprobación de solicitudes de compra con validación OTP y descarga de evidencia en PDF.

## Tecnologías

- React 17+
- React Router
- Fetch API
- JavaScript
- CSS

## Funcionalidades

### 1. Creación de solicitudes
- Título
- Descripción
- Monto
- Creación de 3 aprobadores

### 2. Listado de solicitudes
- Visualización de todas las solicitudes
- Estado general del proceso

### 3. Detalle de solicitud
- Información completa
- Estado de cada aprobador
- Selección de aprobador

### 4. Proceso de aprobación
- Ingreso de OTP
- Opciones:
  - Aprobar
  - Rechazar
- Registro de decisión

### 5. Descarga de evidencia
- Cuando la solicitud está `COMPLETED`
- Descarga de PDF generado en backend

## 🔗 Backend

La aplicación consume el backend en:http://localhost:8080/api

## Ejecución local
npm install
npm start

## Estructura
CreateRequestPage → creación de solicitudes
ListRequestsPage → listado general
RequestDetailPage → detalle y aprobación
ApprovePage → flujo de aprobación OTP
