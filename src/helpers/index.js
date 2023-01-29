import Cookies from "js-cookie";

export const setCookie = (cookieName, token) => {
    Cookies.set(cookieName, token, {
        expires: 30,
        secure: false,
        sameSite: "strict",
        path: "/",
    });
};

export const getCookie = (cookieName) => {
    return Cookies.get(cookieName);
};

export const removeCookie = (cookieName) => {
    Cookies.remove(cookieName);
};

export const convertDateToString = (date) => {
    return new Date(date).toLocaleString("en-us", {
        timeStyle: "short",
        dateStyle: "long",
    });
};

export const changeDateToString = (date) => {
    return new Date(date).toLocaleString("en-us", {
        dateStyle: "long",
    });
};

export const getRandomTicketFare = (end = 80000, start = 10000) => {
    return Math.floor(Math.random() * (end - start) + start);
};
