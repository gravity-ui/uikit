import React from 'react';

import {Gear} from '@gravity-ui/icons';

import type {PopperPlacement} from '../../../../../components/utils/usePopper';
import {useActionHandlers} from '../../../../../hooks/useActionHandlers';
import {Button} from '../../../../Button';
import {Icon} from '../../../../Icon';
import {List} from '../../../../List';
import {Popup} from '../../../../Popup';
import {block} from '../../../../utils/cn';
import type {TableColumnSetupItem} from '../withTableSettings';

import {LockIcon} from './LockIcon';
import {TickIcon} from './TickIcon';
import i18n from './i18n';
import {
    LIST_ITEM_HEIGHT,
    getConfigurableItems,
    getCountSelected,
    getListHeight,
    getRequiredItems,
    getRequiredListHeight,
} from './utils';

import './TableColumnSetup.scss';

const b = block('table-column-setup');

type Item = TableColumnSetupItem;

interface SwitcherProps<S extends HTMLElement = HTMLElement> {
    ref: React.RefObject<S>;
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
}

export interface TableColumnSetupProps<S extends HTMLElement = HTMLElement> {
    // for Button
    disabled?: boolean;
    /**
     * @deprecated Use renderSwitcher instead
     */
    switcher?: React.ReactElement | undefined;
    renderSwitcher?: (props: SwitcherProps<S>) => React.ReactElement | undefined;

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

export function TableColumnSetup<S extends HTMLElement = HTMLElement>(
    props: TableColumnSetupProps<S>,
) {
    const {
        switcher,
        renderSwitcher,
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

    const controlRef = React.useRef<S>(null);

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

    const makeOnSortEnd =
        (list: Item[]) =>
        ({oldIndex, newIndex}: {oldIndex: number; newIndex: number}) => {
            setCurrentItems(List.moveListElement(list.slice(), oldIndex, newIndex));
        };

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
        setCurrentItems(newItems);
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

        const selected = getCountSelected(items);
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

    const {onKeyDown: handleControlKeyDown} = useActionHandlers(handleControlClick);

    return (
        <div className={b(null, className)}>
            {/* FIXME remove switcher prop and this wrapper */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
                //@ts-ignore
                ref={controlRef}
                onClick={handleControlClick}
            >
                {renderSwitcher?.({
                    ref: controlRef,
                    onClick: handleControlClick,
                    onKeyDown: handleControlKeyDown,
                }) ||
                    switcher || (
                        <Button disabled={disabled}>
                            <Icon data={Gear} />
                            {i18n('button_switcher')}
                            {renderStatus()}
                        </Button>
                    )}
            </div>
            <Popup
                anchorRef={controlRef}
                placement={popupPlacement || ['bottom-start', 'bottom-end', 'top-start', 'top-end']}
                open={focused}
                onClose={setInitialState}
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
}
