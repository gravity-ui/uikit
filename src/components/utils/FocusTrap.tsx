import React, {useContext} from 'react';

import {FocusTrap as FocusTrapInstance, createFocusTrap} from 'focus-trap';

import {useForkRef} from './useForkRef';
import {useUniqId} from './useUniqId';

interface FocusTrapContext {
    addNode: (id: string, node: HTMLElement) => void;
    removeNode: (id: string) => void;
}

const focusTrapContext = React.createContext<FocusTrapContext | undefined>(undefined);

interface FocusTrapProps {
    enabled?: boolean;
    disableAutoFocus?: boolean;
    children: React.ReactNode;
}
export function FocusTrap({children, enabled = true, disableAutoFocus}: FocusTrapProps) {
    const nodeRef = React.useRef<HTMLElement | null>(null);

    const setAutoFocusRef = React.useRef(!disableAutoFocus);
    React.useEffect(() => {
        setAutoFocusRef.current = !disableAutoFocus;
    });

    const focusTrapRef = React.useRef<FocusTrapInstance>();
    if (!focusTrapRef.current) {
        focusTrapRef.current = createFocusTrap([], {
            initialFocus: () => setAutoFocusRef.current && getFocusElement(nodeRef.current),
            fallbackFocus: () => nodeRef.current!,
            returnFocusOnDeactivate: false,
            escapeDeactivates: false,
            clickOutsideDeactivates: false,
            allowOutsideClick: true,
        });
    }

    const containersRef = React.useRef<Record<string, HTMLElement>>({});
    const updateContainerElements = React.useCallback(() => {
        focusTrapRef.current?.updateContainerElements([
            nodeRef.current!,
            ...Object.values(containersRef.current),
        ]);
    }, []);

    const actions = React.useMemo(
        () => ({
            addNode(id: string, node: HTMLElement) {
                if (containersRef.current[id] !== node && !nodeRef.current?.contains(node)) {
                    containersRef.current[id] = node;
                    updateContainerElements();
                }
            },
            removeNode(id: string) {
                if (containersRef.current[id]) {
                    delete containersRef.current[id];
                    updateContainerElements();
                }
            },
        }),
        [updateContainerElements],
    );

    const handleNodeRef = React.useCallback(
        (node: HTMLElement | null) => {
            if (enabled && node) {
                nodeRef.current = node;
                updateContainerElements();
                focusTrapRef.current?.activate();
            } else {
                focusTrapRef.current?.deactivate();
                nodeRef.current = null;
            }
        },
        [enabled, updateContainerElements],
    );

    const child = React.Children.only(children);
    if (!React.isValidElement(child)) {
        throw new Error('Children must contain only one valid element');
    }
    const childRef = (child as any).ref;

    const ref = useForkRef(handleNodeRef, childRef);

    return (
        <focusTrapContext.Provider value={actions}>
            {React.cloneElement(child, {ref})}
        </focusTrapContext.Provider>
    );
}

export function useParentFocusTrap() {
    const actions = useContext(focusTrapContext);
    const id = useUniqId();

    return React.useMemo(() => {
        if (!actions) {
            return undefined;
        }

        return (node: HTMLElement | null) => {
            if (node) {
                actions.addNode(id, node);
            } else {
                actions.removeNode(id);
            }
        };
    }, [actions, id]);
}

function getFocusElement(root: HTMLElement | null) {
    if (root === null) {
        throw new Error('');
    }

    if (
        !(document.activeElement instanceof HTMLElement) ||
        !root.contains(document.activeElement)
    ) {
        if (!root.hasAttribute('tabIndex')) {
            if (process.env.NODE_ENV !== 'production') {
                // used only in dev build
                // eslint-disable-next-line no-console
                console.error('@gravity-ui/uikit: focus-trap content node does node accept focus.');
            }
            root.setAttribute('tabIndex', '-1');
        }
        return root;
    }

    return document.activeElement;
}
