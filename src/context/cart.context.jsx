import { createContext, useEffect, useState } from 'react';

// function to see if product is already in cartItems and increase quantity else add new product to cartItem
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id);
    
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
    return [ ...cartItems, { ...productToAdd, quantity: 1}];
}




// the actual value I want to access/store - pass the default value
export const CartContext = createContext({
    isCartOpen: false, 
    setIsCartOpen: () => {},
    cartItems: [],
    setCartItems: () => {},
    addItemToCart: () => {},
    cartItemCount: 0,
});

// the component that we wrap around other components that should have access to this context
export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    useEffect(() => {
        const cartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartItemCount(cartCount);
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

