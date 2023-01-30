import React from "react";
import { convertDateToString } from "../helpers";

function EachBooking({ booking }) {
    return (
        <div className="each-booking">
            <p className="each-booking-ticket-no">
                Ticket No : {booking._id.slice(0, 14)}
            </p>

            <div className="each-booking-sub-data">
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">
                        Airline
                    </p>
                    <p>{booking.flight.name}</p>
                </div>
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">From</p>
                    <p>{booking.flight.sourceLoc}</p>
                </div>
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">To</p>
                    <p>{booking.flight.destinationLoc}</p>
                </div>
            </div>

            <div className="each-booking-passengers">
                <h3>Passengers</h3>
                {booking.passengers.length > 0 &&
                    booking.passengers.map((p, index) => {
                        return (
                            <div
                                className="each-booking-passengers-each"
                                key={index}
                            >
                                <p>{p.name}</p>
                                <p>{p.age}</p>
                            </div>
                        );
                    })}
            </div>

            <div className="each-booking-sub-data">
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">
                        Departure
                    </p>
                    <p>{convertDateToString(booking.flight.sourceTime)}</p>
                </div>
                <div className="each-booking-sub-data-each">
                    <p className="each-booking-sub-data-each-heading">
                        Arrival
                    </p>
                    <p>{convertDateToString(booking.flight.arrivalTime)}</p>
                </div>
            </div>
        </div>
    );
}

export default EachBooking;
