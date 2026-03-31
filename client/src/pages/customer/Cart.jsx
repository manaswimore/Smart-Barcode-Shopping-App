import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart on page load
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const scannedProduct = JSON.parse(localStorage.getItem("scannedProduct"));

    let updatedCart = [...existingCart];

    if (scannedProduct) {
      const index = updatedCart.findIndex(
        (item) => item.barcode === scannedProduct.barcode
      );

      if (index !== -1) {
        updatedCart[index].quantity += 1;
      } else {
        updatedCart.push(scannedProduct);
      }

      localStorage.removeItem("scannedProduct");
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, []);

  const increaseQty = (i) => {
    const updated = [...cart];
    updated[i].quantity += 1;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (i) => {
    const updated = [...cart];
    if (updated[i].quantity > 1) {
      updated[i].quantity -= 1;
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (i) => {
    const updated = cart.filter((_, index) => index !== i);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateBill = async () => {
  try {
    console.log("Generating bill...");
    console.log("Cart:", cart);

    const res = await API.post("/api/bill/create", {
      items: cart.map(item => ({
        productId: item._id || "demo",
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total
    });

    console.log("Bill created:", res.data);

    localStorage.setItem("billId", res.data.billId);
    navigate("/customer/qr");
  } catch (err) {
    console.error("Bill generation failed", err);
    alert("Failed to generate bill");
  }
};

  return (
  <div className="container cart-page">

    <h2>Your Cart</h2>

    {cart.length === 0 && (
      <p className="empty-text">No items added yet</p>
    )}

    {cart.map((item, i) => (
      <div key={i} className="card cart-item">

        <div className="item-name">
          {item.name}
        </div>

        <div className="item-price">
          ₹{item.price}
        </div>

        <div className="qty-controls">
          <button onClick={() => decreaseQty(i)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQty(i)}>+</button>
        </div>

        <button
          className="remove-btn"
          onClick={() => removeItem(i)}
        >
          Remove
        </button>

      </div>
    ))}

    {cart.length > 0 && (
      <>
        <div className="total">
          Total: ₹{total}
        </div>

        <button
          className="generate-btn"
          onClick={generateBill}
        >
          Generate Bill QR
        </button>
      </>
    )}

  </div>
);
}