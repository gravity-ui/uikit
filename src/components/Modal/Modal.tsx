'use client';

import * as React from 'react';

import {
    FloatingFocusManager,
    FloatingNode,
    FloatingOverlay,
    FloatingTree,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingTree,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import type {
    FloatingFocusManagerProps,
    OpenChangeReason as FloatingOpenChangeReason,
} from '@floating-ui/react';

import {useForkRef} from '../../hooks';
import {useFloatingTransition} from '../../hooks/private/useFloatingTransition';
import {Portal} from '../Portal';
import type {PortalProps} from '../Portal';
import {MobileContext, useMobile} from '../mobile';
import {useDefaultProps} from '../theme/useDefaultProps';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';
import {useLayer} from '../utils/layer-manager';

import i18n from './i18n';

import './Modal.scss';

export type OpenChangeReason = FloatingOpenChangeReason;

export interface ModalProps
    extends Pick<PortalProps, 'container' | 'disablePortal'>,
        DOMProps,
        AriaLabelingProps,
        QAProps {
    open?: boolean;
    /** Callback for open state changes, when dismiss happens for example */
    onOpenChange?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
    keepMounted?: boolean;
    disableBodyScrollLock?: boolean;
    /**
     * FloatingFocusManager `initialFocus` property
     */
    initialFocus?: FloatingFocusManagerProps['initialFocus'];
    /**
     * FloatingFocusManager `returnFocus` property
     */
    returnFocus?: FloatingFocusManagerProps['returnFocus'];

    /** Do not add a11y dismiss buttons when managing focus */
    disableVisuallyHiddenDismiss?: boolean;

    children?: React.ReactNode;
    /** Do not dismiss on escape key press */
    disableEscapeKeyDown?: boolean;
    /** Do not dismiss on outside click */
    disableOutsideClick?: boolean;
    contentClassName?: string;
    /** Callback called when `Modal` is opened and "in" transition is started */
    onTransitionIn?: () => void;
    /** Callback called when `Modal` is opened and "in" transition is completed */
    onTransitionInComplete?: () => void;
    /** Callback called when `Modal` is closed and "out" transition is started */
    onTransitionOut?: () => void;
    /** Callback called when `Popup` is closed and "out" transition is completed */
    onTransitionOutComplete?: () => void;
    contentOverflow?: 'visible' | 'auto';
    floatingRef?: React.RefObject<HTMLDivElement | null>;
    /** Skip opening and closing animations. */
    disableTransition?: boolean;
}

const b = block('modal');

const TRANSITION_DURATION = 150;

function ModalComponent(rawProps: ModalProps) {
    const {
        open = false,
        onOpenChange,
        keepMounted = false,
        disableBodyScrollLock = false,
        disableEscapeKeyDown,
        disableOutsideClick,
        initialFocus,
        returnFocus,
        disableVisuallyHiddenDismiss,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
        children,
        style,
        contentOverflow = 'visible',
        className,
        contentClassName,
        container,
        disablePortal,
        qa,
        floatingRef,
        disableTransition = false,

        ...restProps
    } = useDefaultProps('Modal', rawProps);
    useLayer({open, type: 'modal'});
    const mobileModals = React.useContext(MobileContext).__experimentalMobileModals ?? false;
    const mobile = useMobile() && mobileModals;
    const hasScroll = mobile || contentOverflow === 'auto';

    const overlayRef = React.useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    const floatingNodeId = useFloatingNodeId();

    const {refs, context} = useFloating({
        nodeId: floatingNodeId,
        open,
        onOpenChange,
    });

    const handleFloatingRef = useForkRef<HTMLDivElement>(
        refs.setFloating,
        /*
         *  TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
         */
        floatingRef as React.Ref<HTMLDivElement>,
    );

    const handleTransitionInComplete = React.useCallback(() => {
        setIsVisible(true);
        onTransitionInComplete?.();
    }, [onTransitionInComplete]);

    const handleTransitionOutComplete = React.useCallback(() => {
        setIsVisible(false);
        onTransitionOutComplete?.();
    }, [onTransitionOutComplete]);

    const dismiss = useDismiss(context, {
        enabled: !disableOutsideClick || !disableEscapeKeyDown,
        outsidePress: (event) => {
            if (disableOutsideClick) {
                return false;
            }

            // Prevent closing parent modals if they aren't nested in the React tree
            if ((event.target as HTMLElement).closest(`.${b()}`) !== overlayRef.current) {
                return false;
            }

            return true;
        },
        escapeKey: !disableEscapeKeyDown,
    });

    const role = useRole(context, {role: 'dialog'});

    const {getFloatingProps} = useInteractions([dismiss, role]);

    const {isMounted, status} = useFloatingTransition({
        context,
        duration: {
            open: disableTransition ? 0 : TRANSITION_DURATION,
            close: TRANSITION_DURATION,
        },
        skipTransitionOut: disableTransition,
        onTransitionIn,
        onTransitionInComplete: handleTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete: handleTransitionOutComplete,
    });

    const {t} = i18n.useTranslation();

    return (
        <FloatingNode id={floatingNodeId}>
            {isMounted || keepMounted ? (
                <Portal container={container} disablePortal={disablePortal}>
                    <FloatingOverlay
                        ref={overlayRef}
                        style={{...style, ...(mobile ? {overflow: 'hidden'} : {})}}
                        className={b(
                            {
                                open,
                                mobile,
                                'disable-transition': disableTransition,
                            },
                            className,
                        )}
                        data-qa={qa}
                        data-floating-ui-status={status}
                        lockScroll={!disableBodyScrollLock}
                    >
                        <FloatingFocusManager
                            context={context}
                            disabled={!isMounted || !isVisible}
                            modal={isMounted}
                            initialFocus={initialFocus ?? refs.floating}
                            returnFocus={returnFocus}
                            visuallyHiddenDismiss={
                                disableVisuallyHiddenDismiss ? false : t('close')
                            }
                            restoreFocus={true}
                        >
                            <div className={b('content-aligner', {'has-scroll': hasScroll})}>
                                <div
                                    {...filterDOMProps(restProps, {labelable: true})}
                                    className={b(
                                        'content',
                                        {'has-scroll': hasScroll},
                                        contentClassName,
                                    )}
                                    ref={handleFloatingRef}
                                    {...getFloatingProps()}
                                >
                                    {children}
                                </div>
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                </Portal>
            ) : null}
        </FloatingNode>
    );
}

export function Modal(props: ModalProps) {
    const tree = useFloatingTree();

    if (tree === null) {
        return (
            <FloatingTree>
                <ModalComponent {...props} />
            </FloatingTree>
        );
    }

    return <ModalComponent {...props} />;
}
