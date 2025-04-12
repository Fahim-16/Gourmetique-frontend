import React, { useState } from "react";
import Restaurant_Nav from "./Restaurant_Nav";

const Restaurant_Profile = () => {
  const [menu, setMenu] = useState({
    starters: [{ id: 1, name: "Lollipop", price: 100, count: 1 }],
    mainCourse: [{ id: 2, name: "Butter Chicken", price: 250, count: 1 }],
    desserts: [{ id: 3, name: "Gulab Jamun", price: 80, count: 1 }],
  });

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCountChange = (category, itemId, count) => {
    const updatedMenu = { ...menu };
    updatedMenu[category] = updatedMenu[category].map((item) =>
      item.id === itemId ? { ...item, count } : item
    );
    setMenu(updatedMenu);
  };

  const handleDelete = (category, itemId) => {
    const updatedMenu = { ...menu };
    updatedMenu[category] = updatedMenu[category].filter((item) => item.id !== itemId);
    setMenu(updatedMenu);

    // Remove from selectedItems if present
    setSelectedItems((prev) => prev.filter((i) => !(i.id === itemId && i.category === category)));
  };

  const handleUpdate = (category, itemId) => {
    const item = menu[category].find((i) => i.id === itemId);
    const updatedList = [...selectedItems];
    const index = updatedList.findIndex((i) => i.id === itemId && i.category === category);

    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      count: item.count,
      category,
    };

    if (index !== -1) {
      updatedList[index] = newItem;
    } else {
      updatedList.push(newItem);
    }

    setSelectedItems(updatedList);
  };

  const renderTable = (category, items) => (
    <div key={category}>
      <h2>{category}</h2>
      <table border={2} cellPadding={10} style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>SI</th>
            <th>ITEM</th>
            <th>PRICE</th>
            <th>COUNT</th>
            <th>ACTIONS</th>
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
                  min={1}
                  value={item.count}
                  onChange={(e) =>
                    handleCountChange(category, item.id, parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(category, item.id)}>Update</button>
                <button
                  onClick={() => handleDelete(category, item.id)}
                  style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
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

  const containerStyle = {
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
    width: "800px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    overflowY: "auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <Restaurant_Nav />
      </div>

      {/* Main Content */}
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div className="card mb-3">
            <div className="card-header">Restaurant Profile</div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>Details of the restaurant, address, description, etc.</p>
              </blockquote>
            </div>
          </div>

          {/* Menu Sections */}
          {renderTable("starters", menu.starters)}
          {renderTable("mainCourse", menu.mainCourse)}
          {renderTable("desserts", menu.desserts)}
        </div>
      </div>
    </div>
  );
};

export default Restaurant_Profile;
