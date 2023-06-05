import React from 'react';

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
    const [mobileValue, setMobile] = React.useState(mobile);
    const [platformValue, setPlatform] = React.useState(platform);

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

    document.body.classList.toggle(rootMobileClassName, mobileValue);

    const state: MobileContextProps = React.useMemo(() => {
        return {
            mobile: mobileValue,
            setMobile,
            platform: platformValue,
            setPlatform,
            useLocation,
            useHistory: useHistoryFunction,
        };
    }, [mobileValue, platformValue, useLocation, useHistoryFunction]);

    return <MobileContext.Provider value={state}>{children}</MobileContext.Provider>;
}
