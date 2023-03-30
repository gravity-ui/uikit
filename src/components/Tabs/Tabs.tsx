import React, {forwardRef, useMemo} from 'react';
import {block} from '../utils/cn';
import {QAProps} from '../types';
import {TabsItem, TabsItemProps as TabsItemInternalProps} from './TabsItem';
import './Tabs.scss';

const b = block('tabs');

export enum TabsDirection {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export type TabsSize = 'm' | 'l' | 'xl';

export interface TabsItemProps
    extends Omit<TabsItemInternalProps, 'active' | 'direction' | 'onClick'> {}

export interface TabsProps extends QAProps {
    /**
     * Tabs direction
     * @deprecated Vertical tabs are deprecated
     */
    direction?: TabsDirection;
    /** Tabs size */
    size?: TabsSize;
    /** Active tab ID */
    activeTab?: string;
    /** By default if activeTab is not set, first tab will be active */
    allowNotSelected?: boolean;
    /** Tabs list object */
    items?: TabsItemProps[];
    /** Additional CSS-class */
    className?: string;
    /** Select tab handler */
    onSelectTab?(tabId: string): void;
    /** Allows to wrap `TabItem` into another component or render custom tab  */
    wrapTo?(item: TabsItemProps, node: React.ReactNode, index: number): React.ReactNode;
}

const emptyTabsList: TabsItemProps[] = [];

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
    (
        {
            direction = TabsDirection.Horizontal,
            size = 'm',
            activeTab,
            allowNotSelected = false,
            items = emptyTabsList,
            className,
            onSelectTab,
            wrapTo,
            qa,
        },
        ref,
    ) => {
        const activeTabId = useMemo(() => {
            if (activeTab) {
                return activeTab;
            }

            if (allowNotSelected || items.length === 0) {
                return undefined;
            }

            return items[0].id;
        }, [activeTab, allowNotSelected, items]);

        const handleTabClick = (tabId: string) => {
            if (onSelectTab) {
                onSelectTab(tabId);
            }
        };

        return (
            <div role="tablist" className={b({direction, size}, className)} data-qa={qa} ref={ref}>
                {items.map((item, index) => {
                    const tabItemNode = (
                        <TabsItem
                            key={item.id}
                            {...item}
                            active={item.id === activeTabId}
                            onClick={handleTabClick}
                        />
                    );

                    if (wrapTo) {
                        return wrapTo(item, tabItemNode, index);
                    }

                    return tabItemNode;
                })}
            </div>
        );
    },
);

Tabs.displayName = 'Tabs';
