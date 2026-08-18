import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {SelectQa} from '../constants';

import {DEFAULT_OPTIONS, TEST_QA, setup} from './utils';

const QA = 'SELECT_RENDER_POPUP_TEST_QA';

describe('Select renderPopup', () => {
    test('default case', async () => {
        const {getByTestId} = setup({
            options: DEFAULT_OPTIONS,
            filterable: true,
            renderPopup: ({renderFilter, renderList, renderLabel}) => {
                return (
                    <React.Fragment>
                        {renderLabel()}
                        {renderFilter()}
                        <div data-qa={QA} />
                        {renderList()}
                    </React.Fragment>
                );
            },
        });

        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        // open select popup
        await user.click(selectControl);

        const filterInput = getByTestId(SelectQa.FILTER_INPUT);
        expect(filterInput).toBeVisible();

        const list = getByTestId(SelectQa.LIST);
        expect(list).toBeVisible();

        const customPopupDiv = getByTestId(QA);
        expect(customPopupDiv).toBeVisible();
    });

    test('empty options', async () => {
        const {getByTestId} = setup({
            options: [],
            renderEmptyOptions: () => <div data-qa={QA} />,
            renderPopup: ({renderList}) => renderList(),
        });

        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        // open select popup
        await user.click(selectControl);

        const emptyContent = getByTestId(QA);
        expect(emptyContent).toBeVisible();
    });

    test('default renderLabel shows sheet label on mobile when label is set', async () => {
        const sheetLabel = 'Sheet caption';
        const {getByTestId} = setup(
            {
                options: DEFAULT_OPTIONS,
                label: sheetLabel,
            },
            true,
        );

        const user = userEvent.setup();
        await user.click(getByTestId(TEST_QA));

        expect(getByTestId(SelectQa.SHEET_LABEL)).toHaveTextContent(sheetLabel);
    });
});
