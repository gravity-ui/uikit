import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {DescriptorType, TableColumnConfig, TableProps} from '../Table';

import type {DataItem} from './utils';

export type TestTableColumnConfig = Partial<TableColumnConfig<DataItem>>;

export const columnAlignCases: Cases<TableColumnConfig<DataItem>['align']> = [
    'start',
    'end',
    'center',
    'left',
    'right',
];

export const columnStickyCases: Cases<TableColumnConfig<DataItem>['sticky']> = [
    'start',
    'end',
    'left',
    'right',
];

export const columnWidthCases: Cases<TableColumnConfig<DataItem>['width']> = [200];

export const placeholderCases: Cases<TableColumnConfig<DataItem>['placeholder']> = ['empty'];

export const edgePaddingCases: Cases<TableProps<DataItem>['edgePadding']> = [true];

export const verticalAlignCases: Cases<TableProps<DataItem>['verticalAlign']> = ['top', 'middle'];

export const wordWrapCases: Cases<TableProps<DataItem>['wordWrap']> = [true];

export const rowDescriptorCases: CasesWithName<TableProps<DataItem>['getRowDescriptor']> = [
    [
        'disabled',
        (): DescriptorType => {
            return {
                id: `${Math.random()}`,
            };
        },
    ],
];
