import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/app.css";

import ListRequestsPage from "./pages/ListRequestsPage";
import CreateRequestPage from "./pages/CreateRequest";
import RequestDetailPage from "./pages/RequestDetailPage";
import ApprovePage from "./pages/ApprovePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ListRequestsPage />} />
        <Route path="/create" element={<CreateRequestPage />} />
        <Route path="/requests/:id" element={<RequestDetailPage />} />
        <Route path="/approve" element={<ApprovePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;