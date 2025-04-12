import React, { useEffect, useState } from "react";
import Customer_Nav from "./Customer_Nav";
import axios from "axios";

const RestaurantDetails = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [numCustomers, setNumCustomers] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [menu, setMenu] = useState({
    starters: [],
    mainCourse: [],
    desserts: [],
  });

  const hotelid = sessionStorage.getItem("hotelId"); // replace with actual hotel ID from auth or props

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const [starterRes, mainRes, dessertRes] = await Promise.all([
          axios.post("http://localhost:3001/viewstarters", { hotelid }),
          axios.post("http://localhost:3001/viewmains", { hotelid }),
          axios.post("http://localhost:3001/viewdesserts", { hotelid }),
        ]);

        setMenu({
          starters: starterRes.data.map((item) => ({
            id: item._id,
            name: item.item,
            price: item.price,
          })),
          mainCourse: mainRes.data.map((item) => ({
            id: item._id,
            name: item.mitem,
            price: item.mprice,
          })),
          desserts: dessertRes.data.map((item) => ({
            id: item._id,
            name: item.ditem,
            price: item.dprice,
          })),
        });
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleSelectionChange = (category, item, checked, count) => {
    const newItems = [...selectedItems];
    const index = newItems.findIndex(
      (i) => i.id === item.id && i.category === category
    );

    if (checked) {
      const newItem = {
        id: item.id,
        name: item.name,
        category,
        price: item.price,
        count: count || 1,
      };

      if (index === -1) newItems.push(newItem);
      else newItems[index].count = count || 1;
    } else {
      if (index !== -1) newItems.splice(index, 1);
    }

    setSelectedItems(newItems);
  };

  const handleCountChange = (category, item, count) => {
    const newItems = [...selectedItems];
    const index = newItems.findIndex(
      (i) => i.id === item.id && i.category === category
    );

    if (index !== -1) {
      newItems[index].count = count;
      setSelectedItems(newItems);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting to database:", selectedItems);
    // Add order submission logic here
  };

  const handleBookingInfoSubmit = () => {
    console.log("Booking info:", {
      numberOfCustomers: numCustomers,
      timeSlot: timeSlot,
    });
    // Add booking submission logic here
  };

  const renderTable = (category, items) => (
    <div>
      <h2>{category}</h2>
      <table border={2} cellPadding={10}>
        <thead>
          <tr>
            <th>SI</th>
            <th>ITEM</th>
            <th>PRICE</th>
            <th>COUNT</th>
            <th>SELECTED</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>Rs.{item.price}</td>
              <td>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  onChange={(e) =>
                    handleCountChange(category, item, parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleSelectionChange(
                      category,
                      item,
                      e.target.checked,
                      1
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const sidebarStyle = {
    width: "250px",
    height: "100vh",
    borderRight: "1px solid #ccc",
    padding: "10px",
  };

  const mainContainerStyle = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    height: "100vh",
    overflow: "hidden",
  };

  const cardStyle = {
    height: "100%",
    width: "500px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    overflowY: "auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const inputGroupStyle = {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={sidebarStyle}>
        <Customer_Nav />
      </div>

      <div style={mainContainerStyle}>
        <div style={cardStyle}>
          <div className="card mb-3">
            <div className="card-header">Featured</div>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>

          {renderTable("Starters", menu.starters)}
          {renderTable("Main Course", menu.mainCourse)}
          {renderTable("Desserts", menu.desserts)}

          <textarea
            style={{ width: "100%", marginTop: "10px", height: "100px" }}
            readOnly
            value={selectedItems
              .map(
                (item) =>
                  `${item.name} (x${item.count}) - Rs.${item.price * item.count}`
              )
              .join("\n")}
          ></textarea>

          <button
            type="button"
            onClick={handleSubmit}
            style={{ marginTop: "10px", width: "100%", padding: "10px" }}
          >
            Place Order
          </button>

          <div style={inputGroupStyle}>
            <div className="mb-2">
              <label>Number of Customers</label>
              <input
                type="number"
                min={1}
                value={numCustomers}
                onChange={(e) => setNumCustomers(e.target.value)}
                className="form-control"
                placeholder="Enter number of people"
              />
            </div>
            <div className="mb-2">
              <label>Time Slot</label>
              <input
                type="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="form-control"
              />
            </div>
            <button
              type="button"
              onClick={handleBookingInfoSubmit}
              style={{ marginTop: "10px", width: "100%", padding: "10px" }}
            >
              Submit Booking Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
