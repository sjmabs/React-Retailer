import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

import SHOP_DATA from '../shop-data.js';

// the actual value I want to access/store - pass the default value
export const CategoriesContext = createContext({
    catergoriesMap: {}, 
    setCatergoriesMap: () => {},
});

// the component that we wrap around other components that should have access to this context
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        };

        getCategoriesMap();
    }, [])

    // to import shop data once import addCollection again
    // useEffect(() => {
    //     console.log(SHOP_DATA)
    //   addCollectionAndDocuments('collections', SHOP_DATA);
    // }, []);
  
    const value = { categoriesMap };
    return (
      <CategoriesContext.Provider value={value}>
        {children}
      </CategoriesContext.Provider>
    );
  };
  





