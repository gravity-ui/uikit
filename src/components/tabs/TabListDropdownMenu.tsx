'use client';

import * as React from 'react';

import {
    useClick,
    useDismiss,
    useFloatingRootContext,
    useInteractions,
    useListNavigation,
    useRole,
} from '@floating-ui/react';
import type {UseInteractionsReturn} from '@floating-ui/react';

import {Button} from '../Button';
import {Popup} from '../Popup';

import {bTabListDropdownMenu} from './constants';
import i18n from './i18n';
import type {TabsDropdownMenuProps} from './types';

import './TabListDropdownMenu.scss';

interface MenuContext {
    isMenu: boolean;
    activeIndex: null | number;
    getItemProps: UseInteractionsReturn['getItemProps'];
    listItemsRef: {current: Array<HTMLElement | null>};
}

const menuContext = React.createContext<MenuContext>({
    isMenu: false,
    activeIndex: null as null | number,
    getItemProps: (props = {}) => props,
    listItemsRef: {current: []},
});

export function TabsDropdownMenu({children}: TabsDropdownMenuProps) {
    const [reference, setReference] = React.useState<HTMLButtonElement | null>(null);
    const [floating, setFloating] = React.useState<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [open, setOpen] = React.useState(false);

    const context = useFloatingRootContext({
        open,
        onOpenChange: setOpen,
        elements: {reference, floating},
    });

    const listItemsRef = React.useRef<Array<HTMLElement | null>>([]);

    const listNavigation = useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        onNavigate: setActiveIndex,
        loop: true,
    });

    const dismiss = useDismiss(context);
    const click = useClick(context);
    const role = useRole(context, {role: 'menu'});

    const interactions = [click, dismiss, listNavigation, role];
    const {getReferenceProps, getItemProps} = useInteractions(interactions);

    if (!React.Children.count(children)) {
        return null;
    }

    return (
        <div className={bTabListDropdownMenu({hidden: !React.Children.count(children)})}>
            <Button
                ref={setReference}
                {...getReferenceProps()}
                title={i18n('label_more')}
                aria-label={i18n('label_more')}
                size="s"
                view="flat"
                className={bTabListDropdownMenu('button')}
            >
                <Button.Icon>...</Button.Icon>
            </Button>

            <Popup
                floatingContext={context}
                floatingRef={setFloating}
                floatingInteractions={interactions}
                className={bTabListDropdownMenu('popup')}
                placement="bottom-end"
            >
                <menuContext.Provider
                    value={{isMenu: true, getItemProps, listItemsRef, activeIndex}}
                >
                    {children}
                </menuContext.Provider>
            </Popup>
        </div>
    );
}

export function useMenuContext() {
    return React.useContext(menuContext);
}
