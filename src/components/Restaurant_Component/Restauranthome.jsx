import React, { useState } from 'react';
import Restaurant_Nav from './Restaurant_Nav';

const Restauranthome = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "2025-04-06",
      total: "Rs.500",
      items: [
        { name: "Butter Chicken", quantity: 1 },
        { name: "Naan", quantity: 2 },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2025-04-05",
      total: "Rs.750",
      items: [
        { name: "Paneer Tikka", quantity: 1 },
        { name: "Jeera Rice", quantity: 1 },
        { name: "Dal Makhani", quantity: 1 },
      ],
    },
    {
      id: 3,
      name: "Bob Johnson",
      date: "2025-04-04",
      total: "Rs.300",
      items: [
        { name: "Veg Biryani", quantity: 1 },
      ],
    },
    {
      id: 4,
      name: "Alice Brown",
      date: "2025-04-03",
      total: "Rs.620",
      items: [
        { name: "Chicken Lollipop", quantity: 1 },
        { name: "Fried Rice", quantity: 1 },
      ],
    },
  ]);

  const [acceptedOrders, setAcceptedOrders] = useState([]);

  const handleAccept = (orderId) => {
    const acceptedOrder = orders.find((order) => order.id === orderId);
    if (acceptedOrder) {
      setAcceptedOrders((prev) => [...prev, acceptedOrder]);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    }
  };

  const sidebarStyle = {
    width: "250px",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
    backgroundColor: "white",
    padding: "20px 20px 20px 250px",
    overflowY: "auto",
  };

  const contentStyle = {
    width: "100%",
    maxWidth: "1000px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const cardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  };

  const cardStyle = {
    flex: "1 1 calc(50% - 20px)",
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <Restaurant_Nav />
      </div>

      <div style={containerStyle}>
        <div style={contentStyle}>
          <h2>New Orders</h2>
          <div style={cardContainerStyle}>
            {orders.map((order) => (
              <div key={order.id} style={cardStyle}>
                <h4>Order #{order.id}</h4>
                <p><strong>Customer:</strong> {order.name}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Total:</strong> {order.total}</p>
                <p><strong>Items:</strong></p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item.name} x {item.quantity}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAccept(order.id)}
                  style={{ backgroundColor: "green", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", marginTop: "10px" }}
                >
                  Accept
                </button>
              </div>
            ))}
          </div>

          {/* Accepted Orders */}
          {acceptedOrders.length > 0 && (
            <>
              <h3 style={{ marginTop: "40px" }}>Accepted Orders</h3>
              <div style={cardContainerStyle}>
                {acceptedOrders.map((order) => (
                  <div key={order.id} style={cardStyle}>
                    <h4>Order #{order.id}</h4>
                    <p><strong>Customer:</strong> {order.name}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Total:</strong> {order.total}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>{item.name} x {item.quantity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restauranthome;
