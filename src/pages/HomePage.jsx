import { useContext } from "react";
import { useState, useEffect } from "react";
import EachFlight from "../components/EachFlight";
import EachFlightFlex from "../components/EachFlightFlex";
import FlightContext from "../contexts/flightContext";
import "./../styles/flight.css";

function HomePage() {
    const { getAllFlightsOnSpecifiedParams, getAllCities, getAllAirlines } =
        useContext(FlightContext);
    const [flights, setFlights] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const [sourceCities, setSourceCities] = useState([]);
    const [destinationCities, setDestinationCities] = useState([]);
    const [sourceLoc, setSourceLoc] = useState("");
    const [destinationLoc, setDestinationLoc] = useState("");
    const [sourceTime, setSourceTime] = useState(null);
    const [airlineName, setAirlineName] = useState("");

    useEffect(() => {
        if (sourceLoc.length > 0) {
            console.log("Hello there");
            getAllCities(sourceLoc).then((res) => {
                setSourceCities(res);
            });
        } else {
            setSourceCities([]);
        }
    }, [sourceLoc]);

    useEffect(() => {
        if (destinationLoc.length > 0) {
            getAllCities(destinationLoc).then((res) => {
                setDestinationCities(res);
            });
        } else {
            setDestinationCities([]);
        }
    }, [destinationLoc]);

    useEffect(() => {
        if (airlineName.length > 0) {
            getAllAirlines(airlineName).then((res) => {
                setAirlines(res);
            });
        } else {
            setAirlines([]);
        }
    }, [airlineName]);

    const handleChangeSearchCity = (e) => {
        e.preventDefault();
        if (e.target.id === "sourceLoc") {
            setSourceLoc(e.target.value);
        } else if (e.target.id === "destinationLoc") {
            setDestinationLoc(e.target.value);
        } else if (e.target.id === "name") {
            setAirlineName(e.target.value);
        }
    };

    const handleChangeSourceTime = (e) => {
        e.preventDefault();
        setSourceTime(e.target.value);
    };

    const handleFetchAllFlights = (e) => {
        e.preventDefault();
        if (sourceLoc.length > 0 && destinationLoc.length > 0) {
            getAllFlightsOnSpecifiedParams(
                sourceTime,
                sourceLoc,
                destinationLoc,
                airlineName
            ).then((res) => {
                setFlights(res);
            });
        }
    };

    return (
        <>
            <div className="flights-search-bar-container">
                <div className="flights-search-bar">
                    <div className="flights-search-bar-field">
                        <label className="flights-search-bar-field-label">
                            From
                        </label>
                        <input
                            type="text"
                            id="sourceLoc"
                            className="flights-search-bar-field-input"
                            onChange={handleChangeSearchCity}
                            value={sourceLoc}
                            required={true}
                        />
                        <select
                            className="flightflights-search-bar-field-select"
                            onChange={(e) => {
                                e.preventDefault();
                                setSourceLoc(e.target.value);
                            }}
                        >
                            <option>Select your starting point</option>
                            {sourceCities.length > 0 &&
                                sourceCities.map((city, index) => {
                                    return (
                                        <option
                                            className="flightflights-search-bar-field-select-option"
                                            key={index}
                                        >
                                            {city}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>

                    <div className="flights-search-bar-field">
                        <label className="flights-search-bar-field-label">
                            To
                        </label>
                        <input
                            type="text"
                            id="destinationLoc"
                            className="flights-search-bar-field-input"
                            onChange={handleChangeSearchCity}
                            value={destinationLoc}
                            required={true}
                        />
                        <select
                            className="flightflights-search-bar-field-select"
                            onChange={(e) => {
                                e.preventDefault();
                                setDestinationLoc(e.target.value);
                            }}
                        >
                            <option>Select your starting point</option>
                            {destinationCities.length > 0 &&
                                destinationCities.map((city, index) => {
                                    return (
                                        <option
                                            className="flightflights-search-bar-field-select-option"
                                            key={index}
                                        >
                                            {city}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>

                <div className="flight-search-bar-date-submit">
                    <div className="flights-search-bar-field">
                        <label className="flights-search-bar-field-label">
                            Airline
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="flights-search-bar-field-input"
                            onChange={handleChangeSearchCity}
                            value={airlineName}
                            required={true}
                        />
                        <select
                            className="flightflights-search-bar-field-select"
                            onChange={(e) => {
                                e.preventDefault();
                                setAirlineName(e.target.value);
                            }}
                        >
                            <option>Choose your airline</option>
                            {airlines.length > 0 &&
                                airlines.map((airline, index) => {
                                    return (
                                        <option
                                            className="flightflights-search-bar-field-select-option"
                                            key={index}
                                        >
                                            {airline}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="flights-search-bar-field">
                        <label className="flights-search-bar-field-label">
                            Date
                        </label>
                        <input
                            type="date"
                            id="sourceTime"
                            className="flights-search-bar-field-date"
                            onChange={handleChangeSourceTime}
                            required={true}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleFetchAllFlights}
                >
                    Search
                </button>
            </div>

            <table className="all-flights">
                <tbody>
                    <tr>
                        <th className="all-flights-heading">Airline</th>
                        <th className="all-flights-heading">Source</th>
                        <th className="all-flights-heading">Destination</th>
                        <th className="all-flights-heading">Departure</th>
                        <th className="all-flights-heading">Arrival</th>
                        <th className="all-flights-heading">Price</th>
                        <th className="all-flights-heading">Action</th>
                    </tr>
                    {flights.length > 0 ? (
                        flights.map((flight, index) => {
                            return (
                                <EachFlight flight={flight} key={flight._id} />
                            );
                        })
                    ) : (
                        <tr>
                            <td className="each-flight-data">
                                No Flights to show so far
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="all-flights all-flights-flex">
                {flights.length > 0 ? (
                    flights.map((flight, index) => {
                        return (
                            <EachFlightFlex flight={flight} key={flight._id} />
                        );
                    })
                ) : (
                    <p>No Flights to show so far</p>
                )}
            </div>
        </>
    );
}

export default HomePage;
