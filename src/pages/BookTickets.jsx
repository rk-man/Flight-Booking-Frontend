import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import FlightContext from "../contexts/flightContext";
import "./../styles/form.css";
import "./../styles/passenger.css";
import { getRandomTicketFare } from "../helpers";

function BookTickets() {
    const { getFlight, createBooking } = useContext(FlightContext);
    const { id } = useParams();
    const [flight, setFlight] = useState(null);
    const [passengers, setPassengers] = useState([]);
    const [passenger, setPassenger] = useState({
        name: "",
        age: "",
    });

    const [ticketFare, setTicketFare] = useState(0);

    useEffect(() => {
        setTicketFare(getRandomTicketFare());
    }, []);

    useEffect(() => {
        if (id) {
            getFlight(id).then((res) => {
                setFlight(res);
            });
        }
    }, [id]);

    const handleChangePassenger = (e) => {
        e.preventDefault();
        setPassenger((prev) => {
            return {
                ...prev,
                [`${e.target.id}`]: e.target.value,
            };
        });
    };

    const handleAddPassenger = (e) => {
        e.preventDefault();
        if (passenger.name.length > 2 && passenger.age > 0)
            setPassengers((prev) => {
                return [...prev, passenger];
            });
        setPassenger({
            name: "",
            age: "",
        });
    };

    const handleSubmitTicketBooking = (e) => {
        e.preventDefault();
        console.log(passengers.length);
        if (passengers.length > 0) {
            createBooking({
                passengers,
                totalPrice: ticketFare * passengers.length,
                flight: flight._id,
            });
        }
    };

    return (
        <div className="form-wrapper">
            {flight && (
                <form className="form" onSubmit={handleSubmitTicketBooking}>
                    <div className="form-field">
                        <label className="form-field-label">Airline</label>
                        <input
                            type="text"
                            className="form-field-input"
                            readOnly={true}
                            value={flight.name}
                        />
                    </div>
                    <div className="form-field">
                        <label className="form-field-label">From</label>
                        <input
                            type="text"
                            className="form-field-input"
                            readOnly={true}
                            value={flight.sourceLoc}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-field-label">To</label>
                        <input
                            type="text"
                            className="form-field-input"
                            readOnly={true}
                            value={flight.destinationLoc}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-field-label">
                            Departure Date
                        </label>
                        <p>
                            {new Date(flight.sourceTime).toLocaleString(
                                "en-us",
                                {
                                    dateStyle: "long",
                                    timeStyle: "short",
                                }
                            )}
                        </p>
                    </div>

                    <div className="form-field">
                        <label className="form-field-label">Ticket Fare</label>
                        <p>Rs. {ticketFare}</p>
                    </div>

                    <div className="form-field">
                        <label className="form-field-label">Name</label>
                        <input
                            type="text"
                            className="form-field-input"
                            id="name"
                            placeholder="Enter passenger's name"
                            onChange={handleChangePassenger}
                            value={passenger.name}
                        />
                    </div>
                    <div className="form-field">
                        <label className="form-field-label">Age</label>
                        <input
                            type="number"
                            className="form-field-input"
                            id="age"
                            placeholder="Enter passenger's age"
                            onChange={handleChangePassenger}
                            value={passenger.age}
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleAddPassenger}
                    >
                        Add Passenger
                    </button>

                    <div className="all-passengers">
                        <h3>Passengers</h3>
                        {passengers.length > 0 ? (
                            passengers.map((p, index) => {
                                return (
                                    <div className="each-passenger" key={index}>
                                        <p>{p.name}</p>
                                        <p>{p.age}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No passengers</p>
                        )}
                    </div>

                    <div className="form-field">
                        <label className="form-field-label">Total Fare</label>
                        <p>Rs. {passengers.length * ticketFare}</p>
                    </div>

                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={handleSubmitTicketBooking}
                    >
                        Book Tickets
                    </button>
                </form>
            )}
        </div>
    );
}

export default BookTickets;
