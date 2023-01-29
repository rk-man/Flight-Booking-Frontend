import React from "react";
import { convertDateToString } from "../helpers";

function EachBooking({ booking }) {
    return (
        <div className="each-booking">
            <div className="each-booking-sub-data">
                <div className="each-booking-sub-data-each">
                    <p>From</p>
                    <p>{booking.flight.sourceLoc}</p>
                </div>
                <div className="each-booking-sub-data-each">
                    <p>To</p>
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
                    <p>Departure</p>
                    <p>{convertDateToString(booking.flight.sourceTime)}</p>
                </div>
                <div className="each-booking-sub-data-each">
                    <p>Arrival</p>
                    <p>{convertDateToString(booking.flight.arrivalTime)}</p>
                </div>
            </div>
        </div>
    );
}

export default EachBooking;
