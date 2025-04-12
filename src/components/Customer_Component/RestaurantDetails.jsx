import React, { useEffect, useState } from "react";
import Customer_Nav from "./Customer_Nav";
import axios from "axios";

const RestaurantDetails = () => {
  const [hotelData, setHotelData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [numCustomers, setNumCustomers] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [menu, setMenu] = useState({
    starters: [],
    mainCourse: [],
    desserts: [],
  });

  const hotelid = sessionStorage.getItem("hotelId");
  const apiUrl = "http://localhost:3001/viewsprestaurant";

  useEffect(() => {
    // Fetch hotel details
    axios
      .post(apiUrl, { _id: hotelid })
      .then((response) => {
        setHotelData(response.data); // Assuming the response contains hotel details
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching restaurant:", error));

    // Fetch menu items
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

  const handleSubmit = async () => {
    const grandTotal = calculateGrandTotal();  // Calculate grand total in frontend
  
    // Retrieve customerId from session storage 
    const customerId = sessionStorage.getItem("customerid");
  
    const orderData = {
      hotelId: hotelid,
      items: selectedItems,
      numberOfCustomers: numCustomers,
      timeSlot: timeSlot,
      grandTotal: grandTotal,  // Include the grand total in the request
      customerId: customerId,  // Include the customerId in the order data
    };
  
    try {
      const response = await axios.post("http://localhost:3001/placeorder", orderData);
      console.log("Order submitted successfully:", response.data);
      alert("Order placed successfully!");
      setSelectedItems([]);
      setNumCustomers("");
      setTimeSlot("");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  

  const calculateGrandTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
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
            <div className="card-header" style={{ fontSize: "24px", fontWeight: "bold" }}>
              {hotelData.restaurantName}
            </div>
            <div className="card-body">
              <p className="card-text">Address: {hotelData.address}</p>
              <p className="card-text">Phone No. : {hotelData.phone}</p>
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

          <div style={{ marginTop: "10px", fontWeight: "bold" }}>
            Grand Total: Rs.{calculateGrandTotal()}
          </div>

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
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            style={{ marginTop: "10px", width: "100%", padding: "10px" }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
