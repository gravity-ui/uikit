'use client';

import * as React from 'react';

import {KeyCode} from '../../constants';
import type {QAProps} from '../types';
import {isOfType} from '../utils/isOfType';

import {Tab} from './Tab';
import {bTabList} from './constants';
import {TabContext} from './contexts/TabContext';
import {TabInnerContext} from './contexts/TabInnerContext';
import type {TabSize} from './types';

export interface TabListProps extends QAProps {
    onUpdate?: (value: string) => void;
    value?: string;
    size?: TabSize;
    contentOverflow?: 'wrap';
    className?: string;
    children?: React.ReactNode;
}

export const isTab = isOfType(Tab);

const prepareChildren = (
    children: React.ReactNode,
    prepareTab: (item: React.ReactElement) => React.ReactElement,
): Array<React.ReactElement | null> => {
    const items = React.Children.toArray(children);

    return React.Children.map(items, (child) => {
        if (!React.isValidElement(child)) {
            return null;
        }

        if (isTab(child)) {
            return prepareTab(child);
        }

        if (child.props.children) {
            return React.cloneElement(
                child,
                child.props,
                ...prepareChildren(child.props.children, prepareTab),
            );
        }

        return child;
    });
};

const isTabDisabled = (node: HTMLElement | null) => {
    return node?.getAttribute('aria-disabled') === 'true';
};

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
    ({size = 'm', value, children, className, onUpdate, qa}, ref) => {
        const activeTabId = React.useContext(TabContext).activeTabId || value;

        const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

        const tabInnerContextValue = React.useMemo(
            () => ({onUpdate, activeTabId, setFocusedIndex, focusedIndex}),
            [onUpdate, activeTabId, setFocusedIndex, focusedIndex],
        );

        const refs = React.useRef<Record<number, HTMLElement | null>>({});

        React.useEffect(() => {
            refs.current[focusedIndex]?.focus();
        }, [focusedIndex]);

        const handleRef = (index: number, elemRef: HTMLElement | null) => {
            refs.current[index] = elemRef;
        };

        const {items, enabledTabIndex} = React.useMemo(() => {
            let index = -1;

            const items = prepareChildren(children, (item) => {
                const currentIndex = ++index;

                const tabElement = React.cloneElement(item, {
                    ref: handleRef.bind(null, currentIndex),
                    index: currentIndex,
                });

                return tabElement;
            });

            return {
                items,
                enabledTabIndex: index,
            };
        }, [children]);

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLElement>) => {
                switch (event.code) {
                    case KeyCode.ARROW_LEFT:
                        event.preventDefault();

                        setFocusedIndex((prev) => {
                            let i = prev;

                            while (i--) {
                                if (!isTabDisabled(refs.current[i])) {
                                    return i;
                                }
                            }

                            let index = enabledTabIndex + 1;

                            while (index-- > prev) {
                                if (!isTabDisabled(refs.current[index])) {
                                    return index;
                                }
                            }

                            return prev;
                        });

                        break;
                    case KeyCode.ARROW_RIGHT:
                        event.preventDefault();

                        setFocusedIndex((prev) => {
                            for (let i = prev + 1; i <= enabledTabIndex; i++) {
                                if (!isTabDisabled(refs.current[i])) {
                                    return i;
                                }
                            }

                            for (let i = 0; i < prev; i++) {
                                if (!isTabDisabled(refs.current[i])) {
                                    return i;
                                }
                            }

                            return prev;
                        });

                        break;
                    case KeyCode.HOME:
                        event.preventDefault();

                        setFocusedIndex((prev) => {
                            for (let i = 0; i <= enabledTabIndex; i++) {
                                if (!isTabDisabled(refs.current[i])) {
                                    return i;
                                }
                            }

                            return prev;
                        });

                        break;
                    case KeyCode.END:
                        event.preventDefault();

                        setFocusedIndex((prev) => {
                            let i = enabledTabIndex + 1;

                            while (i--) {
                                if (!isTabDisabled(refs.current[i])) {
                                    return i;
                                }
                            }

                            return prev;
                        });

                        break;
                }
            },
            [enabledTabIndex],
        );

        return (
            <div className={bTabList({size}, className)} data-qa={qa} ref={ref}>
                <div
                    role="tablist"
                    className={bTabList('tabs', className)}
                    aria-orientation="horizontal"
                    tabIndex={-1}
                    onKeyDown={handleKeyDown}
                >
                    <TabInnerContext.Provider value={tabInnerContextValue}>
                        {items}
                    </TabInnerContext.Provider>
                </div>
            </div>
        );
    },
);

TabList.displayName = 'TabList';
