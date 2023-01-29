import React from "react";
import { useContext } from "react";
import "./../styles/booking.css";
import FlightContext from "./../contexts/flightContext";
import { useState, useEffect } from "react";
import EachBooking from "./../components/EachBooking";

function Bookings() {
    const { getAllBookings } = useContext(FlightContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        getAllBookings().then((res) => {
            setBookings(res);
        });
    }, []);

    return (
        <div>
            <h3 style={{ marginBottom: "2rem" }}>Bookings</h3>
            <div className="all-bookings">
                {bookings.length > 0 ? (
                    bookings.map((b, index) => {
                        return <EachBooking booking={b} key={b._id} />;
                    })
                ) : (
                    <p>No Bookings so far</p>
                )}
            </div>
        </div>
    );
}

export default Bookings;
