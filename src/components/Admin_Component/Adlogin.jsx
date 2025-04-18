import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../mainhome/Nav'; // Your original Nav component

const Adlogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Hardcoded username and password
    const validUsername = "Admin123";
    const validPassword = "123456";

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if entered username and password match
        if (username === validUsername && password === validPassword) {
            // Simulate JWT token (this should ideally come from the backend)
            const token = "simulated_jwt_token"; // Replace with the actual token from your backend

            // Store JWT token in localStorage
            localStorage.setItem('token', token);

            // Redirect to the next page
            navigate('/admincus'); // Change '/nextPage' to your actual next page route
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <Nav /> {/* Your original Nav bar */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", // Full viewport height
                    backgroundColor: "white",
                }}
            >
                <div style={{
                    width: "500px",
                    height: "500px",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <h1><u>ADMIN LOGIN</u></h1>

                    {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "20px",
                        padding: "20px"
                    }}>
                        <label htmlFor="">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "20px",
                        padding: "20px"
                    }}>
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: "20px",
                        padding: "20px",
                    }}>
                        <button className="btn btn-success" type="submit" onClick={handleLogin}>Login</button>
                    </div>
                    <br />
                    <hr
                        style={{
                            width: "80%",
                            height: "2px",
                            backgroundColor: "black",
                            border: "none",
                            margin: "10px auto",
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

export default Adlogin;
