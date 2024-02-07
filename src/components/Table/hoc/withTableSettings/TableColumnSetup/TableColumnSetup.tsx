import React from 'react';

import {Gear, Lock} from '@gravity-ui/icons';

import type {PopperPlacement} from '../../../../../hooks/private';
import {createOnKeyDownHandler} from '../../../../../hooks/useActionHandlers/useActionHandlers';
import {Button} from '../../../../Button';
import {Icon} from '../../../../Icon';
import type {TreeSelectProps} from '../../../../TreeSelect';
import {block} from '../../../../utils/cn';
import type {TableColumnSetupItem, TableSetting} from '../withTableSettings';

import {DndTreeSelect} from './DndTreeSelect';
import type {DndTreeSelectItem, DndTreeSelectProps, RenderDndContainer} from './DndTreeSelect';
import i18n from './i18n';

import './TableColumnSetup.scss';

const b = block('table-column-setup');
const tableColumnSetupCn = b(null);
const applyButtonCn = b('apply');
const requiredDndItemCn = b('required-item');

interface SwitcherProps {
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
}

type Item = TableColumnSetupItem & DndTreeSelectItem;

export interface TableColumnSetupProps {
    renderSwitcher?: (props: SwitcherProps) => React.JSX.Element;

    items: TableColumnSetupItem[];
    sortable?: boolean;

    onUpdate: (newSettings: TableSetting[]) => void;
    popupWidth?: DndTreeSelectProps<any>['popupWidth'];
    popupPlacement?: PopperPlacement;
}

export const TableColumnSetup = (props: TableColumnSetupProps) => {
    const {
        renderSwitcher,
        popupWidth,
        popupPlacement,
        items: propsItems,
        onUpdate: propsOnUpdate,
        sortable,
    } = props;

    const [open, setOpen] = React.useState(false);

    const prepareItems = React.useCallback((tableColumnItems: TableColumnSetupItem[]) => {
        return tableColumnItems.map<Item>((tableColumnItem) => {
            const hasSelectionIcon = tableColumnItem.isRequired === false;

            return {
                ...tableColumnItem,
                startSlot: tableColumnItem.isRequired ? <Icon data={Lock} /> : undefined,
                isDragDisabled: sortable === false,
                hasSelectionIcon,

                // to overwrite select background effect - https://github.com/gravity-ui/uikit/blob/main/src/components/useList/components/ListItemView/ListItemView.tsx#L125
                className: hasSelectionIcon ? undefined : requiredDndItemCn,
            };
        });
    }, []);

    const [items, setItems] = React.useState(prepareItems(propsItems));

    const [prevPropsItems, setPrevPropsItems] = React.useState(propsItems);
    if (propsItems !== prevPropsItems) {
        setPrevPropsItems(propsItems);

        const newItems = prepareItems(propsItems);
        setItems(newItems);
    }

    const onApply = () => {
        const newSettings = items.map<TableSetting>(({id, isSelected}) => ({id, isSelected}));
        propsOnUpdate(newSettings);
        setOpen(false);
    };

    const renderContainer: RenderDndContainer = ({renderList}) => {
        return (
            <React.Fragment>
                {renderList()}
                <Button view="action" className={applyButtonCn} onClick={onApply}>
                    {i18n('button_apply')}
                </Button>
            </React.Fragment>
        );
    };

    const renderControl: TreeSelectProps<unknown>['renderControl'] = ({toggleOpen}) => {
        const onKeyDown = createOnKeyDownHandler(toggleOpen);

        return (
            renderSwitcher?.({onClick: toggleOpen, onKeyDown}) || (
                <Button onClick={toggleOpen} extraProps={{onKeyDown}}>
                    <Icon data={Gear} />
                    {i18n('button_switcher')}
                </Button>
            )
        );
    };

    const onOpenChange = (open: boolean) => {
        setOpen(open);

        if (open === false) {
            const initialItems = prepareItems(propsItems);
            setItems(initialItems);
        }
    };

    const onUpdate = React.useCallback((selectedItemsIds: string[]) => {
        setItems((prevItems) => {
            return prevItems.map((item) => ({
                ...item,
                isSelected: selectedItemsIds.includes(item.id),
            }));
        });
    }, []);

    const value = React.useMemo(() => {
        const selectedIds: string[] = [];

        items.forEach(({id, isSelected}) => {
            if (isSelected) {
                selectedIds.push(id);
            }
        });

        return selectedIds;
    }, [items]);

    return (
        <DndTreeSelect
            className={tableColumnSetupCn}
            multiple
            size="l"
            open={open}
            value={value}
            onUpdate={onUpdate}
            popupWidth={popupWidth}
            onOpenChange={onOpenChange}
            placement={popupPlacement}
            renderContainer={renderContainer}
            renderControl={renderControl}
            items={items}
            setItems={setItems}
        />
    );
};
