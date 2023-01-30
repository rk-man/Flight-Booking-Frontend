import React from "react";
import "./../styles/flight.css";
import "./../styles/booking.css";
import { convertDateToString } from "../helpers";
import { Link, useNavigate } from "react-router-dom";
import { getRandomTicketFare } from "../helpers";
import { useState } from "react";
import { useEffect } from "react";

function EachFlightFlex({ flight }) {
    const navigate = useNavigate();

    const [ticketFare, setTicketFare] = useState(0);

    useEffect(() => {
        setTicketFare(getRandomTicketFare());
    }, []);

    return (
        <div className="each-flight each-flight-flex">
            <div className="each-booking-sub-data ">
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">
                        Airline
                    </p>
                    <p>{flight.name}</p>
                </div>
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">From</p>
                    <p>{flight.sourceLoc}</p>
                </div>
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">To</p>
                    <p>{flight.destinationLoc}</p>
                </div>
            </div>

            <div className="each-booking-sub-data each-booking-sub-data-flex">
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">
                        Departure
                    </p>
                    <p>{convertDateToString(flight.sourceTime)}</p>
                </div>
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">
                        Arrival
                    </p>
                    <p>{convertDateToString(flight.arrivalTime)}</p>
                </div>
            </div>
            <div className="each-booking-sub-data each-booking-sub-data-ticket-book">
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">
                        Ticket Fare
                    </p>
                    <p className="each-flight-ticket-fare"> Rs. {ticketFare}</p>
                </div>
                <p
                    className="each-flight-data-book"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/flights/${flight._id}/book-tickets`, {
                            state: { ticketFare },
                        });
                    }}
                >
                    book
                </p>
            </div>
        </div>
    );
}

export default EachFlightFlex;
