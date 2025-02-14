import * as React from 'react';

import {
    Composite,
    CompositeItem,
    FloatingList,
    FloatingTree,
    flip,
    offset,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloatingNodeId,
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

const b = block('menu2');

function MenuComponent({
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

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const isNested = Boolean(parentId);

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
    const dismiss = useDismiss(floatingContext, {bubbles: true});
    const role = useRole(floatingContext, {role: 'menu'});
    const listNavigation = useListNavigation(floatingContext, {
        listRef: itemsRef,
        activeIndex,
        nested: isNested,
        onNavigate: setActiveIndex,
        rtl: isRTL,
    });
    const middlewares = [offset({mainAxis: 4, alignmentAxis: isNested ? -4 : 0}), flip(), shift()];
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
              ref: anchorRef,
              ...anchorProps,
          })
        : typeof trigger === 'function'
          ? trigger(anchorProps, anchorRef)
          : null;

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
            getItemProps: inline ? getItemPropsInline : getItemProps,
        }),
        [parentMenu, inline, size, activeIndex, getItemPropsInline, getItemProps],
    );

    React.useEffect(() => {
        if (!tree) return;

        function handleTreeClick() {
            // Closing only the root Menu so the closing animation runs once for all menus due to shared portal container
            if (!parentId) {
                setIsOpen(false);
            }
        }

        function handleSubMenuOpen(event: {nodeId: string; parentId: string}) {
            if (event.nodeId !== nodeId && event.parentId === parentId) {
                setIsOpen(false);
            }
        }

        tree.events.on('click', handleTreeClick);
        tree.events.on('menuopen', handleSubMenuOpen);

        return () => {
            tree.events.off('click', handleTreeClick);
            tree.events.off('menuopen', handleSubMenuOpen);
        };
    }, [setIsOpen, tree, nodeId, parentId]);

    React.useEffect(() => {
        if (isOpen && tree) {
            tree.events.emit('menuopen', {parentId, nodeId});
        }
    }, [isOpen, tree, nodeId, parentId]);

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
                    // @ts-expect-error
                    activeIndex={activeIndex}
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
                floatingContext={floatingContext}
                floatingNodeId={nodeId}
                floatingRef={setFloatingElement}
                floatingMiddlewares={middlewares}
                floatingInteractions={interactions}
            >
                <MenuContext.Provider value={contextValue}>
                    <FloatingList elementsRef={itemsRef}>
                        <div className={b(null, className)} style={style} data-qa={qa}>
                            {children}
                        </div>
                    </FloatingList>
                </MenuContext.Provider>
            </Popup>
        </React.Fragment>
    );
}

export function Menu(props: MenuProps) {
    const parentId = useFloatingParentNodeId();

    if (!props.inline && parentId === null) {
        return (
            <FloatingTree>
                <MenuComponent {...props} />
            </FloatingTree>
        );
    }

    return <MenuComponent {...props} />;
}

Menu.displayName = 'Menu';

Menu.Trigger = MenuTrigger;
Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
