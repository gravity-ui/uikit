import React from 'react';

import {Ellipsis} from '@gravity-ui/icons';
import _memoize from 'lodash/memoize';

import type {PopperPlacement} from '../../../../hooks/private';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Menu} from '../../../Menu';
import type {MenuItemProps} from '../../../Menu';
import {Popup} from '../../../Popup';
import {block} from '../../../utils/cn';
import {getComponentName} from '../../../utils/getComponentName';
import type {TableColumnConfig, TableDataItem, TableProps} from '../../Table';

import './withTableActions.scss';

export const actionsColumnId = '_actions';

export function enhanceSystemColumn<I>(
    columns: TableColumnConfig<I>[],
    enhancer: (systemColumn: TableColumnConfig<I>) => void,
) {
    const existedColumn = columns.find(({id}) => id === actionsColumnId);
    const systemColumn = existedColumn || {
        id: actionsColumnId,
        name: '',
        sticky: 'end',
        width: 28, // button width
        placeholder: '',
    };
    enhancer(systemColumn);
    return existedColumn ? columns : [...columns, systemColumn];
}

interface PopupData<I> {
    item: I;
    index: number;
}

export interface TableAction<I> {
    text: string;
    handler: (
        item: I,
        index: number,
        event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>,
    ) => void;
    href?: string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    theme?: MenuItemProps['theme'];
    icon?: MenuItemProps['iconStart'];
}

export interface TableActionGroup<I> {
    title: string;
    items: TableActionConfig<I>[];
}

export type TableActionConfig<I> = TableAction<I> | TableActionGroup<I>;

/**
 * common sizes for Menu and Button
 */
export type TableRowActionsSize = 's' | 'm' | 'l' | 'xl';

export type RenderRowActionsProps<I> = {item: I; index: number};
export interface WithTableActionsProps<I> {
    getRowActions?: (item: I, index: number) => TableActionConfig<I>[];
    renderRowActions?: (props: RenderRowActionsProps<I>) => React.ReactNode;
    rowActionsSize?: TableRowActionsSize;
}

interface WithTableActionsState<I> {
    popupOpen: boolean;
    popupData: PopupData<I> | null;
}

const isActionGroup = <I extends TableDataItem>(
    config: TableActionConfig<I>,
): config is TableActionGroup<I> => {
    return Array.isArray((config as TableActionGroup<I>).items);
};

const b = block('table');
const actionsCn = b('actions');
const BUTTON_CLASS_NAME = b('actions-button');

const bPopup = block('table-action-popup');
const menuCn = bPopup('menu');
const menuItemCn = bPopup('menu-item');

const DEFAULT_PLACEMENT: PopperPlacement = ['bottom-end', 'top-end', 'auto'];

type DefaultRenderRowActionsProps<I extends TableDataItem> = Pick<
    WithTableActionsProps<I>,
    'getRowActions' | 'rowActionsSize'
> &
    Pick<TableProps<I>, 'isRowDisabled' | 'getRowDescriptor'> & {
        item: I;
        index: number;
    };

const DefaultRenderRowActions = <I extends TableDataItem>({
    index,
    item,
    getRowActions,
    getRowDescriptor,
    rowActionsSize,
    isRowDisabled,
}: DefaultRenderRowActionsProps<I>) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    if (getRowActions === undefined) {
        return null;
    }

    const renderPopupMenuItem = (action: TableActionConfig<I>, index: number) => {
        if (isActionGroup(action)) {
            return (
                <Menu.Group key={index} label={action.title}>
                    {action.items.map(renderPopupMenuItem)}
                </Menu.Group>
            );
        }

        const {text, icon, handler, ...restProps} = action;

        return (
            <Menu.Item
                key={index}
                onClick={(event) => handler(item, index, event)}
                iconStart={icon}
                className={menuItemCn}
                {...restProps}
            >
                {text}
            </Menu.Item>
        );
    };

    const disabled = getRowDescriptor?.(item, index)?.disabled || isRowDisabled?.(item, index);

    const actions = getRowActions(item, index);

    if (actions.length === 0) {
        return null;
    }

    return (
        <div className={actionsCn}>
            <Popup
                open={open}
                anchorRef={anchorRef}
                placement={DEFAULT_PLACEMENT}
                onOutsideClick={() => setOpen(false)}
            >
                <Menu className={menuCn} size={rowActionsSize}>
                    {actions.map(renderPopupMenuItem)}
                </Menu>
            </Popup>
            <Button
                view="flat-secondary"
                className={BUTTON_CLASS_NAME}
                onClick={() => setOpen(!open)}
                size={rowActionsSize}
                ref={anchorRef}
                disabled={disabled}
            >
                <Icon data={Ellipsis} />
            </Button>
        </div>
    );
};

export function withTableActions<I extends TableDataItem, E extends {} = {}>(
    TableComponent: React.ComponentType<TableProps<I> & E>,
): React.ComponentType<TableProps<I> & WithTableActionsProps<I> & E> {
    const componentName = getComponentName(TableComponent);
    const displayName = `withTableActions(${componentName})`;

    return class extends React.Component<
        TableProps<I> & WithTableActionsProps<I> & E,
        WithTableActionsState<I>
    > {
        static displayName = displayName;

        state: WithTableActionsState<I> = {
            popupOpen: false,
            popupData: null,
        };

        render() {
            const {
                renderRowActions, // eslint-disable-line @typescript-eslint/no-unused-vars
                getRowActions, // eslint-disable-line @typescript-eslint/no-unused-vars
                columns,
                onRowClick,
                ...restTableProps
            } = this.props;

            return (
                <TableComponent
                    {...(restTableProps as Omit<TableProps<I>, 'columns'> & E)}
                    columns={this.enhanceColumns(columns)}
                    onRowClick={this.enhanceOnRowClick(onRowClick)}
                />
            );
        }

        private renderBodyCell = (item: I, index: number) => {
            const {
                getRowActions,
                rowActionsSize,
                renderRowActions,
                isRowDisabled,
                getRowDescriptor,
            } = this.props;

            if (renderRowActions) {
                return renderRowActions({item, index});
            }

            return (
                <DefaultRenderRowActions
                    index={index}
                    item={item}
                    getRowActions={getRowActions}
                    rowActionsSize={rowActionsSize}
                    getRowDescriptor={getRowDescriptor}
                    isRowDisabled={isRowDisabled}
                />
            );
        };

        // eslint-disable-next-line @typescript-eslint/member-ordering
        private enhanceColumns = _memoize((columns: TableColumnConfig<I>[]) =>
            enhanceSystemColumn(columns, (systemColumn) => {
                systemColumn.template = this.renderBodyCell;
            }),
        );

        // eslint-disable-next-line @typescript-eslint/member-ordering
        private enhanceOnRowClick = _memoize(
            (
                onRowClick?: (
                    item: I,
                    index: number,
                    event: React.MouseEvent<HTMLTableRowElement>,
                ) => void,
            ) => {
                if (!onRowClick) {
                    return onRowClick;
                }

                return (item: I, index: number, event: React.MouseEvent<HTMLTableRowElement>) => {
                    if (
                        // @ts-ignore
                        event.nativeEvent.target.matches(
                            `.${BUTTON_CLASS_NAME}, .${BUTTON_CLASS_NAME} *`,
                        )
                    ) {
                        return undefined;
                    }

                    return onRowClick(item, index, event);
                };
            },
        );
    };
}
