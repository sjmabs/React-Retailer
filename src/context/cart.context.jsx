import { createContext, useState } from 'react';

// the actual value I want to access/store - pass the default value
export const CartContext = createContext({
    isCartOpen: false, 
    setIsCartOpen: () => {},
});

// the component that we wrap around other components that should have access to this context
export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const value = { isCartOpen, setIsCartOpen };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

