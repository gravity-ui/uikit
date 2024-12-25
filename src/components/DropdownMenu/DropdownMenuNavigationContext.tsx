'use client';

import * as React from 'react';

export type DropdownMenuNavigationContextType = {
    activeMenuPath: number[];
    setActiveMenuPath: (path: number[]) => void;
    anchorRef: React.RefObject<HTMLDivElement>;
};

const rootMenuPath: number[] = [];

export const DropdownMenuNavigationContext = React.createContext<DropdownMenuNavigationContextType>(
    {
        activeMenuPath: rootMenuPath,
        setActiveMenuPath: () => {},
        anchorRef: {current: null},
    },
);

export type DropdownMenuNavigationContextProviderProps = {
    anchorRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    disabled: boolean;
};

export const DropdownMenuNavigationContextProvider = ({
    anchorRef,
    children,
    disabled,
}: DropdownMenuNavigationContextProviderProps) => {
    const [activeMenuPath, setActiveMenuPath] = React.useState<number[]>(rootMenuPath);

    React.useEffect(() => {
        if (disabled) {
            setActiveMenuPath(rootMenuPath);
        }
    }, [disabled]);

    const contextValue = React.useMemo(
        () => ({
            activeMenuPath,
            setActiveMenuPath,
            anchorRef,
        }),
        [activeMenuPath, anchorRef],
    );

    return (
        <DropdownMenuNavigationContext.Provider value={contextValue}>
            {children}
        </DropdownMenuNavigationContext.Provider>
    );
};
