import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Scan() {
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 220 },
        async (barcode) => {
          try {
            const res = await API.post("/api/scan", { barcode });

            localStorage.setItem(
              "scannedProduct",
              JSON.stringify({
                ...res.data,
                quantity: 1
              })
            );

            if (isRunningRef.current) {
              await scanner.stop();
              isRunningRef.current = false;
            }

            setTimeout(() => {
              navigate("/customer/cart");
            }, 300);
          } catch {
            alert("Product not found");
          }
        }
      )
      .then(() => {
        isRunningRef.current = true;
      })
      .catch((err) => {
        console.error("Camera start error:", err);
      });

    return () => {
      // ✅ SAFE CLEANUP
      if (scannerRef.current && isRunningRef.current) {
        scannerRef.current.stop().catch(() => {});
        isRunningRef.current = false;
      }
    };
  }, [navigate]);

  return (
    <div className="container scan-page">
      <button className="secondary" onClick={() => navigate("/")}>
        ⬅ Back
      </button>

      <h2>Scan Product Barcode</h2>

      <div className="scanner-box">
        <div id="reader"></div>
      </div>

      <p className="scan-helper">
        Make sure barcode is clearly visible
      </p>
    </div>
  );
}