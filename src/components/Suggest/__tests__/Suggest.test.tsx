import userEvent from '@testing-library/user-event';

import {Suggest} from '..';
import {render, screen, waitFor, within} from '../../../../test-utils/utils';
import type {SuggestProps} from '../Suggest';

type Item = {value: string; content: string; disabled?: boolean};

const ITEMS: Item[] = [
    {value: 'earth', content: 'Earth'},
    {value: 'europa', content: 'Europa'},
    {value: 'jupiter', content: 'Jupiter'},
];

const QA_SUGGEST_LIST = 'qa-suggest-list';
const QA_SUGGEST_POPUP = 'qa-suggest-popup';
const QA_SUGGEST_TEXT_INPUT = 'qa-suggest-text-input';

function renderSuggest(props?: Partial<SuggestProps<Item>>) {
    return render(
        <Suggest<Item>
            items={ITEMS}
            filter={undefined}
            onItemClick={() => {}}
            onFilterUpdate={() => {}}
            renderItem={(item) => <div>{item.content}</div>}
            fragmentProps={{
                listProps: {qa: QA_SUGGEST_LIST},
                popupProps: {qa: QA_SUGGEST_POPUP},
                textInputProps: {qa: QA_SUGGEST_TEXT_INPUT, placeholder: 'Search…'},
            }}
            {...props}
        />,
    );
}

describe('Suggest', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders input and calls onFilterUpdate', async () => {
        const testStr = 'test-str';
        const user = userEvent.setup();
        const onFilterUpdate = jest.fn();

        renderSuggest({onFilterUpdate});

        const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
        await user.type(input, testStr);

        expect(onFilterUpdate).toHaveBeenCalled();
        expect(onFilterUpdate).toHaveBeenLastCalledWith(testStr);
    });

    test('opens popup on focus and renders items', async () => {
        const user = userEvent.setup();

        renderSuggest();

        expect(screen.queryByText('Earth')).not.toBeInTheDocument();

        const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
        await user.click(input);

        expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();
        expect(screen.getByTestId(QA_SUGGEST_LIST)).toBeVisible();
        expect(screen.getByText('Europa')).toBeInTheDocument();
    });

    test('calls onItemClick for enabled items and closes popup', async () => {
        const onItemClick = jest.fn();
        const user = userEvent.setup();

        renderSuggest({onItemClick});

        const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
        await user.click(input);

        const earth = await screen.findByText('Earth');
        await user.click(earth);

        expect(onItemClick).toHaveBeenCalledTimes(1);
        expect(onItemClick.mock.calls[0]?.[0]).toMatchObject(ITEMS[0]);

        await waitFor(() => expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument());
    });

    test('does not call onItemClick for disabled items', async () => {
        const onItemClick = jest.fn();
        const user = userEvent.setup();

        renderSuggest({
            onItemClick,
            items: [{value: 'earth', content: 'Earth', disabled: true}],
        });

        const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
        await user.click(input);

        const earth = await screen.findByText('Earth');
        await user.click(earth);

        expect(onItemClick).not.toHaveBeenCalled();
    });
});
