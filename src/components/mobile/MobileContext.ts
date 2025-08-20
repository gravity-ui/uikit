'use client';
import * as React from 'react';

import {Platform} from './constants';

export interface History {
    action: 'PUSH' | 'POP' | 'REPLACE' | '';
    replace(location: Partial<Location>): void;
    push(location: Partial<Location>): void;
    goBack(): void;
}
export interface Location {
    pathname: string;
    search: string;
    hash: string;
}

export interface MobileContextProps {
    mobile: boolean;
    platform: Platform;
    useHistory: () => History;
    useLocation: () => Location;
}

const initialValue: MobileContextProps = {
    mobile: false,
    platform: Platform.BROWSER,
    useHistory: () => ({action: '', replace() {}, push() {}, goBack() {}}),
    useLocation: () => ({pathname: '', search: '', hash: ''}),
};

export const MobileContext = React.createContext(initialValue);
