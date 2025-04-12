import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Nav from './Nav';

const Review = () => {
    const [reviews, setReviews] = useState(["nyc food", "good service", "well maintained", "hello","hi","mrng"]);

    return (
        <div>
            <Nav />
            <div
                style={{
                    display: 'flex',
                    backgroundColor: 'rgb(179, 179, 179)',
                    justifyContent: 'center',
                    height: '100vh',
                    alignItems: 'center',
                    paddingTop: "20px"
                }}
            >
                <div className="review-container"
                    style={{
                        overflowY: 'auto',
                        height: "600px",
                        width: "500px",
                        display: 'flex',
                        flexDirection: 'column',  // Changed from row to column
                        backgroundColor: 'white',
                        alignItems: 'center',  // Center items horizontally
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: '10px',
                        padding: '10px'
                    }}
                >
                    {
                        reviews.map((values, index) => {
                            return (
                                <div key={index} className="card mb-3" 
                                    style={{
                                        width: "90%",  // Limit width
                                        marginBottom: "10px"
                                    }}
                                >
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{values}</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Review;
