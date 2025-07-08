import * as React from 'react';

import _isEqual from 'lodash/isEqual';

import type {AccordionProps, AccordionValue} from './Accordion';
import {updateAccordionItemsApi} from './utils';

interface AccordionProviderProps<Multiple extends boolean>
    extends Required<
        Omit<AccordionProps<Multiple>, 'qa' | 'className' | 'value' | 'defaultValue' | 'multiple'>
    > {
    multiple: Multiple;
    value: AccordionValue<Multiple>;
    defaultValue: AccordionValue<Multiple>;
    onUpdate: (value: AccordionValue<Multiple>) => void;
    controlled: boolean;
}

const AccordionAttributesContext = React.createContext<
    | Required<
          Omit<
              AccordionProps<boolean>,
              'defaultValue' | 'className' | 'children' | 'onUpdate' | 'qa' | 'value'
          >
      >
    | undefined
>(undefined);

const AccordionExpandedContext = React.createContext<{
    items: AccordionValue<boolean>;
    updateItems: (value: AccordionItemValue) => void;
}>({items: undefined, updateItems: () => {}});

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
        controlled,
    } = props;

    const [items, setItems] = React.useState<AccordionValue<Multiple>>(
        value ??
            defaultValue ??
            (multiple
                ? ([] as string[] as AccordionValue<Multiple>)
                : (undefined as AccordionValue<Multiple>)),
    );

    React.useEffect(() => {
        if (controlled) {
            setItems((prev) => {
                if (!_isEqual(prev, value)) {
                    onUpdate(value);
                }

                return value;
            });
        }
    }, [value, controlled, onUpdate]);

    const updateItems = (itemValue: string) => {
        if (controlled) {
            return;
        }
        const updater = updateAccordionItemsApi<Multiple>(itemValue, onUpdate);

        if (multiple) {
            setItems(updater.multipleMode);
            return;
        }
        setItems(updater.singleMode);
    };

    return (
        <AccordionAttributesContext.Provider
            value={{ariaLevel, arrowPosition, size, view, multiple}}
        >
            <AccordionExpandedContext.Provider value={{items, updateItems}}>
                {children}
            </AccordionExpandedContext.Provider>
        </AccordionAttributesContext.Provider>
    );
}

export function useAccordionAttributes() {
    const state = React.useContext(AccordionAttributesContext);

    return state;
}

export function useAccordionItems() {
    const {items, updateItems} = React.useContext(AccordionExpandedContext);

    return {items, updateItems} as const;
}
