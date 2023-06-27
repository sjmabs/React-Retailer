import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import { onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";
// the actual value I want to access/store - pass the default value
export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null,
});

// the component that we wrap around other components that should have access to this context
export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = { currentUser, setCurrentUser };
 
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        
        return unsubscribe;
    }, []);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


