import userEvent from '@testing-library/user-event';

import {Suggest} from '..';
import {render, screen, waitFor} from '../../../../test-utils/utils';

type Item = {value: string; content: string; disabled?: boolean};

const ITEMS: Item[] = [
    {value: 'apple', content: 'Apple'},
    {value: 'banana', content: 'Banana'},
    {value: 'durian', content: 'Durian', disabled: true},
];

describe('Suggest', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders input and calls onFilterUpdate', async () => {
        const onFilterUpdate = jest.fn();
        const user = userEvent.setup();

        render(
            <Suggest<Item>
                filter={undefined}
                onFilterUpdate={onFilterUpdate}
                items={ITEMS}
                fragmentProps={{propsTextInput: {placeholder: 'Search…'}}}
                renderItem={(item) => <div>{item.content}</div>}
            />,
        );

        const input = screen.getByRole('textbox', {name: ''});
        await user.type(input, 'ap');

        expect(onFilterUpdate).toHaveBeenCalled();
        expect(onFilterUpdate).toHaveBeenLastCalledWith('ap');
    });

    test('opens popup on focus and renders items', async () => {
        const user = userEvent.setup();

        render(
            <Suggest<Item>
                filter={undefined}
                onFilterUpdate={() => {}}
                items={ITEMS}
                fragmentProps={{propsTextInput: {placeholder: 'Search…'}}}
                renderItem={(item) => <div>{item.content}</div>}
            />,
        );

        expect(screen.queryByText('Apple')).not.toBeInTheDocument();

        const input = screen.getByRole('textbox');
        await user.click(input);

        expect(await screen.findByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    test('calls onItemClick for enabled items and closes popup', async () => {
        const onItemClick = jest.fn();
        const user = userEvent.setup();

        render(
            <Suggest<Item>
                filter={undefined}
                onFilterUpdate={() => {}}
                items={ITEMS}
                onItemClick={onItemClick}
                fragmentProps={{propsTextInput: {placeholder: 'Search…'}}}
                renderItem={(item) => <div>{item.content}</div>}
            />,
        );

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

        render(
            <Suggest<Item>
                filter={undefined}
                onFilterUpdate={() => {}}
                items={ITEMS}
                onItemClick={onItemClick}
                fragmentProps={{propsTextInput: {placeholder: 'Search…'}}}
                renderItem={(item) => <div>{item.content}</div>}
            />,
        );

        const input = screen.getByRole('textbox');
        await user.click(input);

        const durian = await screen.findByText('Durian');
        await user.click(durian);

        expect(onItemClick).not.toHaveBeenCalled();
    });
});
