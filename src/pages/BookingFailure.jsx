import React from "react";
import { Link } from "react-router-dom";
import "./../styles/booking.css";

function BookingFailure() {
    return (
        <div className="booking-status">
            <h2>Your transaction is unsuccessfull</h2>
            <Link to="/" className="link">
                <button className="btn btn-tertiary">Home Page</button>
            </Link>
        </div>
    );
}

export default BookingFailure;
