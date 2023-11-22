import React from 'react';

import _difference from 'lodash/difference';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import _union from 'lodash/union';
import _without from 'lodash/without';

import {Checkbox} from '../../../Checkbox';
import {block} from '../../../utils/cn';
import {getComponentName} from '../../../utils/getComponentName';
import {Table} from '../../Table';
import type {TableColumnConfig, TableDataItem, TableProps} from '../../Table';

import './withTableSelection.scss';

const b = block('table');

export const selectionColumnId = '_selection';

export interface WithTableSelectionProps<I> {
    onSelectionChange: (ids: string[]) => void;
    selectedIds: string[];
    isRowSelectionDisabled?: (item: I, index: number) => boolean;
}

export function withTableSelection<I extends TableDataItem, E extends {} = {}>(
    TableComponent: React.ComponentType<TableProps<I> & E>,
): React.ComponentType<TableProps<I> & WithTableSelectionProps<I> & E> {
    const componentName = getComponentName(TableComponent);
    const displayName = `withTableSelection(${componentName})`;

    return class extends React.Component<TableProps<I> & WithTableSelectionProps<I> & E> {
        static displayName = displayName;
        private lastCheckedIndex: number | undefined;

        render() {
            const {
                selectedIds, // eslint-disable-line @typescript-eslint/no-unused-vars
                onSelectionChange, // eslint-disable-line @typescript-eslint/no-unused-vars
                columns,
                onRowClick,
                getRowClassNames,
                ...restTableProps
            } = this.props;

            return (
                <TableComponent
                    {...(restTableProps as Omit<TableProps<I>, 'columns'> & E)}
                    columns={this.enhanceColumns(columns)}
                    onRowClick={this.enhanceOnRowClick(onRowClick)}
                    getRowClassNames={this.enhanceGetRowClassNames(getRowClassNames)}
                />
            );
        }

        private renderHeadCell = () => {
            const {data, selectedIds} = this.props;
            let disabled = true;
            let checked = data.every((item, index) => {
                if (this.isDisabled(item, index)) {
                    return true;
                } else {
                    disabled = false;
                }

                const id = Table.getRowId(this.props, item, index);

                return selectedIds.includes(id);
            });

            if (disabled) {
                checked = false;
            }

            return this.renderCheckBox({disabled, checked, handler: this.handleAllCheckBoxUpdate});
        };

        private renderBodyCell = (item: I, index: number) => {
            const {selectedIds} = this.props;
            const id = Table.getRowId(this.props, item, index);
            const checked = selectedIds.includes(id);

            return this.renderCheckBox({
                disabled: this.isDisabled(item, index),
                checked,
                handler: this.handleCheckBoxUpdate.bind(this, id, index),
            });
        };

        private renderCheckBox({
            disabled,
            checked,
            handler,
        }: {
            checked: boolean;
            disabled: boolean;
            handler: React.ChangeEventHandler<HTMLInputElement>;
        }) {
            return (
                <Checkbox
                    size="l"
                    checked={checked}
                    disabled={disabled}
                    onChange={handler}
                    className={b('selection-checkbox', {verticalAlign: this.props.verticalAlign})}
                />
            );
        }

        private handleCheckBoxUpdate = (
            id: string,
            index: number,
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            const {checked} = event.target;
            // @ts-ignore shiftKey is defined for click events
            const isShiftPressed = event.nativeEvent.shiftKey;
            const {data, selectedIds, onSelectionChange} = this.props;

            if (
                isShiftPressed &&
                this.lastCheckedIndex !== undefined &&
                this.lastCheckedIndex >= 0
            ) {
                const begin = Math.min(this.lastCheckedIndex, index);
                const end = Math.max(this.lastCheckedIndex, index);

                const dataIds = data.map((item, i) => Table.getRowId(this.props, item, i));
                const diffIds = dataIds.filter(
                    (_id, i) => begin <= i && i <= end && !this.isDisabled(data[i], i),
                );

                onSelectionChange(
                    checked ? _union(selectedIds, diffIds) : _without(selectedIds, ...diffIds),
                );
            } else {
                onSelectionChange(checked ? [...selectedIds, id] : _without(selectedIds, id));
            }

            this.lastCheckedIndex = index;
        };

        private handleAllCheckBoxUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
            const {checked} = event.target;
            const {data, selectedIds, onSelectionChange} = this.props;
            const dataIds = data.map((item, index) => Table.getRowId(this.props, item, index));
            const notDisabledItemIds = dataIds.filter(
                (_id, index) => !this.isDisabled(data[index], index),
            );

            onSelectionChange(
                checked
                    ? _union(selectedIds, notDisabledItemIds)
                    : _difference(selectedIds, dataIds),
            );
        };

        // eslint-disable-next-line @typescript-eslint/member-ordering, react/sort-comp
        private enhanceColumns = _memoize((columns: TableColumnConfig<I>[]) => {
            const selectionColumn: TableColumnConfig<I> = {
                id: selectionColumnId,
                name: this.renderHeadCell,
                template: this.renderBodyCell,
                className: b('checkbox_cell'),
                sticky: _get(columns, [0, 'sticky']) === 'left' ? 'left' : undefined,
            };

            return [selectionColumn, ...columns];
        });

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
                    const checkboxClassName = b('selection-checkbox');
                    if (
                        // @ts-ignore
                        event.nativeEvent.target.matches(
                            `.${checkboxClassName}, .${checkboxClassName} *`,
                        )
                    ) {
                        return undefined;
                    }

                    return onRowClick(item, index, event);
                };
            },
        );

        // eslint-disable-next-line @typescript-eslint/member-ordering
        private enhanceGetRowClassNames = _memoize(
            (getRowClassNames?: (item: I, index: number) => string[]) => {
                return (item: I, index: number) => {
                    const {selectedIds} = this.props;
                    const classNames = getRowClassNames
                        ? getRowClassNames(item, index).slice()
                        : [];
                    const id = Table.getRowId(this.props, item, index);
                    const selected = selectedIds.includes(id);

                    classNames.push(b('row', {selected}));

                    return classNames;
                };
            },
        );

        private isDisabled = (item: I, index: number) => {
            const {isRowDisabled, isRowSelectionDisabled} = this.props;
            if (isRowSelectionDisabled && isRowSelectionDisabled(item, index)) {
                return true;
            }
            return isRowDisabled ? isRowDisabled(item, index) : false;
        };
    };
}
