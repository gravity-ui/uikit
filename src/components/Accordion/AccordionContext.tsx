import * as React from 'react';

import {useControlledState} from '../../../src/hooks';

import type {AccordionProps, AccordionValue} from './types';

interface AccordionProviderProps<Multiple extends boolean>
    extends Required<
        Omit<
            AccordionProps<Multiple>,
            'qa' | 'className' | 'value' | 'defaultValue' | 'multiple' | 'ariaLabel'
        >
    > {
    multiple: Multiple;
    value: AccordionValue<Multiple>;
    defaultValue: AccordionValue<Multiple>;
    onUpdate: (value: AccordionValue<Multiple>) => void;
}

interface AccordionSummaryRef {
    element: HTMLButtonElement;
    disabled: boolean;
}

const AccordionContext = React.createContext<
    Required<
        Omit<
            AccordionProps<boolean>,
            'defaultValue' | 'className' | 'children' | 'onUpdate' | 'qa' | 'value' | 'ariaLabel'
        > & {
            items: AccordionValue<boolean>;
            updateItems: (value: AccordionItemValue) => void;
            registerSummary: (id: string, ref: AccordionSummaryRef) => void;
            unregisterSummary: (id: string) => void;
            getSummaryRefs: () => AccordionSummaryRef[];
        }
    >
>({
    size: 'm',
    view: 'solid',
    multiple: false,
    arrowPosition: 'start',
    ariaLevel: 3,
    items: null,
    updateItems: () => {},
    registerSummary: () => {},
    unregisterSummary: () => {},
    getSummaryRefs: () => [],
});

type AccordionItemValue = string;

export function AccordionProvider<Multiple extends boolean>(
    props: AccordionProviderProps<Multiple>,
) {
    const {
        ariaLevel,
        children,
        arrowPosition,
        size,
        view,
        multiple,
        defaultValue,
        onUpdate,
        value,
    } = props;

    const getDefaultValue = () => {
        if (defaultValue !== undefined) return defaultValue;
        return multiple ? ([] as string[]) : null;
    };

    const [items, setItems] = useControlledState<AccordionValue<Multiple>>(
        value as Exclude<AccordionValue<Multiple>, undefined> | undefined,
        getDefaultValue() as Exclude<AccordionValue<Multiple>, undefined>,
        onUpdate,
    );

    const summaryRefsRef = React.useRef<Map<string, AccordionSummaryRef>>(new Map());

    React.useEffect(() => {
        if (!Array.isArray(items) && multiple) {
            setItems((items ? [items] : []) as AccordionValue<Multiple>);
            return;
        }
        // This useEffect is used only for handling the case of switching the 'multiple' value from false to true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multiple]);

    const updateItems = (itemValue: string) => {
        if (multiple) {
            // can cast to string[] because of multiple
            const castedPrev = (items || []) as string[];
            let newValue: string[] = [];
            if (castedPrev.includes(itemValue)) {
                // clicked on expanded -> close
                newValue = castedPrev.filter((item: string) => item !== itemValue);
            } else {
                // clicked on non-expanded -> open
                newValue = [...castedPrev, itemValue];
            }
            const res = newValue as AccordionValue<Multiple>;
            setItems(res);
            return;
        }
        let newValue = itemValue as AccordionValue<Multiple>;
        // clicked on expanded -> close
        if (itemValue === items) {
            newValue = null as AccordionValue<Multiple>;
        }
        setItems(newValue);
    };

    const registerSummary = React.useCallback((id: string, ref: AccordionSummaryRef) => {
        summaryRefsRef.current.set(id, ref);
    }, []);

    const unregisterSummary = React.useCallback((id: string) => {
        summaryRefsRef.current.delete(id);
    }, []);

    const getSummaryRefs = React.useCallback((): AccordionSummaryRef[] => {
        return Array.from(summaryRefsRef.current.values()).filter((ref) => !ref.disabled);
    }, []);

    return (
        <AccordionContext.Provider
            value={{
                ariaLevel,
                arrowPosition,
                size,
                view,
                multiple,
                items,
                updateItems,
                registerSummary,
                unregisterSummary,
                getSummaryRefs,
            }}
        >
            {children}
        </AccordionContext.Provider>
    );
}

export function useAccordion() {
    const state = React.useContext(AccordionContext);

    return state;
}
