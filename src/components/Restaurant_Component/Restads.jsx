import React, { useEffect, useState } from 'react';
import Restaurant_Nav from './Restaurant_Nav';
import { useNavigate } from 'react-router-dom';

const Restads = () => {
  const [review, setReview] = useState([]);
  const [inputField, setInputField] = useState({ title: '', image: '' });

  const hotelId = sessionStorage.getItem("restaurantid"); // Replace with actual hotelId
  const navigate = useNavigate();

  useEffect(() => {
    if (!hotelId) {
      navigate('/'); // Navigate to login if restaurantid is not in sessionStorage
    }
  }, [hotelId, navigate]);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setInputField((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const readValue = (e) => {
    e.preventDefault();
    if (inputField.title && inputField.image) {
      const newReview = {
        title: inputField.title,
        image: URL.createObjectURL(inputField.image), // For demo
      };
      setReview((prev) => [newReview, ...prev]);
      setInputField({ title: '', image: '' });
    }
  };

  const sidebarStyle = {
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'white',
    padding: '10px 10px 10px 250px',
  };

  const cardWrapperStyle = {
    width: '800px',
    height: '500px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  };

  const searchBarStyle = {
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    paddingBottom: '10px',
    zIndex: 10,
  };

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    overflowY: 'auto',
    height: '100%',
    paddingTop: '10px',
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <Restaurant_Nav />
      </div>

      {/* Card Content */}
      <div style={containerStyle}>
        <div style={cardWrapperStyle}>
          {/* Scrollable Card Container */}
          <div style={cardContainerStyle}>
            {review.length > 0 ? (
              review.map((item, index) => (
                <div key={index} className="card" style={{ width: '40rem', minHeight: '250px' }}>
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt="Review"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                  </div>
                </div>
              ))
            ) : (
              [...Array(5)].map((_, index) => (
                <div key={index} className="card" style={{ width: '40rem', minHeight: '250px' }}>
                  <img
                    src="https://via.placeholder.com/640x200.png?text=Review+Image"
                    className="card-img-top"
                    alt="Placeholder"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h4 className="card-title">Customer Review {index + 1}</h4>
                    <p className="card-text">
                      "This is an example of a detailed customer review. It includes more text
                      and allows users to share their thoughts about a restaurant."
                    </p>
                    <p className="card-text"><strong>Rating:</strong> ⭐⭐⭐⭐☆</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* File Upload & Review Post Form */}
          <div style={searchBarStyle}>
            <div className="mb-2">
              <label htmlFor="image" className="form-label">
                Post Your Reviews
              </label>
              <input
                onChange={fileHandler}
                accept="image/*"
                className="form-control"
                type="file"
                id="image"
                name="image"
              />
            </div>

            <form className="d-flex" onSubmit={readValue}>
              <input
                onChange={inputHandler}
                value={inputField.title}
                name="title"
                id="title"
                className="form-control me-2"
                type="text"
                placeholder="Write your review..."
                aria-label="Review"
              />
              <button className="btn btn-outline-success" type="submit">
                POST
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restads;
