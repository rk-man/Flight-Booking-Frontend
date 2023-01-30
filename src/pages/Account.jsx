import React, { useContext, useState, useEffect } from "react";
import "./../styles/form.css";
import AuthContext from "./../contexts/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Account() {
    const { updateUser, authUser, resetAuth } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        username: authUser.user ? authUser.user.username : "",
        email: authUser.user ? authUser.user.email : "",
        name: authUser.user ? authUser.user.name : "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (authUser.user && authUser.success) {
            toast.success("Successfully updated");
            navigate("/");
            resetAuth();
        } else if (authUser.error && authUser.message) {
            toast.error(authUser.message);
            setUserData({ username: "", password: "", email: "" });
            resetAuth();
        }
    }, [
        authUser.success,
        authUser.message,
        authUser.error,
        authUser.user,
        resetAuth,
        navigate,
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(userData);
    };
    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Update User here</h2>
                <div className="form-field">
                    <label htmlFor="username" className="form-field-label">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-field-input"
                        placeholder="eg: robert"
                        onChange={(e) => {
                            e.preventDefault();
                            setUserData((prev) => {
                                return {
                                    ...prev,
                                    username: e.target.value,
                                };
                            });
                        }}
                        value={userData.username}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="email" className="form-field-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-field-input"
                        placeholder="eg: robert"
                        onChange={(e) => {
                            e.preventDefault();
                            setUserData((prev) => {
                                return {
                                    ...prev,
                                    email: e.target.value,
                                };
                            });
                        }}
                        value={userData.email}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="name" className="form-field-label">
                        Name
                    </label>
                    <input
                        type="name"
                        id="name"
                        name="name"
                        className="form-field-input"
                        placeholder="eg: robert"
                        onChange={(e) => {
                            e.preventDefault();
                            setUserData((prev) => {
                                return {
                                    ...prev,
                                    name: e.target.value,
                                };
                            });
                        }}
                        value={userData.name}
                    />
                </div>

                <div className="btns-container">
                    <button className="btn btn-primary" type="submit">
                        Save Changes
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            setUserData({
                                username: authUser.user
                                    ? authUser.user.username
                                    : "",
                                email: authUser.user ? authUser.user.email : "",
                                name: authUser.user ? authUser.user.name : "",
                            });
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Account;
