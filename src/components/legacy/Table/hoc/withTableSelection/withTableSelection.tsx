'use client';

import * as React from 'react';

import difference from 'lodash/difference';
import memoize from 'lodash/memoize';
import union from 'lodash/union';
import without from 'lodash/without';

import {Checkbox} from '../../../Checkbox';
import {block} from '../../../utils/cn';
import {getComponentName} from '../../../utils/getComponentName';
import {Table} from '../../Table';
import type {TableColumnConfig, TableDataItem, TableProps} from '../../Table';
import i18n from '../../i18n';

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
                getRowDescriptor,
                ...restTableProps
            } = this.props;

            return (
                <TableComponent
                    {...(restTableProps as Omit<TableProps<I>, 'columns'> & E)}
                    columns={this.enhanceColumns(columns)}
                    onRowClick={this.enhanceOnRowClick(onRowClick)}
                    getRowDescriptor={this.enhanceGetRowDescriptor(getRowDescriptor)}
                />
            );
        }

        private renderHeadCell = () => {
            const {data, selectedIds} = this.props;
            let disabled = true;
            let indeterminate = false;
            let checked = true;
            data.forEach((item, index) => {
                if (this.isDisabled(item, index)) {
                    return;
                } else {
                    disabled = false;
                }

                const id = Table.getRowId(this.props, item, index);
                const itemChecked = selectedIds.includes(id);

                if (itemChecked) {
                    indeterminate = true;
                } else {
                    checked = false;
                }
            });

            if (checked) {
                indeterminate = false;
            }

            if (disabled) {
                checked = false;
                indeterminate = false;
            }

            return this.renderCheckBox({
                disabled,
                checked,
                handler: this.handleAllCheckBoxUpdate,
                indeterminate,
            });
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
            indeterminate,
        }: {
            checked: boolean;
            disabled: boolean;
            handler: React.ChangeEventHandler<HTMLInputElement>;
            indeterminate?: boolean; //only for header cell checkbox
        }) {
            return (
                <i18n.Translation>
                    {({t}) => (
                        <Checkbox
                            size="l"
                            checked={checked}
                            indeterminate={indeterminate}
                            disabled={disabled}
                            onChange={handler}
                            className={b('selection-checkbox', {
                                'vertical-align': this.props.verticalAlign,
                            })}
                            controlProps={{
                                'aria-label': t('label-row-select'),
                            }}
                        />
                    )}
                </i18n.Translation>
            );
        }

        private handleCheckBoxUpdate = (
            id: string,
            index: number,
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            const {checked} = event.target;
            // @ts-expect-error shiftKey is defined for click events
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
                    checked ? union(selectedIds, diffIds) : without(selectedIds, ...diffIds),
                );
            } else {
                onSelectionChange(checked ? [...selectedIds, id] : without(selectedIds, id));
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
                checked ? union(selectedIds, notDisabledItemIds) : difference(selectedIds, dataIds),
            );
        };

        // eslint-disable-next-line @typescript-eslint/member-ordering, react/sort-comp
        private enhanceColumns = memoize((columns: TableColumnConfig<I>[]) => {
            const selectionColumn: TableColumnConfig<I> = {
                id: selectionColumnId,
                name: this.renderHeadCell,
                template: this.renderBodyCell,
                className: b('checkbox_cell'),
                sticky: columns?.[0]?.sticky === 'start' ? 'start' : undefined,
            };

            return [selectionColumn, ...columns];
        });

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
                    const checkboxClassName = b('selection-checkbox');
                    if (
                        // @ts-expect-error
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
        private enhanceGetRowDescriptor = memoize(
            (getRowDescriptor?: TableProps<I>['getRowDescriptor']) => {
                const currentGetRowDescriptor: TableProps<I>['getRowDescriptor'] = (
                    item: I,
                    index: number,
                ) => {
                    const {selectedIds, getRowClassNames} = this.props;
                    const descriptor = getRowDescriptor?.(item, index) || {};

                    if (descriptor.classNames === undefined) {
                        descriptor.classNames = getRowClassNames?.(item, index) || [];
                    }

                    const id = Table.getRowId(this.props, item, index);
                    const selected = selectedIds.includes(id);

                    descriptor.classNames.push(b('row', {selected}));

                    return descriptor;
                };

                return currentGetRowDescriptor;
            },
        );

        private isDisabled = (item: I, index: number) => {
            const {isRowDisabled, isRowSelectionDisabled, getRowDescriptor} = this.props;
            if (isRowSelectionDisabled && isRowSelectionDisabled(item, index)) {
                return true;
            }
            return (
                getRowDescriptor?.(item, index)?.disabled || isRowDisabled?.(item, index) || false
            );
        };
    };
}
