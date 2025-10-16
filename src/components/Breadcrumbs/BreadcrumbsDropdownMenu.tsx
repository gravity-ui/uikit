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
import type {PopupPlacement} from '../Popup';

import i18n from './i18n';
import {b} from './utils';

interface DropdownMenuProps {
    children: React.ReactNode;
    disabled?: boolean;
    popupPlacement?: PopupPlacement;
    popupStyle?: 'staircase';
}

interface MenuContext {
    isMenu: boolean;
    activeIndex: null | number;
    getItemProps: UseInteractionsReturn['getItemProps'];
    listItemsRef: {current: Array<HTMLElement | null>};
    popupStyle: undefined | 'staircase';
}

const menuContext = React.createContext<MenuContext>({
    isMenu: false,
    activeIndex: null as null | number,
    getItemProps: (props = {}) => props,
    listItemsRef: {current: []},
    popupStyle: undefined,
});

export function BreadcrumbsDropdownMenu({
    children,
    disabled,
    popupPlacement,
    popupStyle,
}: DropdownMenuProps) {
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
        enabled: !disabled,
        listRef: listItemsRef,
        activeIndex,
        onNavigate: setActiveIndex,
        loop: true,
    });

    const dismiss = useDismiss(context, {enabled: !disabled});
    const click = useClick(context, {enabled: !disabled});
    const role = useRole(context, {role: 'menu'});

    const interactions = [click, dismiss, listNavigation, role];
    const {getReferenceProps, getItemProps} = useInteractions(interactions);

    const {t} = i18n.useTranslation();

    return (
        <div className={b('menu')}>
            <Button
                ref={setReference}
                {...getReferenceProps()}
                title={t('label_more')}
                aria-label={t('label_more')}
                size="s"
                view="flat"
                disabled={disabled}
            >
                <Button.Icon>...</Button.Icon>
            </Button>
            <Popup
                floatingContext={context}
                floatingRef={setFloating}
                floatingInteractions={interactions}
                placement={popupPlacement}
                className={b('menu-popup')}
            >
                <menuContext.Provider
                    value={{isMenu: true, getItemProps, listItemsRef, activeIndex, popupStyle}}
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
