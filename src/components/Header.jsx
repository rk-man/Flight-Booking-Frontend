import { useContext } from "react";
import { Link } from "react-router-dom";
import "./../styles/header.css";
import AuthContext from "./../contexts/authContext";

function Header() {
    const { authUser, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <Link className="link" to="/">
                <h3>Flight Booking App</h3>
            </Link>

            <nav className="header-nav">
                {!authUser.user && (
                    <Link to="auth/login" className="link">
                        <button className="btn btn-primary">
                            Sign in / register
                        </button>
                    </Link>
                )}

                {authUser.user && (
                    <>
                        <Link to="/account" className="link header-nav-link">
                            <p>Account</p>
                        </Link>

                        <Link to="/bookings" className="link header-nav-link">
                            <p>Bookings</p>
                        </Link>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
