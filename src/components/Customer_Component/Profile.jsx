import React from "react";
import Customer_Nav from "./Customer_Nav";

const Profile = () => {
  // Dummy order data for demonstration
  const orders = [
    { id: 1, name: "John Doe", date: "2025-04-06", total: "Rs.500" },
    { id: 2, name: "Jane Smith", date: "2025-04-05", total: "Rs.750" },
    { id: 3, name: "Bob Johnson", date: "2025-04-04", total: "Rs.300" },
    { id: 4, name: "Alice Brown", date: "2025-04-03", total: "Rs.620" },
    // add more rows as needed
  ];

  const sidebarStyle = {
    width: "250px",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "white",
    padding: "10px 10px 10px 250px",
  };

  const cardWrapperStyle = {
    width: "800px",
    height: "500px",
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  };

  const cardContainerStyle = {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    height: "100%",
    paddingTop: "10px",
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <Customer_Nav />
      </div>

      {/* Main Content */}
      <div style={containerStyle}>
        <div style={cardWrapperStyle}>
          <div style={cardContainerStyle}>
            <div className="card mb-3">
              <div className="card-header">Quote</div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>A well-known quote, contained in a blockquote element.</p>
                  <footer className="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </div>
            </div>

            <h2>Orders</h2>
            <div style={{ overflowX: "auto" }}>
              <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Order Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.date}</td>
                      <td>{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
