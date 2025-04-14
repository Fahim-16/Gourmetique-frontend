import React from 'react'
import Nav from '../mainhome/Nav'

const Adlogin = () => {
    return (
        <div>
            <Nav />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", // Full viewport height
                    backgroundColor: "white",
                }}
            >
                <div style=
                    {{
                        width: "500px", // Adjust as needed
                        height: "500px", // Adjust as needed
                        backgroundColor: "white",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",


                    }}
                >
                    <h1><u>ADMIN LOGIN</u></h1>

                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "20px",
                            padding: "20px"
                        }}>
                        <label htmlFor="">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                    </div>

                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "20px",
                            padding: "20px"
                        }}>
                        <label htmlFor="">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                    </div>

                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "20px",
                            padding: "20px",

                        }}>
                        <button className="btn btn-success" type="submit">Login</button>
                    </div>
                    <br />
                    <hr
                        style={{
                            width: "80%", // Adjust width (e.g., 50% of parent width)
                            height: "2px", // Controls thickness
                            backgroundColor: "black", // Set color
                            border: "none", // Removes default border
                            margin: "10px auto", // Centers the <hr>
                        }}
                    />





                </div>

            </div>
        </div>
    )
}

export default Adlogin