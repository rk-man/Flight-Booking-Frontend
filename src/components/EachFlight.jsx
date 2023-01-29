import React from "react";
import "./../styles/flight.css";
import { convertDateToString } from "../helpers";
import { Link, useNavigate } from "react-router-dom";

function EachFlight({ flight }) {
    const navigate = useNavigate();

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

            <td
                className="each-flight-data-book"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(`/flights/${flight._id}/book-tickets`);
                }}
            >
                book
            </td>
        </tr>
    );
}

export default EachFlight;
