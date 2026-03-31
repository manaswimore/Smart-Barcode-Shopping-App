import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../../index.css"; // ensure CSS is loaded

export default function ScanQR() {
  const navigate = useNavigate();
  const qrRef = useRef(null);

  const [bill, setBill] = useState(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    if (!scanning) return;

    // ensure DOM is ready
    setTimeout(() => {
      qrRef.current = new Html5Qrcode("admin-reader");

      qrRef.current
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 220 },
          async (billId) => {
            try {
              const res = await API.get(`/api/bill/${billId}`);
              setBill(res.data);
              setScanning(false);
            } catch {
              alert("Invalid or expired bill QR");
            }
          }
        )
        .catch((err) => console.error("Camera error:", err));
    }, 300);

    return () => {};
  }, [scanning]);

  const confirmPayment = async () => {
    try {
      await API.post(`/api/bill/confirm/${bill._id}`);
      alert("Payment Confirmed ✅");
      setBill(null);
      setScanning(true);
    } catch {
      alert("Payment confirmation failed");
    }
  };

  return (
    <div className="container admin-page">

      <button className="secondary" onClick={() => navigate("/")}>
        ⬅ Back
      </button>

      <h2>Admin – Scan Bill QR</h2>

      {scanning && (
        <div className="scanner-box">
          <div id="admin-reader"></div>
        </div>
      )}

      {bill && (
        <div className="card bill-card">
          <h3>Bill Details</h3>

          {bill.items.map((item, i) => (
            <div key={i} className="bill-item">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="bill-total">
            Total: ₹{bill.total}
          </div>

          <div className="bill-status">
            Status: <strong>{bill.status}</strong>
          </div>

          {bill.status === "PENDING" && (
            <button className="confirm-btn" onClick={confirmPayment}>
              ✅ Confirm Payment
            </button>
          )}
        </div>
      )}

    </div>
  );
}
