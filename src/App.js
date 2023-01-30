import Header from "./components/Header";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/authContext";
import HomePage from "./pages/HomePage";
import { FlightProvider } from "./contexts/flightContext";
import BookingSuccess from "./pages/BookingSuccess";
import BookingFailure from "./pages/BookingFailure";
import BookTickets from "./pages/BookTickets";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";

function App() {
    return (
        <Router>
            <AuthProvider>
                <FlightProvider>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/auth/login" element={<LoginPage />} />
                            <Route
                                path="/auth/register"
                                element={<RegisterPage />}
                            />
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/bookings/success"
                                element={<BookingSuccess />}
                            />
                            <Route
                                path="/bookings/fail"
                                element={<BookingFailure />}
                            />
                            <Route
                                path="/flights/:id/book-tickets"
                                element={<BookTickets />}
                            />

                            <Route path="/account" element={<Account />} />

                            <Route path="/bookings" element={<Bookings />} />
                        </Routes>
                    </main>
                </FlightProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
