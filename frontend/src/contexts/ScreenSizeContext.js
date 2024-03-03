import React, { createContext, useContext, useState, useEffect } from 'react';

const ScreenSizeContext = createContext();

export const useScreenSize = () => useContext(ScreenSizeContext);

export const ScreenSizeProvider = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768; // Or any other breakpoint you choose

    return (
        <ScreenSizeContext.Provider value={{ isMobile }}>
            {children}
        </ScreenSizeContext.Provider>
    );
};
