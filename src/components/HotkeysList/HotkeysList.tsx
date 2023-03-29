import React, {useCallback, useMemo} from 'react';

import {Hotkey} from '../Hotkey';
import {List, ListProps} from '../List';
import {HotkeysGroup, HotkeysListItem} from './types';
import {flattenHotkeyGroups} from './utils/flattenHotkeyGroups';
import {cnHotkeysList} from './HotkeysList.classname';
import './HotkeysList.scss';

export type HotkeysListProps<T> = {
    hotkeys: HotkeysGroup<T>[];
} & Omit<ListProps<HotkeysListItem>, 'items'>;

export function HotkeysList<T = {}>({
    hotkeys,
    filterable = false,
    virtualized = false,
    className,
    itemClassName,
    ...listProps
}: HotkeysListProps<T>) {
    const hotkeysList = useMemo(() => flattenHotkeyGroups(hotkeys), [hotkeys]);

    const renderItem = useCallback(
        (item: HotkeysListItem) => (
            <div className={cnHotkeysList('item-content', {group: item.group})}>
                {item.title}
                {item.value && <Hotkey className={cnHotkeysList('hotkey')} value={item.value} />}
            </div>
        ),
        [],
    );

    return (
        <List<HotkeysListItem>
            className={cnHotkeysList(null, className)}
            virtualized={virtualized}
            filterable={filterable}
            items={hotkeysList}
            renderItem={renderItem}
            itemClassName={cnHotkeysList('item', itemClassName)}
            {...listProps}
        />
    );
}
