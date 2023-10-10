import React from 'react';

import {Gear} from '@gravity-ui/icons';

import type {PopperPlacement} from '../../../../../components/utils/usePopper';
import {Button} from '../../../../Button';
import {Icon} from '../../../../Icon';
import {List} from '../../../../List';
import {Popup} from '../../../../Popup';
import {block} from '../../../../utils/cn';
import type {TableColumnSetupItem} from '../withTableSettings';

import {LockIcon} from './LockIcon';
import {TickIcon} from './TickIcon';
import i18n from './i18n';

import './TableColumnSetup.scss';

const b = block('table-column-setup');

type Item = TableColumnSetupItem;

export interface TableColumnSetupProps {
    // for Button
    disabled?: boolean;
    switcher?: React.ReactElement | undefined;

    // for List
    items: Item[];
    sortable?: boolean;
    filterable?: boolean;

    onUpdate: (updated: Item[]) => void;
    popupWidth?: number | string;
    popupPlacement?: PopperPlacement;
    getItemTitle?: (item: Item) => TableColumnSetupItem['title'];
    showStatus?: boolean;
    className?: string;
}

export const TableColumnSetup = (props: TableColumnSetupProps) => {
    const {
        switcher,
        disabled,
        popupWidth,
        popupPlacement,
        className,
        items: propsItems,
        getItemTitle = (item: Item) => item.title,
        sortable = true,
        filterable = false,
        showStatus,
    } = props;

    const [focused, setFocused] = React.useState(false);
    const [items, setItems] = React.useState<Item[]>([]);
    const [currentItems, setCurrentItems] = React.useState<Item[]>([]);
    const [requiredItems, setRequiredItems] = React.useState<Item[]>([]);

    const refControl = React.useRef(null);

    const LIST_ITEM_HEIGHT = 36;

    const getRequiredItems = (list: Item[]) =>
        list
            .filter(({required}) => required)
            .map((column) => ({
                ...column,
                disabled: true,
            }));

    const getConfigurableItems = (list: Item[]) => list.filter(({required}) => !required);

    React.useEffect(() => {
        if (propsItems !== items) {
            setItems(propsItems);
            setRequiredItems(getRequiredItems(propsItems));
            setCurrentItems(getConfigurableItems(propsItems));
        }
    }, [items, propsItems]);

    const setInitialState = () => {
        setFocused(false);
        setRequiredItems(getRequiredItems(items));
        setCurrentItems(getConfigurableItems(items));
    };

    const getListHeight = (list: Item[]) => {
        const itemHeight = LIST_ITEM_HEIGHT;

        return Math.min(5, list.length) * itemHeight + itemHeight / 2;
    };

    const getRequiredListHeight = (list: Item[]) => list.length * LIST_ITEM_HEIGHT;

    const getCountSelected = () => items.reduce((acc, cur) => (cur.selected ? acc + 1 : acc), 0);

    const makeOnSortEnd =
        (list: Item[]) =>
        ({oldIndex, newIndex}: {oldIndex: number; newIndex: number}) => {
            setCurrentItems(List.moveListElement(list.slice(), oldIndex, newIndex));
        };

    const handleUpdate = (value: Item[]) => setCurrentItems(value);

    const handleClosePopup = () => setInitialState();

    const handleControlClick = () => {
        if (!disabled) {
            setFocused(!focused);
            setRequiredItems(getRequiredItems(items));
            setCurrentItems(getConfigurableItems(items));
        }
    };

    const handleApplyClick = () => {
        setInitialState();

        const newItems = requiredItems.concat(currentItems);

        if (items !== newItems) {
            props.onUpdate(newItems);
        }
    };

    const handleItemClick = (value: Item) => {
        const newItems = currentItems.map((item) =>
            item === value ? {...item, selected: !item.selected} : item,
        );
        handleUpdate(newItems);
    };

    const renderItem = (item: Item) => {
        return (
            <div className={b('item-content')}>
                {item.required ? (
                    <div className={b('lock-wrap', {visible: item.selected})}>
                        <Icon data={LockIcon} />
                    </div>
                ) : (
                    <div className={b('tick-wrap', {visible: item.selected})}>
                        <Icon data={TickIcon} className={b('tick')} width={10} height={10} />
                    </div>
                )}
                <div className={b('title')}>{getItemTitle(item)}</div>
            </div>
        );
    };

    const renderStatus = () => {
        if (!showStatus) {
            return null;
        }

        const selected = getCountSelected();
        const all = propsItems.length;
        const status = `${selected}/${all}`;

        return <span className={b('status')}>{status}</span>;
    };

    const renderRequiredColumns = () => {
        const hasRequiredColumns = requiredItems.length;

        if (!hasRequiredColumns) {
            return null;
        }

        return (
            <List
                items={requiredItems}
                itemHeight={LIST_ITEM_HEIGHT}
                itemsHeight={getRequiredListHeight}
                filterable={filterable}
                renderItem={renderItem}
                itemsClassName={b('items')}
                itemClassName={b('item')}
                virtualized={false}
            />
        );
    };

    const renderConfigurableColumns = () => {
        return (
            <List
                items={currentItems}
                itemHeight={LIST_ITEM_HEIGHT}
                itemsHeight={getListHeight}
                sortable={sortable}
                filterable={filterable}
                sortHandleAlign={'right'}
                onSortEnd={makeOnSortEnd(currentItems)}
                onItemClick={handleItemClick}
                renderItem={renderItem}
                itemsClassName={b('items')}
                itemClassName={b('item')}
                virtualized={false}
            />
        );
    };

    return (
        <div className={b(null, className)}>
            {/* FIXME change to renderProp or provide component's context */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div className={b('control')} ref={refControl} onClick={handleControlClick}>
                {switcher || (
                    <Button disabled={disabled}>
                        <Icon data={Gear} />
                        {i18n('button_switcher')}
                        {renderStatus()}
                    </Button>
                )}
            </div>
            <Popup
                anchorRef={refControl}
                placement={popupPlacement || ['bottom-start', 'bottom-end', 'top-start', 'top-end']}
                open={focused}
                onClose={handleClosePopup}
                className={b('popup')}
                style={{width: popupWidth}}
            >
                {renderRequiredColumns()}
                {renderConfigurableColumns()}
                <div className={b('controls')}>
                    <Button view="action" width="max" onClick={handleApplyClick}>
                        {i18n('button_apply')}
                    </Button>
                </div>
            </Popup>
        </div>
    );
};
