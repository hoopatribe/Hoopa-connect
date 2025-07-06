import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('user'); // default role
  const [user, setUser] = useState(null);           // full user object

  return (
    <UserContext.Provider value={{ userRole, setUserRole, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
