'use client';
import * as React from 'react';

import {
    Composite,
    CompositeItem,
    FloatingList,
    flip,
    offset,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloatingParentNodeId,
    useFloatingRootContext,
    useFloatingTree,
    useHover,
    useInteractions,
    useListNavigation,
    useRole,
} from '@floating-ui/react';
import type {VirtualElement} from '@floating-ui/react';

import {useControlledState, useForkRef} from '../../../hooks';
import {Popup} from '../../Popup';
import {useDirection} from '../../theme';
import {block} from '../../utils/cn';
import {getElementRef} from '../../utils/getElementRef';

import {MenuContext} from './MenuContext';
import {MenuDivider} from './MenuDivider';
import {MenuItem} from './MenuItem';
import {MenuTrigger} from './MenuTrigger';
import type {MenuProps} from './types';
import {isComponentType} from './utils';

import './Menu.scss';

const b = block('lab-menu');

// The component is needed to run submenu logic hooks.
// We get <nodeId> of the Popup using "useFloatingParentNodeId" here
// and <parentId> from using "useFloatingParentNodeId" outside the Popup.
function MenuPopupContent({
    open,
    onRequestClose,
    isNested,
    children,
    className,
    style,
    qa,
}: Pick<MenuProps, 'children' | 'className' | 'style' | 'qa'> & {
    open: boolean;
    onRequestClose: () => void;
    isNested: boolean;
}) {
    const tree = useFloatingTree();
    const nodeId = useFloatingParentNodeId();
    const parentId = React.useContext(MenuContext)?.floatingParentId;

    React.useEffect(() => {
        if (!tree) return;

        function handleTreeClick() {
            // Closing only the root Menu so the closing animation runs once for all menus due to shared portal container
            if (!isNested) {
                onRequestClose();
            }
        }

        function handleSubMenuOpen(event: {nodeId: string; parentId: string}) {
            // Closing on sibling submenu open
            if (event.nodeId !== nodeId && event.parentId === parentId) {
                onRequestClose();
            }
        }

        tree.events.on('click', handleTreeClick);
        tree.events.on('menuopen', handleSubMenuOpen);

        return () => {
            tree.events.off('click', handleTreeClick);
            tree.events.off('menuopen', handleSubMenuOpen);
        };
    }, [onRequestClose, tree, nodeId, parentId, isNested]);

    React.useEffect(() => {
        if (open && tree) {
            tree.events.emit('menuopen', {parentId, nodeId});
        }
    }, [open, tree, nodeId, parentId]);

    return (
        <div className={b(null, className)} style={style} data-qa={qa}>
            {children}
        </div>
    );
}

export function Menu({
    trigger,
    inline = false,
    defaultOpen,
    open,
    onOpenChange,
    placement = 'bottom-start',
    disabled,
    children,
    size = 'm',
    className,
    style,
    qa,
}: MenuProps) {
    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const [floatingElement, setFloatingElement] = React.useState<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useControlledState(open, defaultOpen ?? false, onOpenChange);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const isRTL = useDirection() === 'rtl';

    const itemsRef = React.useRef<Array<HTMLElement | null>>([]);
    const parentMenu = React.useContext(MenuContext);

    const floatingParentId = useFloatingParentNodeId();
    const isNested = Boolean(parentMenu);

    const floatingContext = useFloatingRootContext({
        open: isOpen && !disabled,
        onOpenChange: setIsOpen,
        elements: {
            reference: anchorElement,
            floating: floatingElement,
        },
    });
    const hover = useHover(floatingContext, {
        enabled: isNested,
        delay: {open: 100},
        handleClose: safePolygon({blockPointerEvents: true}),
    });
    const click = useClick(floatingContext, {
        toggle: !isNested,
        ignoreMouse: isNested,
    });
    const dismiss = useDismiss(floatingContext, {enabled: !isNested});
    const role = useRole(floatingContext, {role: 'menu'});
    const listNavigation = useListNavigation(floatingContext, {
        listRef: itemsRef,
        activeIndex,
        nested: isNested,
        onNavigate: setActiveIndex,
        rtl: isRTL,
    });
    const detectOverflowOptions = {
        padding: 4,
    };
    const middlewares = [
        offset({mainAxis: isNested ? 3 : 4, alignmentAxis: isNested ? -4 : 0}),
        flip({...detectOverflowOptions}),
        shift({...detectOverflowOptions}),
    ];
    const interactions = [hover, click, dismiss, role, listNavigation];
    const {getReferenceProps, getItemProps} = useInteractions(interactions);

    const anchorRef = useForkRef(
        setAnchorElement,
        React.isValidElement(trigger) ? getElementRef(trigger) : undefined,
    );
    const anchorProps = React.isValidElement<any>(trigger)
        ? getReferenceProps(trigger.props)
        : getReferenceProps();
    const anchorNode = React.isValidElement<any>(trigger)
        ? React.cloneElement(trigger, {
              ...anchorProps,
              ref: anchorRef,
          })
        : typeof trigger === 'function'
          ? trigger(anchorProps, anchorRef)
          : null;

    const handleContentRequestClose = React.useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const getItemPropsInline = React.useCallback(
        (userProps?: React.HTMLAttributes<HTMLElement>) => {
            const handleItemPointerEnter = (event: React.PointerEvent<HTMLElement>) => {
                userProps?.onPointerEnter?.(event);

                const element = event.currentTarget;
                const index = [
                    ...(element.closest('[role="menu"]')?.querySelectorAll('[role="menuitem"]') ??
                        []),
                ].indexOf(element);

                if (
                    !(element as HTMLButtonElement).disabled &&
                    !element.ariaDisabled &&
                    index >= 0
                ) {
                    element.focus();
                    setActiveIndex(index);
                } else {
                    setActiveIndex(null);
                }
            };

            const handleItemPointerLeave = (event: React.PointerEvent<HTMLElement>) => {
                userProps?.onPointerLeave?.(event);
                setActiveIndex(null);
            };

            return {
                // Clear attribute set by Floating UI Composite (we don't use it)
                'data-active': undefined,
                ...userProps,
                onPointerEnter: handleItemPointerEnter,
                onPointerLeave: handleItemPointerLeave,
            };
        },
        [],
    );

    const contextValue = React.useMemo(
        () => ({
            inline: parentMenu?.inline ?? inline,
            size: parentMenu?.size ?? size,
            activeIndex,
            floatingParentId: floatingParentId,
            getItemProps: inline ? getItemPropsInline : getItemProps,
        }),
        [parentMenu, inline, size, activeIndex, floatingParentId, getItemPropsInline, getItemProps],
    );

    React.useEffect(() => {
        if (!anchorNode) {
            if (trigger) {
                floatingContext.refs.setPositionReference(trigger as VirtualElement);
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }
    }, [trigger]);

    if (inline) {
        const preparedChildren = React.Children.toArray(children).map((child, index) => {
            if (!React.isValidElement(child) || !isComponentType(child, 'Menu.Item')) {
                return child;
            }

            return (
                <CompositeItem
                    key={index}
                    render={(props) => React.cloneElement(child, {...child.props, ...props})}
                />
            );
        });

        return (
            <MenuContext.Provider value={contextValue}>
                <Composite
                    render={
                        <div
                            role="menu"
                            className={b(null, className)}
                            style={style}
                            data-qa={qa}
                        />
                    }
                    orientation="vertical"
                    loop={false}
                    rtl={isRTL}
                    activeIndex={activeIndex ?? undefined}
                    onNavigate={setActiveIndex}
                >
                    {preparedChildren}
                </Composite>
            </MenuContext.Provider>
        );
    }

    return (
        <React.Fragment>
            {anchorNode}
            <Popup
                open={floatingContext.open}
                placement={isNested ? `${isRTL ? 'left' : 'right'}-start` : placement}
                disablePortal={isNested}
                disableEscapeKeyDown={isNested}
                disableOutsideClick={isNested}
                floatingContext={floatingContext}
                floatingRef={setFloatingElement}
                floatingMiddlewares={middlewares}
                floatingInteractions={interactions}
            >
                <MenuContext.Provider value={contextValue}>
                    <FloatingList elementsRef={itemsRef}>
                        <MenuPopupContent
                            open={isOpen}
                            onRequestClose={handleContentRequestClose}
                            isNested={isNested}
                            className={className}
                            style={style}
                            qa={qa}
                        >
                            {children}
                        </MenuPopupContent>
                    </FloatingList>
                </MenuContext.Provider>
            </Popup>
        </React.Fragment>
    );
}

Menu.displayName = 'Menu';

Menu.Trigger = MenuTrigger;
Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
