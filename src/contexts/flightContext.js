import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY, API_HOST, BACKEND_URL } from "../config";
import { getCookie } from "./../helpers";

const FlightContext = createContext();

export function FlightProvider({ children }) {
    const [authFlight, setAuthFlight] = useState({
        flight: null,
        success: false,
        error: false,
        message: "",
    });
    const navigate = useNavigate();

    const getAllFlightsOnSpecifiedParams = async (
        sourceTime,
        sourceLoc,
        destinationLoc
    ) => {
        let flights = [];
        try {
            const token = getCookie("flight_cookie");
            const res = await axios.get(
                `${BACKEND_URL}/api/v1/flights?sourceTime=${sourceTime}&sourceLoc=${sourceLoc}&destinationLoc=${destinationLoc}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            flights = res.data.flights;
        } catch (err) {
            console.log(err);
        }

        return flights;
    };

    const getAllCities = async (search) => {
        let cities = [];
        try {
            const token = getCookie("flight_cookie");
            const res = await axios.get(
                `${BACKEND_URL}/api/v1/flights/all-cities?search=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            cities = res.data.flightCities;
        } catch (err) {
            console.log(err);
        }

        return cities;
    };

    const createBooking = async (bookingData) => {
        try {
            const token = getCookie("flight_cookie");
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/bookings/create-checkout-session`,
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.href = res.data.url;
        } catch (err) {
            console.log(err);
        }
    };

    const getFlight = async (id) => {
        let flight = null;
        try {
            const token = getCookie("flight_cookie");
            const res = await axios.get(`${BACKEND_URL}/api/v1/flights/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            flight = res.data.flight;
        } catch (err) {
            console.log(err);
        }

        return flight;
    };

    const getAllBookings = async () => {
        let bookings = [];
        try {
            const token = getCookie("flight_cookie");
            const res = await axios.get(`${BACKEND_URL}/api/v1/bookings`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            bookings = res.data.bookings;
        } catch (err) {
            console.log(err);
        }
        return bookings;
    };

    const resetFlight = () => {
        setAuthFlight((prev) => {
            return {
                flight: null,
                success: false,
                error: false,
                message: "",
            };
        });
    };

    return (
        <FlightContext.Provider
            value={{
                resetFlight,
                authFlight,
                getAllFlightsOnSpecifiedParams,
                getAllCities,
                createBooking,
                getFlight,
                getAllBookings,
            }}
        >
            {children}
        </FlightContext.Provider>
    );
}

export default FlightContext;
