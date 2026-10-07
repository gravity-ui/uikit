'use client';

import * as React from 'react';

import {MobileContext} from './MobileContext';
import type {History, Location, MobileContextProps} from './MobileContext';
import {Platform, rootMobileClassName} from './constants';

function useHistoryMock(): History {
    return {action: '', replace() {}, push() {}, goBack() {}};
}

function useLocationMock(): Location {
    return {pathname: '', search: '', hash: ''};
}

export interface MobileProviderProps {
    children?: React.ReactNode;
    mobile?: boolean;
    platform?: Platform;
    // Support history v4 and v5
    useHistory?: () => Omit<History, 'goBack'> & {back?: () => void; goBack?: () => void};
    useLocation?: () => Location;
}

export function MobileProvider({
    mobile = false,
    platform = Platform.BROWSER,
    useHistory = useHistoryMock,
    useLocation = useLocationMock,
    children,
}: MobileProviderProps) {
    const useHistoryFunction: MobileContextProps['useHistory'] = React.useCallback(
        function useHistoryFunction() {
            const {goBack, back, ...props} = useHistory();
            let goBackFunction;
            if (typeof goBack === 'function') {
                goBackFunction = goBack;
            } else if (typeof back === 'function') {
                goBackFunction = back;
            } else {
                goBackFunction = () => {};
            }
            return {
                ...props,
                goBack: goBackFunction,
            };
        },
        [useHistory],
    );

    React.useEffect(() => {
        document.body.classList.toggle(rootMobileClassName, mobile);
    }, [rootMobileClassName, mobile]);

    const contextValue: MobileContextProps = React.useMemo(() => {
        return {
            mobile,
            platform,
            useLocation,
            useHistory: useHistoryFunction,
        };
    }, [mobile, platform, useLocation, useHistoryFunction]);

    return <MobileContext.Provider value={contextValue}>{children}</MobileContext.Provider>;
}
