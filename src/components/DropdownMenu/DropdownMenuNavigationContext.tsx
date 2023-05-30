import React, {ReactNode, RefObject, createContext, useEffect, useMemo, useState} from 'react';

export type DropdownMenuNavigationContextType = {
    activeMenuPath: number[];
    setActiveMenuPath: (path: number[]) => void;
    anchorRef: RefObject<HTMLDivElement>;
};

const rootMenuPath: number[] = [];

export const DropdownMenuNavigationContext = createContext<DropdownMenuNavigationContextType>({
    activeMenuPath: rootMenuPath,
    setActiveMenuPath: () => {},
    anchorRef: {current: null},
});

export type DropdownMenuNavigationContextProviderProps = {
    anchorRef: RefObject<HTMLDivElement>;
    children: ReactNode;
    disabled: boolean;
};

export const DropdownMenuNavigationContextProvider = ({
    anchorRef,
    children,
    disabled,
}: DropdownMenuNavigationContextProviderProps) => {
    const [activeMenuPath, setActiveMenuPath] = useState<number[]>(rootMenuPath);

    useEffect(() => {
        if (disabled) {
            setActiveMenuPath(rootMenuPath);
        }
    }, [disabled]);

    const contextValue = useMemo(
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
