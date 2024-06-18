'use client';

import React from 'react';

import {useUniqId} from '../../hooks';

import type {DisclosureProps} from './Disclosure';

interface DisclosureProviderProps
    extends Required<Omit<DisclosureProps, 'className' | 'expanded' | 'qa'>> {
    expanded: DisclosureProps['expanded'];
}

export const DisclosureAttributesContext = React.createContext<
    | (Required<
          Omit<DisclosureProps, 'defaultExpanded' | 'className' | 'children' | 'onUpdate' | 'qa'>
      > & {
          expanded: boolean;
          ariaControls: string;
          ariaLabelledby: string;
      })
    | undefined
>(undefined);
export const DisclosureToggleContext = React.createContext<
    ((e: React.SyntheticEvent) => void) | undefined
>(undefined);

export function DisclosureProvider(props: DisclosureProviderProps) {
    const {
        size,
        disabled,
        defaultExpanded,
        arrowPosition,
        summary,
        keepMounted,
        onUpdate,
        expanded: controlledExpanded,
    } = props;
    const [expanded, setExpanded] = React.useState(() => Boolean(defaultExpanded));
    const controlledMode = controlledExpanded !== undefined;

    const handleToggle = () => {
        setExpanded((prev) => !prev);
        const newValue = controlledMode ? !controlledExpanded : !expanded;
        onUpdate(newValue);
    };

    const ariaControls = useUniqId();
    const ariaLabelledby = `disclosure${ariaControls}`;

    return (
        <DisclosureAttributesContext.Provider
            value={{
                size,
                disabled,
                summary,
                arrowPosition,
                keepMounted,
                expanded: controlledMode ? controlledExpanded : expanded,
                ariaControls,
                ariaLabelledby,
            }}
        >
            <DisclosureToggleContext.Provider value={handleToggle}>
                {props.children}
            </DisclosureToggleContext.Provider>
        </DisclosureAttributesContext.Provider>
    );
}

export function useDisclosureAttributes() {
    const state = React.useContext(DisclosureAttributesContext);

    if (state === undefined) {
        throw new Error('useDisclosureAttributes must be used within DisclosureProvider');
    }

    return state;
}

export function useToggleDisclosure() {
    const state = React.useContext(DisclosureToggleContext);

    if (state === undefined) {
        throw new Error('useToggleDisclosure must be used within DisclosureProvider');
    }

    return state;
}
