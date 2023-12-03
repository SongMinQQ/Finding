import React, { createContext, useState } from 'react';

const LoadingContext = createContext({
    loading: false,
    spinner: () => { },
});

const LoadingContextProvider = ({ children }) => {
    const [loading, setIsLoading] = useState(false);
    const spinner = {
        start: () => setIsLoading(true),
        stop: () => setIsLoading(false),
    };
    const value = { loading, spinner };
    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}
export { LoadingContext, LoadingContextProvider };