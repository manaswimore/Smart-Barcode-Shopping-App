import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">

      <h1>🛒 Self Billing Grocery</h1>

      <p>
        Scan products, generate bill & skip long queues.
      </p>

      <button onClick={() => navigate("/customer/scan")}>
        Start Shopping
      </button>

      <button
        className="secondary"
        onClick={() => navigate("/admin/scan")}
      >
        Admin Panel
      </button>

      <p style={{ marginTop: "20px", fontStyle: "italic" }}>
        “Scan. Pay. Go.”
      </p>

    </div>
  );
}
