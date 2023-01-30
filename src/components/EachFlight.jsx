import React from "react";
import "./../styles/flight.css";
import { convertDateToString } from "../helpers";
import { Link, useNavigate } from "react-router-dom";
import { getRandomTicketFare } from "../helpers";
import { useState } from "react";
import { useEffect } from "react";

function EachFlight({ flight }) {
    const navigate = useNavigate();

    const [ticketFare, setTicketFare] = useState(0);

    useEffect(() => {
        setTicketFare(getRandomTicketFare());
    }, []);

    return (
        <tr className="each-flight">
            <td className="each-flight-data">{flight.name}</td>
            <td className="each-flight-data">{flight.sourceLoc}</td>
            <td className="each-flight-data">{flight.destinationLoc}</td>
            <td className="each-flight-data">
                {convertDateToString(flight.sourceTime)}
            </td>
            <td className="each-flight-data">
                {convertDateToString(flight.arrivalTime)}
            </td>
            <td className="each-flight-data" style={{ fontWeight: "600" }}>
                Rs. {ticketFare}
            </td>
            <td
                className="each-flight-data-book"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(`/flights/${flight._id}/book-tickets`, {
                        state: { ticketFare },
                    });
                }}
            >
                book
            </td>
        </tr>
    );
}

export default EachFlight;
