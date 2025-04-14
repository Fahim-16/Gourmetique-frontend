import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant_Nav from './Restaurant_Nav';
import { useNavigate } from 'react-router-dom';

const Restauranthome = () => {
  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  const hotelId = sessionStorage.getItem("restaurantid"); // Replace with actual hotelId
  const navigate = useNavigate();

  // Helper function to convert 24-hour time to 12-hour format with AM/PM
  const convertTo24HourWithAMPM = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const suffix = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12; // Convert 24-hour format to 12-hour format
    return `${hour12}:${minute} ${suffix}`;
  };

  useEffect(() => {
    if (!hotelId) {
      navigate('/'); // Navigate to login if restaurantid is not in sessionStorage
    }
    const fetchOrders = async () => {
      try {
        // Fetch accepted orders first
        const acceptedOrdersResponse = await axios.post('http://localhost:3001/getAcceptedOrders', { hotelId });

        const acceptedOrdersList = acceptedOrdersResponse.data || [];

        // Get list of accepted order IDs
        const acceptedOrderIds = acceptedOrdersList.map(order => order.orderId);

        setAcceptedOrders(acceptedOrdersList.map(order => ({
          id: order.orderId,
          name: order.customerName,
          date: `${new Date(order.orderDate).toLocaleDateString('en-GB')} - ${convertTo24HourWithAMPM(order.timeSlot)}`,
          total: `Rs.${order.grandTotal}`,
          items: order.items,
        })));

        // Fetch all orders
        const response = await axios.post('http://localhost:3001/vieworders', { hotelId });
        if (response.data && response.data.orders) {
          const sanitizedOrders = response.data.orders
            .filter(order => !acceptedOrderIds.includes(order._id)) // ← filter out accepted
            .map((order, index) => {
              const orderDate = new Date(order.orderDate);
              const day = String(orderDate.getDate()).padStart(2, '0');
              const month = String(orderDate.getMonth() + 1).padStart(2, '0');
              const year = orderDate.getFullYear();
              const formattedDate = `${day}/${month}/${year}`;
              const formattedTime = convertTo24HourWithAMPM(order.timeSlot);
              const formattedDateTime = `${formattedDate} - ${formattedTime}`;

              return {
                id: order._id || index + 1,
                name: order.customerName,
                date: formattedDateTime,
                total: `Rs.${order.grandTotal}`,
                items: order.items.map(item => ({
                  name: item.name,
                  quantity: item.count,
                })),
                timeSlot: order.timeSlot,
              };
            });

          setOrders(sanitizedOrders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, [hotelId, navigate]);


  const handleAccept = async (orderId) => {
    const acceptedOrder = orders.find((order) => order.id === orderId);
    if (acceptedOrder) {
      setAcceptedOrders((prev) => [...prev, acceptedOrder]);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));

      try {
        await axios.post('http://localhost:3001/saveAcceptedOrder', {
          orderId: acceptedOrder.id,
          customerName: acceptedOrder.name,
          orderDate: acceptedOrder.date.split(' - ')[0],
          grandTotal: acceptedOrder.total.replace('Rs.', ''),
          items: acceptedOrder.items,
          hotelId: hotelId,                  // <-- Make sure this is included
          timeSlot: acceptedOrder.timeSlot  // <-- Include this too
        });


      } catch (error) {
        console.error('Failed to save accepted order:', error);
      }
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} style={cardStyle}>
                  <h4>Order Id: {order.id}</h4>
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
              ))
            ) : (
              <p>No new orders</p>
            )}
          </div>
          <h3 style={{ marginTop: "40px" }}>Accepted Orders</h3>
          {/* Accepted Orders */}
          {acceptedOrders.length > 0 ? (
            <>
              <div style={cardContainerStyle}>
                {acceptedOrders.map((order) => (
                  <div key={order.id} style={cardStyle}>
                    <h4>Order Id: {order.id}</h4>
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
          ) : (
            <p>No accepted orders</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restauranthome;
