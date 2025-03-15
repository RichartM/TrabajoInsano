import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const registerUser = (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    const loginUser = (email, password) => {
        const user = users.find((u) => u.email === email && u.pass === password);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    return (
        <UserContext.Provider value={{ users, registerUser, loginUser, currentUser }}>
            {children}
        </UserContext.Provider>
    );
};
