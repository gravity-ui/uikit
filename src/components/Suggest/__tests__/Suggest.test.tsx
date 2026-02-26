import userEvent from '@testing-library/user-event';

import {Suggest} from '..';
import {render, screen, waitFor} from '../../../../test-utils/utils';

type Item = {value: string; content: string; disabled?: boolean};

const ITEMS: Item[] = [
    {value: 'apple', content: 'Apple'},
    {value: 'banana', content: 'Banana'},
    {value: 'durian', content: 'Durian', disabled: true},
];

function renderSuggest(props?: Partial<React.ComponentProps<typeof Suggest<Item>>>) {
    return render(
        <Suggest<Item>
            filter={undefined}
            onFilterUpdate={() => {}}
            items={ITEMS}
            renderItem={(item) => <div>{item.content}</div>}
            fragmentProps={{
                propsTextInput: {id: 'suggest-input', qa: 'suggest-input', placeholder: 'Search…'},
                popupProps: {qa: 'suggest-popup'},
                listProps: {
                    qa: 'suggest-list',
                    id: 'suggest-list',
                    role: 'listbox',
                    items: ITEMS,
                },
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
        const onFilterUpdate = jest.fn();
        const user = userEvent.setup();

        renderSuggest({onFilterUpdate});

        const input = screen.getByRole('textbox', {name: ''});
        await user.type(input, 'ap');

        expect(onFilterUpdate).toHaveBeenCalled();
        expect(onFilterUpdate).toHaveBeenLastCalledWith('ap');
    });

    test('opens popup on focus and renders items', async () => {
        const user = userEvent.setup();

        renderSuggest();

        expect(screen.queryByText('Apple')).not.toBeInTheDocument();

        const input = screen.getByRole('textbox');
        await user.click(input);

        expect(await screen.findByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    test('calls onItemClick for enabled items and closes popup', async () => {
        const onItemClick = jest.fn();
        const user = userEvent.setup();

        renderSuggest({onItemClick});

        const input = screen.getByRole('textbox');
        await user.click(input);

        const apple = await screen.findByText('Apple');
        await user.click(apple);

        expect(onItemClick).toHaveBeenCalledTimes(1);
        expect(onItemClick.mock.calls[0]?.[0]).toMatchObject({value: 'apple', content: 'Apple'});

        await waitFor(() => {
            expect(screen.queryByText('Apple')).not.toBeInTheDocument();
        });
    });

    test('does not call onItemClick for disabled items', async () => {
        const onItemClick = jest.fn();
        const user = userEvent.setup();

        renderSuggest({onItemClick});

        const input = screen.getByRole('textbox');
        await user.click(input);

        const durian = await screen.findByText('Durian');
        await user.click(durian);

        expect(onItemClick).not.toHaveBeenCalled();
    });
});
