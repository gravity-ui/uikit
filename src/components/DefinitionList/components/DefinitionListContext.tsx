'use client';
import * as React from 'react';

import type {DefinitionListProps} from '../types';

interface DefinitionListProviderProps
    extends Pick<DefinitionListProps, 'direction' | 'contentMaxWidth' | 'nameMaxWidth'> {
    children?: React.ReactNode;
}

export const DefinitionListAttributesContext = React.createContext<
    | (Pick<DefinitionListProps, 'direction'> & {
          keyStyle?: React.CSSProperties;
          valueStyle?: React.CSSProperties;
      })
    | undefined
>(undefined);

export function DefinitionListProvider({
    direction,
    contentMaxWidth,
    nameMaxWidth,
    children,
}: DefinitionListProviderProps) {
    const keyStyle = nameMaxWidth ? {maxWidth: nameMaxWidth, width: nameMaxWidth} : {};

    const valueStyle =
        typeof contentMaxWidth === 'number'
            ? {width: contentMaxWidth, maxWidth: contentMaxWidth}
            : {};

    return (
        <DefinitionListAttributesContext.Provider
            value={{
                keyStyle,
                valueStyle,
                direction,
            }}
        >
            {children}
        </DefinitionListAttributesContext.Provider>
    );
}

export function useDefinitionListAttributes() {
    const state = React.useContext(DefinitionListAttributesContext);

    if (state === undefined) {
        throw new Error('useDefinitionListAttributes must be used within DefinitionListProvider');
    }

    return state;
}
