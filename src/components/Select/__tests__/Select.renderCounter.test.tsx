import userEvent from '@testing-library/user-event';

import {SelectQa} from '../constants';

import {DEFAULT_OPTIONS, TEST_QA, setup} from './utils';

const CUSTOM_COUNTER_QA = 'custom-counter-qa';

describe('Select renderCounter', () => {
    test('renders custom counter instead of default', () => {
        const {getByTestId, queryByTestId} = setup({
            multiple: true,
            hasCounter: true,
            value: [DEFAULT_OPTIONS[0].value],
            renderCounter: () => <div data-qa={CUSTOM_COUNTER_QA}>Custom: 1</div>,
        });

        expect(getByTestId(CUSTOM_COUNTER_QA)).toBeInTheDocument();
        expect(queryByTestId(SelectQa.COUNTER)).not.toBeInTheDocument();
    });

    test('can return null for conditional rendering', async () => {
        const {queryByTestId, getByTestId, getByText} = setup({
            multiple: true,
            hasCounter: true,
            renderCounter: (_, {count}) =>
                count === 0 ? null : <div data-qa={CUSTOM_COUNTER_QA}>+{count}</div>,
        });

        expect(queryByTestId(CUSTOM_COUNTER_QA)).not.toBeInTheDocument();

        const user = userEvent.setup();
        await user.click(getByTestId(TEST_QA)); // open
        await user.click(getByText(DEFAULT_OPTIONS[0].content as string)); // select

        expect(getByTestId(CUSTOM_COUNTER_QA)).toBeInTheDocument();
        expect(getByTestId(CUSTOM_COUNTER_QA)).toHaveTextContent('+1');
    });
});
