import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/customer/Home";
import Scan from "./pages/customer/Scan";
import Cart from "./pages/customer/Cart";
import QR from "./pages/customer/QR";
import ScanQR from "./pages/admin/ScanQR";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Customer */}
        <Route path="/customer/scan" element={<Scan />} />
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/qr" element={<QR />} />

        {/* Admin */}
        <Route path="/admin/scan" element={<ScanQR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;