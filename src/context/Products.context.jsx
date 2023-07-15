import { createContext, useState, useEffect } from "react";

import PRODUCTS from '../shop-data.json';

// the actual value I want to access/store - pass the default value
export const ProductsContext = createContext({
    products: [], 
    setProducts: () => null,
});

// the component that we wrap around other components that should have access to this context
export const ProductsProvider = ({ children }) => {
    const [ products, setProducts ] = useState(PRODUCTS);
    const value = { products };
 
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
 