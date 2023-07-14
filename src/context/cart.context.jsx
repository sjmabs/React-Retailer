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

// function to see if product is already in cartItems and decrease quantity else return cartItems
const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id);
    
    if (existingCartItem) {
        if (productToRemove.quantity > 1) {
            return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? 
            { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        }
        else {
            return clearCartItem(cartItems, productToRemove);
        }
    }
    return [ ...cartItems ];
}

// function to clear cart item
const clearCartItem = (cartItems, productToClear) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToClear.id);
    
    if (existingCartItem) {
        cartItems = cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
    }
    return [ ...cartItems ];
}


// the actual value I want to access/store - pass the default value
export const CartContext = createContext({
    isCartOpen: false, 
    setIsCartOpen: () => {},
    cartItems: [],
    setCartItems: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
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

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear));
    }


    useEffect(() => {
        const cartCount = cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
        setCartItemCount(cartCount);
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartItemCount };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

