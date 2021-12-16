import React from 'react';

export interface ThemeValueContextProps {
    themeValue: string;
}

const initialValue: ThemeValueContextProps = {
    themeValue: '',
};

export const ThemeValueContext = React.createContext(initialValue);
