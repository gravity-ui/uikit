import * as React from 'react';

import {FloatingOverlay} from '@floating-ui/react';
import {CSSTransition, Transition} from 'react-transition-group';

import {Portal} from '../../Portal';
import {block} from '../../utils/cn';
import {DRAWER_ANIMATION_DURATION_MS} from '../constants';
import {useIsSomeItemVisible, useScrollLock} from '../utils';

import {DrawerItem} from './DrawerItem';
import type {DrawerItemProps} from './DrawerItem';

import './Drawer.scss';

const b = block('drawer');

export type DrawerChild = React.ReactElement<DrawerItemProps>;

export interface DrawerProps {
    /** Child components to be rendered within the drawer. This can be a single child or an array of children. */
    children: DrawerChild | DrawerChild[];

    /** Optional additional class names to style the drawer component. */
    className?: string;

    /** Optional inline styles to be applied to the drawer component. */
    style?: React.CSSProperties;

    /** Optional additional class names to style the background veil element. */
    veilClassName?: string;

    /** Optional callback function that is called when the veil (overlay) is clicked. */
    onVeilClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

    /** Optional callback function that is called when the escape key is pressed if the drawer is open. */
    onEscape?: (event: KeyboardEvent) => void;

    /** Optional flag to hide the background darkening */
    hideVeil?: boolean;

    /**
     * Optional flag to use `Portal` for drawer
     * @default false
     */
    usePortal?: boolean;

    /**
     * Keep child components mounted when closed
     * @default false
     */
    keepMounted?: boolean;

    /**
     * Whether to lock page scroll when drawer is open.
     * Applied only when hideVeil=true and usePortal=true.
     * @default false
     */
    scrollLock?: boolean;

    /** `data-qa` HTML attribute, used for testing. */
    qa?: string;
}

export const Drawer = ({
    className,
    veilClassName,
    children,
    style,
    onVeilClick,
    onEscape,
    hideVeil,
    usePortal = false,
    keepMounted = false,
    scrollLock = false,
    qa,
}: DrawerProps) => {
    const someItemVisible = useIsSomeItemVisible(children);

    React.useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onEscape?.(event);
            }
        };
        if (someItemVisible) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onEscape, someItemVisible]);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const veilRef = React.useRef<HTMLDivElement>(null);

    const shouldApplyScrollLock = Boolean(scrollLock && someItemVisible && hideVeil && usePortal);
    useScrollLock(shouldApplyScrollLock);

    return (
        <Transition
            in={someItemVisible}
            timeout={{enter: 0, exit: DRAWER_ANIMATION_DURATION_MS}}
            mountOnEnter={!keepMounted}
            unmountOnExit={!keepMounted}
            nodeRef={containerRef}
        >
            {(state) => {
                const childrenVisible = someItemVisible && state === 'entered';

                const content = (
                    <div
                        ref={containerRef}
                        className={b({hideVeil}, className)}
                        style={style}
                        data-qa={qa}
                    >
                        <CSSTransition
                            in={childrenVisible}
                            timeout={DRAWER_ANIMATION_DURATION_MS}
                            unmountOnExit
                            classNames={b('veil-transition')}
                            nodeRef={veilRef}
                        >
                            <div
                                ref={veilRef}
                                className={b('veil', {hidden: hideVeil}, veilClassName)}
                                onClick={onVeilClick}
                                role="presentation"
                            />
                        </CSSTransition>
                        {React.Children.map(children, (child) => {
                            if (
                                React.isValidElement<DrawerItemProps>(child) &&
                                child.type === DrawerItem
                            ) {
                                const childVisible = Boolean(child.props.visible);
                                return React.cloneElement(child, {
                                    keepMounted,
                                    ...child.props,
                                    visible: childVisible && childrenVisible,
                                });
                            }
                            return child;
                        })}
                    </div>
                );

                if (!usePortal) {
                    return content;
                }

                // When hideVeil=true, we don't use FloatingOverlay to avoid blocking mouse events
                if (hideVeil) {
                    return <Portal>{content}</Portal>;
                }

                return (
                    <Portal>
                        <FloatingOverlay lockScroll={true}>{content}</FloatingOverlay>
                    </Portal>
                );
            }}
        </Transition>
    );
};
