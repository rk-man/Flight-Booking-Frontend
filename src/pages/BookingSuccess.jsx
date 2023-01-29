import React from "react";
import { Link } from "react-router-dom";
import "./../styles/booking.css";

function BookingSuccess() {
    return (
        <div className="booking-status">
            <h2>Your transaction is successfull</h2>
            <div className="btns-container">
                <Link to="/bookings" className="link">
                    <button className="btn btn-tertiary">Your Bookings</button>
                </Link>
                <Link to="/" className="link">
                    <button className="btn btn-tertiary">Home Page</button>
                </Link>
            </div>
        </div>
    );
}

export default BookingSuccess;
