import React from 'react';

import {render} from '../../../../test-utils/utils';
import type {TableProps} from '../Table';
import {Table} from '../Table';
import type {
    WithTableActionsProps,
    WithTableSelectionProps,
    WithTableSettingsProps,
    WithTableSortingProps,
} from '../hoc';
import {
    withTableActions,
    withTableCopy,
    withTableSelection,
    withTableSettings,
    withTableSorting,
} from '../hoc';

interface Model {
    disabled: boolean;
}

function getTextContent(html = '') {
    return html.replace(/uniq\d+/g, '');
}

describe('Table HOCs tests', () => {
    it('using withTableActions and withTableSelection should not depend of order', () => {
        const Table1 = withTableActions(withTableSelection<Model>(Table));
        const Table2 = withTableSelection(withTableActions<Model>(Table));

        type Props = TableProps<Model> &
            WithTableActionsProps<Model> &
            WithTableSelectionProps<Model>;
        const props: Props = {
            data: [{disabled: false}, {disabled: true}],
            columns: [{id: 'name'}],
            isRowDisabled: ({disabled}) => disabled,
            selectedIds: [],
            onSelectionChange: () => {},
            getRowActions: () => [],
        };
        const {container: container1} = render(React.createElement<Props>(Table1, props));
        const {container: container2} = render(React.createElement<Props>(Table2, props));

        expect(getTextContent(container1.outerHTML)).toEqual(getTextContent(container2.outerHTML));
    });

    it('using withTableActions and withTableSorting should not depend of order', () => {
        const Table1 = withTableActions(withTableSorting<Model>(Table));
        const Table2 = withTableSorting(withTableActions<Model>(Table));

        type Props = TableProps<Model> & WithTableActionsProps<Model> & WithTableSortingProps;
        const props: Props = {
            data: [{disabled: false}, {disabled: true}],
            columns: [{id: 'name'}],
            isRowDisabled: ({disabled}) => disabled,
            getRowActions: () => [],
        };
        const {container: container1} = render(React.createElement<Props>(Table1, props));
        const {container: container2} = render(React.createElement<Props>(Table2, props));

        expect(getTextContent(container1.outerHTML)).toEqual(getTextContent(container2.outerHTML));
    });

    it('using all HOCs should not depend of order', () => {
        const Table1 = withTableSorting(
            withTableSettings(
                withTableCopy(withTableActions(withTableSelection<Model, {}>(Table))),
            ),
        );
        const Table2 = withTableSelection(
            withTableActions(withTableCopy(withTableSettings(withTableSorting<Model, {}>(Table)))),
        );

        type Props = TableProps<Model> &
            WithTableActionsProps<Model> &
            WithTableSelectionProps<Model> &
            WithTableSettingsProps &
            WithTableSortingProps;

        const props: Props = {
            data: [{disabled: false}, {disabled: true}],
            columns: [{id: 'name'}],
            isRowDisabled: ({disabled}) => disabled,
            selectedIds: [],
            onSelectionChange: () => {},
            getRowActions: () => [],
            updateSettings: () => Promise.resolve(),
            settings: [],
        };
        const {container: container1} = render(React.createElement<Props>(Table1, props));
        const {container: container2} = render(React.createElement<Props>(Table2, props));

        expect(getTextContent(container1.outerHTML)).toEqual(getTextContent(container2.outerHTML));
    });
});
