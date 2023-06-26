import { createContext, useState } from "react";


// the actual value I want to access/store - pass the default value
export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null,
});

// the component that we wrap around other components that should have access to this context
export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = { currentUser, setCurrentUser };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


