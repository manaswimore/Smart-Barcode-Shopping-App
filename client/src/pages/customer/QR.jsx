import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QR() {
  const [qr, setQr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const billId = localStorage.getItem("billId");
    QRCode.toDataURL(billId).then(setQr);
  }, []);

  return (
  <div className="container qr-page">

    <button
      className="secondary"
      onClick={() => navigate("/customer/cart")}
    >
      ⬅ Back
    </button>

    <h2>Payment QR Generated</h2>

    <p className="qr-subtitle">
      Show this QR at the billing counter to complete payment
    </p>

    {qr && (
      <div className="qr-card">
        <img src={qr} alt="Bill QR" />
      </div>
    )}

    <p className="qr-note">
      Thank you for shopping with us 🙂
    </p>

  </div>
);

}
