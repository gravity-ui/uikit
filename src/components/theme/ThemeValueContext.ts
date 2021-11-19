import React from 'react';

export interface ThemeValueContextProps {
    themeValue: string;
}

export const initialValue: ThemeValueContextProps = {
    themeValue: '',
};

export const ThemeValueContext = React.createContext(initialValue);
