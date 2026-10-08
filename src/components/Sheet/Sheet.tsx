'use client';

import * as React from 'react';

import {
    FloatingFocusManager,
    FloatingNode,
    FloatingOverlay,
    FloatingTree,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useFloatingTree,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import type {FloatingFocusManagerProps} from '@floating-ui/react';

import {KeyCode} from '../../constants';
import {useFloatingTransition} from '../../hooks/private/useFloatingTransition';
import {useLayoutEffect} from '../../hooks/useLayoutEffect';
import {Portal} from '../Portal/Portal';
import type {PortalProps} from '../Portal/Portal';
import {useDefaultProps} from '../theme/useDefaultProps';
import type {QAProps} from '../types';
import {useLayer} from '../utils/layer-manager';

import {SheetContentContainer} from './SheetContent';
import {SHEET_TRANSITION_DURATION_MS, sheetBlock} from './constants';
import {useSheetDismiss} from './hooks/useSheetDismiss';
import i18n from './i18n';

import './Sheet.scss';

export type SheetOpenChangeReason =
    | 'escape-key'
    | 'outside-press'
    | 'swipe'
    | 'navigation'
    | 'dismiss';

export interface SheetProps extends Pick<PortalProps, 'container' | 'disablePortal'>, QAProps {
    children?: React.ReactNode;
    /** @deprecated Use onOpenChange for dismissal requests or onTransitionOutComplete for exit cleanup */
    onClose?: () => void;
    /** Callback for open state changes, when dismiss happens for example */
    onOpenChange?: (open: boolean, event?: Event, reason?: SheetOpenChangeReason) => void;
    /** Called when the opening transition starts */
    onTransitionIn?: () => void;
    /** Called when the opening transition completes */
    onTransitionInComplete?: () => void;
    /** Called when the closing transition starts */
    onTransitionOut?: () => void;
    /** Called when the closing transition completes */
    onTransitionOutComplete?: () => void;
    /** Show/hide sheet */
    visible: boolean;
    /** Disables closing the sheet on Escape */
    disableEscapeKeyDown?: boolean;
    /** Disables closing the sheet by clicking the veil */
    disableOutsideClick?: boolean;
    /** Manages focus and acts like a modal dialog. Pass `false` to opt out */
    modal?: boolean;
    /** Index of the tabbable element or ref to focus on open. The sheet itself by default */
    initialFocus?: FloatingFocusManagerProps['initialFocus'];
    /** Element to return focus to, or `false` to disable it */
    returnFocus?: FloatingFocusManagerProps['returnFocus'];
    /** ID of the sheet, used as hash in URL. It's important to specify different `id` values if there can be more than one sheet on the page */
    id?: string;
    /** Title of the sheet window */
    title?: string;
    /** Class name for the sheet window */
    className?: string;
    /** Class name for the sheet content */
    contentClassName?: string;
    /** Class name for the swipe area */
    swipeAreaClassName?: string;
    /** Enable the behavior in which you can close the sheet window with a swipe down if the content is scrolled to its top (`contentNode.scrollTop === 0`) or has no scroll at all */
    allowHideOnContentScroll?: boolean;
    /** Hide top bar with resize handle */
    hideTopBar?: boolean;
    /** Coefficient that determines the maximum height of the `Sheet` relative to the height of the viewport (range 0-1) */
    maxContentHeightCoefficient?: number;
    /** `Sheet` height will always have the maximum value */
    alwaysFullHeight?: boolean;
}

// Modal sheets in the order they opened, see getSheetsAbove
const openModalSheets: Array<() => HTMLElement | null> = [];

function SheetComponent(rawProps: SheetProps) {
    const {
        children,
        onClose,
        onOpenChange,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
        visible,
        disableEscapeKeyDown,
        disableOutsideClick,
        modal = true,
        initialFocus,
        returnFocus,
        id,
        title,
        className,
        contentClassName,
        swipeAreaClassName,
        allowHideOnContentScroll,
        hideTopBar,
        maxContentHeightCoefficient,
        alwaysFullHeight,
        container,
        disablePortal,
        qa,
    } = useDefaultProps('Sheet', rawProps);
    const {t} = i18n.useTranslation();
    const {requestedOpen, immediate, requestDismiss} = useSheetDismiss({
        visible,
        onOpenChange,
        disableEscapeKeyDown,
        disableOutsideClick,
    });

    const handleEscapeKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            requestDismiss({reason: 'escape-key', event});
        },
        [requestDismiss],
    );

    const floatingNodeId = useFloatingNodeId();
    const tree = useFloatingTree();

    // Floating UI parents (Modal, Popup, Drawer) stop Escape from their whole React subtree,
    // portaled sheets included, before LayerManager sees it, so a nested sheet handles Escape itself.
    // A closing sheet lets it through, so the next Escape reaches the layer below.
    // An open floating child (e.g. a Popup) owns Escape, so the sheet does not close over it.
    const isNested = useFloatingParentNodeId() !== null;
    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key !== KeyCode.ESCAPE || !modal || !requestedOpen) {
                return;
            }

            const hasOpenChild = tree?.nodesRef.current.some(
                (node) => node.parentId === floatingNodeId && node.context?.open,
            );

            if (!hasOpenChild) {
                event.stopPropagation();
                handleEscapeKeyDown(event.nativeEvent);
            }
        },
        [floatingNodeId, handleEscapeKeyDown, modal, requestedOpen, tree],
    );

    const {refs, context} = useFloating({
        nodeId: floatingNodeId,
        open: requestedOpen,
        // FloatingFocusManager reports its visually hidden dismiss buttons here
        onOpenChange: (open, event) => {
            if (!open) {
                requestDismiss({reason: 'dismiss', event});
            }
        },
    });
    const handleExitComplete = React.useCallback(() => {
        onClose?.();
        onTransitionOutComplete?.();
    }, [onClose, onTransitionOutComplete]);
    const {isMounted, status} = useFloatingTransition({
        context,
        duration: SHEET_TRANSITION_DURATION_MS,
        skipTransitionOut: immediate,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete: handleExitComplete,
    });

    // LayerManager routes Escape to the topmost layer across independent FloatingTrees;
    // useDismiss only coordinates within one tree. Release the layer when closing starts.
    // Non-modal sheets stay out of the stack and do not handle Escape.
    useLayer({
        open: requestedOpen && modal,
        type: 'sheet',
        disableOutsideClick: true,
        onEscapeKeyDown: handleEscapeKeyDown,
    });

    // The overlay also holds the visually hidden dismiss buttons next to the dialog
    const overlayRef = React.useRef<HTMLDivElement>(null);
    const getOverlay = React.useCallback(() => overlayRef.current, []);

    useLayoutEffect(() => {
        if (!isMounted || !modal) {
            return undefined;
        }

        openModalSheets.push(getOverlay);

        return () => {
            openModalSheets.splice(openModalSheets.indexOf(getOverlay), 1);
        };
    }, [getOverlay, isMounted, modal]);

    // A modal sheet hides the rest of the page from assistive technology. Sheets opened
    // in the same commit would hide each other, so a sheet keeps the ones above it.
    const getSheetsAbove = React.useCallback(() => {
        const index = openModalSheets.indexOf(getOverlay);

        return openModalSheets
            .slice(index + 1)
            .map((getElement) => getElement())
            .filter((element): element is HTMLElement => element !== null);
    }, [getOverlay]);

    const role = useRole(context, {role: 'dialog'});
    const {getFloatingProps} = useInteractions([role]);

    return (
        <FloatingNode id={floatingNodeId}>
            {isMounted ? (
                <Portal container={container} disablePortal={disablePortal}>
                    <FloatingOverlay
                        ref={overlayRef}
                        data-qa={qa}
                        data-floating-ui-status={status}
                        className={sheetBlock({'without-top-bar': hideTopBar}, className)}
                        lockScroll
                        onKeyDown={isNested ? handleKeyDown : undefined}
                        style={
                            {
                                overflow: undefined,
                                '--_--transition-duration': `${SHEET_TRANSITION_DURATION_MS}ms`,
                            } as React.CSSProperties
                        }
                    >
                        <FloatingFocusManager
                            context={context}
                            disabled={!modal}
                            // Focusing a text field on open would show the on-screen keyboard
                            initialFocus={initialFocus ?? refs.floating}
                            returnFocus={returnFocus}
                            getInsideElements={getSheetsAbove}
                            restoreFocus
                            visuallyHiddenDismiss={t('close')}
                        >
                            <SheetContentContainer
                                id={id}
                                content={children}
                                contentClassName={contentClassName}
                                swipeAreaClassName={swipeAreaClassName}
                                title={title}
                                modal={modal}
                                presenceStatus={status}
                                allowHideOnContentScroll={allowHideOnContentScroll}
                                hideTopBar={hideTopBar}
                                requestDismiss={requestDismiss}
                                floatingRef={refs.setFloating}
                                getFloatingProps={getFloatingProps}
                                maxContentHeightCoefficient={maxContentHeightCoefficient}
                                alwaysFullHeight={alwaysFullHeight}
                            />
                        </FloatingFocusManager>
                    </FloatingOverlay>
                </Portal>
            ) : null}
        </FloatingNode>
    );
}

export function Sheet(props: SheetProps) {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
        return (
            <FloatingTree>
                <SheetComponent {...props} />
            </FloatingTree>
        );
    }

    return <SheetComponent {...props} />;
}
