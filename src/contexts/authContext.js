import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { setCookie, getCookie, removeCookie } from "./../helpers";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState({
        user: null,
        success: false,
        error: false,
        message: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        getMe();
    }, []);

    const login = async (userData) => {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/users/login`,
                userData
            );
            setAuthUser((prev) => {
                return {
                    ...prev,
                    user: res.data.data.user,
                    success: true,
                };
            });

            setCookie("flight_cookie", res.data.data.token);
        } catch (err) {
            setAuthUser((prev) => {
                return {
                    ...prev,
                    user: null,
                    success: false,
                    error: true,
                    message: "incorrect username or password",
                };
            });
        }
    };
    const updateUser = async (userData) => {
        try {
            const token = getCookie("flight_cookie");
            const res = await axios.patch(
                `${BACKEND_URL}/api/v1/users/update`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAuthUser((prev) => {
                return {
                    ...prev,
                    user: res.data.user,
                    success: true,
                };
            });
        } catch (err) {
            setAuthUser((prev) => {
                return {
                    ...prev,
                    success: false,
                    error: true,
                    message: "Couldn't update user",
                };
            });
        }
    };

    const register = async (userData) => {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/users/register`,
                userData
            );
            setAuthUser((prev) => {
                return {
                    ...prev,
                    user: res.data.data.user,
                    success: true,
                };
            });

            setCookie("flight_cookie", res.data.data.token);
        } catch (err) {
            setAuthUser((prev) => {
                return {
                    ...prev,
                    user: null,
                    success: false,
                    error: true,
                    message: err.response.data
                        ? err.response.data.message
                        : "Something went wrong",
                };
            });
        }
    };

    const getMe = async () => {
        try {
            const token = getCookie("flight_cookie");
            const res = await axios.get(`${BACKEND_URL}/api/v1/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAuthUser((prev) => {
                return {
                    ...prev,
                    user: res.data.user,
                };
            });
        } catch (err) {
            console.log(err);
            navigate("/auth/login");
        }
    };

    const logout = () => {
        removeCookie("flight_cookie");
        setAuthUser({
            user: null,
            success: false,
            error: false,
            message: "",
        });
        navigate("/auth/login");
    };

    const resetAuth = () => {
        setAuthUser((prev) => {
            return {
                ...prev,
                success: false,
                error: false,
                message: "",
            };
        });
    };

    return (
        <AuthContext.Provider
            value={{ authUser, login, resetAuth, logout, register, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
