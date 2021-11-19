import React, {useMemo} from 'react';
import {block} from '../utils/cn';
import {QAProps} from '../types';
import {TabsItem, TabsItemProps as TabsItemInternalProps} from './TabsItem/TabsItem';
import './Tabs.scss';

const b = block('tabs');

export enum TabsDirection {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export interface TabsItemProps
    extends Omit<TabsItemInternalProps, 'active' | 'direction' | 'onClick'> {}

export interface TabsProps extends QAProps {
    /** Направление табов */
    direction?: TabsDirection;
    /** Id активного таба */
    activeTab?: string;
    /** Позволяет не указывать `activeTab`*/
    allowNotSelected?: boolean;
    /** Массив табов */
    items: TabsItemProps[];
    /** Дополнительный класс */
    className?: string;
    /** Хендлер на выбор таба */
    onSelectTab?(tabId: string): void;
    /** Функция позволяет обернуть компонент `TabItem` в другой компонент или написать свой */
    wrapTo?(item: TabsItemProps, node: React.ReactNode, index: number): void;
}

export const Tabs: React.FC<TabsProps> = ({
    direction = TabsDirection.Horizontal,
    activeTab,
    allowNotSelected = false,
    items = [],
    className,
    onSelectTab,
    wrapTo,
    qa,
}) => {
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
        <div className={b({direction}, className)} data-qa={qa}>
            {items.map((item, index) => {
                const tabItemNode = (
                    <TabsItem
                        direction={direction}
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
};
