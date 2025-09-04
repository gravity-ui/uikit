'use client';

import * as React from 'react';

import {Ellipsis} from '@gravity-ui/icons';
import memoize from 'lodash/memoize';

import {useUniqId} from '../../../../hooks';
import {useBoolean} from '../../../../hooks/private';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Menu} from '../../../Menu';
import type {MenuItemProps} from '../../../Menu';
import {Popup} from '../../../Popup';
import type {PopupPlacement} from '../../../Popup';
import {block} from '../../../utils/cn';
import {getComponentName} from '../../../utils/getComponentName';
import type {TableColumnConfig, TableDataItem, TableProps} from '../../Table';
import i18n from '../../i18n';

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
    href?: ((item: I, index: number) => string) | string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    theme?: MenuItemProps['theme'];
    icon?: MenuItemProps['iconStart'];
    qa?: string;
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
    rowActionsIcon?: React.ReactNode;
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
const actionsButtonCn = b('actions-button');

const bPopup = block('table-action-popup');
const menuCn = bPopup('menu');
const menuItemCn = bPopup('menu-item');

const DEFAULT_PLACEMENT: PopupPlacement = ['bottom-end', 'top-end'];

type DefaultRowActionsProps<I extends TableDataItem> = Pick<
    WithTableActionsProps<I>,
    'getRowActions' | 'rowActionsSize' | 'rowActionsIcon'
> &
    Pick<TableProps<I>, 'isRowDisabled' | 'getRowDescriptor'> & {
        item: I;
        index: number;
        tableQa?: string;
    };

const DefaultRowActions = <I extends TableDataItem>({
    index,
    item,
    getRowActions,
    getRowDescriptor,
    rowActionsSize,
    rowActionsIcon,
    isRowDisabled,
    tableQa,
}: DefaultRowActionsProps<I>) => {
    const [isPopupOpen, , closePopup, togglePopup] = useBoolean(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const rowId = useUniqId();
    const {t} = i18n.useTranslation();

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

        const {text, icon, handler, href, ...restProps} = action;

        return (
            <Menu.Item
                key={index}
                onClick={(event) => {
                    event.stopPropagation();
                    handler(item, index, event);

                    closePopup();
                }}
                href={typeof href === 'function' ? href(item, index) : href}
                iconStart={icon}
                contentClassName={menuItemCn}
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
                open={isPopupOpen}
                anchorRef={anchorRef}
                placement={DEFAULT_PLACEMENT}
                onOutsideClick={closePopup}
                id={rowId}
                qa={tableQa && `${tableQa}-actions-popup`}
            >
                <Menu className={menuCn} size={rowActionsSize}>
                    {actions.map(renderPopupMenuItem)}
                </Menu>
            </Popup>
            <Button
                view="flat-secondary"
                className={actionsButtonCn}
                onClick={togglePopup}
                size={rowActionsSize}
                ref={anchorRef}
                disabled={disabled}
                qa={tableQa && `${tableQa}-actions-trigger-${index}`}
                aria-label={t('label-actions')}
                aria-expanded={isPopupOpen}
                aria-controls={rowId}
            >
                {rowActionsIcon ?? <Icon data={Ellipsis} />}
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
                rowActionsIcon,
                isRowDisabled,
                getRowDescriptor,
                qa,
            } = this.props;

            if (renderRowActions) {
                return renderRowActions({item, index});
            }

            return (
                <DefaultRowActions
                    index={index}
                    item={item}
                    getRowActions={getRowActions}
                    rowActionsSize={rowActionsSize}
                    rowActionsIcon={rowActionsIcon}
                    getRowDescriptor={getRowDescriptor}
                    isRowDisabled={isRowDisabled}
                    tableQa={qa}
                />
            );
        };

        // eslint-disable-next-line @typescript-eslint/member-ordering
        private enhanceColumns = memoize((columns: TableColumnConfig<I>[]) =>
            enhanceSystemColumn(columns, (systemColumn) => {
                systemColumn.template = this.renderBodyCell;
            }),
        );

        // eslint-disable-next-line @typescript-eslint/member-ordering
        private enhanceOnRowClick = memoize(
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
                        // @ts-expect-error
                        event.nativeEvent.target.closest(`.${menuCn}`)
                    ) {
                        return undefined;
                    }

                    if (
                        // @ts-expect-error
                        event.nativeEvent.target.matches(
                            `.${actionsButtonCn}, .${actionsButtonCn} *`,
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
