import React from 'react';

import _memoize from 'lodash/memoize';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Menu} from '../../../Menu';
import type {MenuItemProps} from '../../../Menu';
import {Popup} from '../../../Popup';
import {DotsIcon} from '../../../icons/DotsIcon';
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
        sticky: 'right',
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
    disabled?: boolean;
    theme?: MenuItemProps['theme'];
    icon?: MenuItemProps['icon'];
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

export interface WithTableActionsProps<I> {
    getRowActions: (item: I, index: number) => TableActionConfig<I>[];
    rowActionsSize?: TableRowActionsSize;
}

interface WithTableActionsState<I> {
    popupOpen: boolean;
    popupData: PopupData<I> | null;
}

const b = block('table');
const bPopup = block('table-action-popup');
const BUTTON_CLASSNAME = b('actions-button');

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

        private anchorRef = React.createRef<HTMLButtonElement>();

        render() {
            const {
                getRowActions, // eslint-disable-line @typescript-eslint/no-unused-vars
                columns,
                onRowClick,
                ...restTableProps
            } = this.props;

            return (
                <React.Fragment>
                    <TableComponent
                        {...(restTableProps as Omit<TableProps<I>, 'columns'> & E)}
                        columns={this.enhanceColumns(columns)}
                        onRowClick={this.enhanceOnRowClick(onRowClick)}
                    />
                    {this.renderPopup()}
                </React.Fragment>
            );
        }

        private renderBodyCell = (item: I, index: number) => {
            const {isRowDisabled, getRowActions, rowActionsSize} = this.props;
            const actions = getRowActions(item, index);

            if (actions.length === 0) {
                return null;
            }

            const disabled = isRowDisabled ? isRowDisabled(item, index) : false;

            return (
                <div className={b('actions')}>
                    <Button
                        view="flat-secondary"
                        disabled={disabled}
                        className={BUTTON_CLASSNAME}
                        onClick={this.handleActionsButtonClick.bind(this, {item, index})}
                        size={rowActionsSize}
                    >
                        <Icon data={DotsIcon} />
                    </Button>
                </div>
            );
        };

        private renderPopup() {
            const {getRowActions, rowActionsSize} = this.props;
            const {popupOpen, popupData} = this.state;

            if (!popupData) {
                return null;
            }

            const actions = getRowActions(popupData.item, popupData.index);

            return (
                <Popup
                    open={popupOpen}
                    anchorRef={this.anchorRef}
                    placement={['bottom-end', 'top-end']}
                    onClose={this.handlePopupClose}
                >
                    <Menu className={bPopup('menu')} size={rowActionsSize}>
                        {actions.map(this.renderPopupMenuItem)}
                    </Menu>
                </Popup>
            );
        }

        private renderPopupMenuItem = (action: TableActionConfig<I>, index: number) => {
            const {popupData} = this.state;

            if (this.isActionGroup(action)) {
                return (
                    <Menu.Group key={index} label={action.title}>
                        {action.items.map(this.renderPopupMenuItem)}
                    </Menu.Group>
                );
            } else {
                return (
                    <Menu.Item
                        key={index}
                        disabled={action.disabled}
                        onClick={this.handleActionClick.bind(this, action, popupData!)}
                        theme={action.theme}
                        icon={action.icon}
                        className={bPopup('menu-item')}
                    >
                        {action.text}
                    </Menu.Item>
                );
            }
        };

        private handleActionsButtonClick = (
            data: PopupData<I>,
            event: React.MouseEvent<HTMLButtonElement>,
        ) => {
            const {popupOpen} = this.state;
            const anchor = event.currentTarget;

            if (popupOpen && this.anchorRef.current === anchor) {
                this.closePopup();
            } else {
                this.openPopup(anchor, data);
            }
        };

        private handleActionClick = (
            action: TableAction<I>,
            data: PopupData<I>,
            event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>,
        ) => {
            action.handler(data.item, data.index, event);
            this.closePopup();
        };

        private handlePopupClose = () => {
            this.closePopup();
        };

        private openPopup(anchor: HTMLElement, data: PopupData<I>) {
            // @ts-ignore
            this.anchorRef.current = anchor;
            this.setState({popupOpen: true, popupData: data});
        }

        private closePopup() {
            this.setState({popupOpen: false});
        }

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
                            `.${BUTTON_CLASSNAME}, .${BUTTON_CLASSNAME} *`,
                        )
                    ) {
                        return undefined;
                    }

                    return onRowClick(item, index, event);
                };
            },
        );

        private isActionGroup(config: TableActionConfig<I>): config is TableActionGroup<I> {
            return Array.isArray((config as TableActionGroup<I>).items);
        }
    };
}
