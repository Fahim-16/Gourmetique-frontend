import React from 'react';
import Adminnav from './Adminnav';

const Review_Ads = () => {
  const customerReviews = [
    { id: 1, customerName: 'Alice', review: 'Great food and quick service!', rating: 5 },
    { id: 2, customerName: 'Bob', review: 'Could be better. Waiting time was long.', rating: 3 },
    { id: 3, customerName: 'Charlie', review: 'Absolutely loved the desserts!', rating: 5 },
    { id: 4, customerName: 'Diana', review: 'Average ambiance but good food.', rating: 4 },
    { id: 5, customerName: 'Ethan', review: 'Loved the spicy starters!', rating: 4 },
    { id: 6, customerName: 'Fatima', review: 'Portions were too small.', rating: 2 },
  ];

  const restaurantAds = [
    { id: 1, title: '50% Off on Starters!', description: 'Enjoy a flat 50% discount on all starters this weekend.' },
    { id: 2, title: 'New Menu Launch', description: 'We’ve added exciting new dishes to our main course. Check it out!' },
    { id: 3, title: 'Free Dessert with Every Meal', description: 'Order a main course and get a free dessert of your choice!' },
    { id: 4, title: 'Live Music Friday Night', description: 'Join us for a musical evening with delicious food.' },
    { id: 5, title: 'Unlimited Buffet Offer', description: 'Eat all you want with our new buffet menu, only at ₹499.' },
  ];

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
    overflowY: 'auto',
    gap: '20px',
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    backgroundColor: '#f9f9f9',
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <Adminnav />
      </div>

      {/* Content */}
      <div style={containerStyle}>
        <div style={cardWrapperStyle}>
          {/* Customer Reviews Card */}
          <div style={cardStyle}>
            <h4>Customer Reviews</h4>
            {customerReviews.map((review) => (
              <div key={review.id} style={{ marginBottom: '10px' }}>
                <p><strong>{review.customerName}</strong>: {review.review}</p>
                <p>⭐ {review.rating}/5</p>
              </div>
            ))}
          </div>

          {/* Restaurant Ads Card */}
          <div style={cardStyle}>
            <h4>Restaurant Advertisements</h4>
            {restaurantAds.map((ad) => (
              <div key={ad.id} style={{ marginBottom: '10px' }}>
                <p><strong>{ad.title}</strong></p>
                <p>{ad.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review_Ads;
