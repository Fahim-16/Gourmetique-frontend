import React, { useState } from "react";
import Customer_Nav from "./Customer_Nav"; // Adjust path as necessary

const RestaurantDetails = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [numCustomers, setNumCustomers] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const menu = {
    starters: [{ id: 1, name: "Lollipop", price: 100 }],
    mainCourse: [{ id: 2, name: "Butter Chicken", price: 250 }],
    desserts: [{ id: 3, name: "Gulab Jamun", price: 80 }],
  };

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
    // Add API call for food order here
  };

  const handleBookingInfoSubmit = () => {
    console.log("Submitting booking info:", {
      numberOfCustomers: numCustomers,
      timeSlot: timeSlot,
    });
    // Add API call for booking info here
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

  // Styles
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
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <Customer_Nav />
      </div>

      {/* Main Content */}
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

          {/* Menu Sections */}
          {renderTable("Starters", menu.starters)}
          {renderTable("Main Course", menu.mainCourse)}
          {renderTable("Desserts", menu.desserts)}

          {/* Display Order Summary */}
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

          {/* Extra Input Card */}
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
