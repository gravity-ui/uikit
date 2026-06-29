import user from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Select} from '../Select';
import {SelectQa, selectControlBlock} from '../constants';

function getHasValueClass() {
    const hasValueClass = selectControlBlock({'has-value': true})
        .split(' ')
        .find((className) => className.endsWith('_has-value'));

    if (!hasValueClass) {
        throw new Error('has-value modifier class not found');
    }

    return hasValueClass;
}

describe('Select with generic value types', () => {
    it('preserves number type in onUpdate', async () => {
        const onUpdate = jest.fn();

        render(
            <Select
                qa="select"
                options={[
                    {value: 1, content: 'One'},
                    {value: 2, content: 'Two'},
                ]}
                onUpdate={onUpdate}
            />,
        );

        await user.click(screen.getByTestId('select'));
        await user.click(screen.getByText('Two'));

        expect(onUpdate).toHaveBeenCalledWith([2]);
        expect(typeof onUpdate.mock.calls[0][0][0]).toBe('number');
    });

    it('preserves object reference on deselect in multiple mode', async () => {
        const alice = {id: 1, name: 'Alice'};
        const bob = {id: 2, name: 'Bob'};
        const onUpdate = jest.fn();

        render(
            <Select
                qa="select"
                options={[
                    {value: alice, content: 'Alice'},
                    {value: bob, content: 'Bob'},
                ]}
                onUpdate={onUpdate}
                multiple
                value={[alice, bob]}
            />,
        );

        await user.click(screen.getByTestId('select'));
        await user.click(screen.getByRole('option', {name: 'Alice'}));

        expect(onUpdate).toHaveBeenCalledWith([bob]);
        expect(onUpdate.mock.calls[0][0][0]).toBe(bob);
    });

    it('appends object reference on select in multiple mode', async () => {
        const alice = {id: 1, name: 'Alice'};
        const bob = {id: 2, name: 'Bob'};
        const onUpdate = jest.fn();

        render(
            <Select
                qa="select"
                multiple
                value={[bob]}
                options={[
                    {value: alice, content: 'Alice'},
                    {value: bob, content: 'Bob'},
                ]}
                onUpdate={onUpdate}
            />,
        );

        await user.click(screen.getByTestId('select'));
        await user.click(screen.getByRole('option', {name: 'Alice'}));

        expect(onUpdate).toHaveBeenCalledWith([bob, alice]);
        expect(onUpdate.mock.calls[0][0][1]).toBe(alice);
    });

    it('toggles number values in controlled multiple mode', async () => {
        const onUpdate = jest.fn();
        const options = [
            {value: 0, content: 'Zero'},
            {value: 1, content: 'One'},
        ];

        const {rerender} = render(
            <Select qa="select" multiple value={[0]} options={options} onUpdate={onUpdate} />,
        );

        await user.click(screen.getByTestId('select'));
        await user.click(screen.getByRole('option', {name: 'One'}));

        expect(onUpdate).toHaveBeenLastCalledWith([0, 1]);

        rerender(
            <Select qa="select" multiple value={[0, 1]} options={options} onUpdate={onUpdate} />,
        );

        await user.click(screen.getByRole('option', {name: 'Zero'}));

        expect(onUpdate).toHaveBeenLastCalledWith([1]);
    });

    it('selects number values from grouped options', async () => {
        const onUpdate = jest.fn();

        render(
            <Select
                qa="select"
                options={[
                    {
                        label: 'Group 1',
                        options: [
                            {value: 1, content: 'One'},
                            {value: 2, content: 'Two'},
                        ],
                    },
                ]}
                onUpdate={onUpdate}
            />,
        );

        await user.click(screen.getByTestId('select'));
        await user.click(screen.getByText('Two'));

        expect(onUpdate).toHaveBeenCalledWith([2]);
        expect(typeof onUpdate.mock.calls[0][0][0]).toBe('number');
    });

    it('supports object values with the children API', async () => {
        const alice = {id: 1, name: 'Alice'};
        const bob = {id: 2, name: 'Bob'};
        const onUpdate = jest.fn();

        render(
            <Select qa="select" multiple value={[alice]} onUpdate={onUpdate}>
                <Select.OptionGroup label="Users">
                    <Select.Option value={alice} content="Alice" />
                    <Select.Option value={bob} content="Bob" />
                </Select.OptionGroup>
            </Select>,
        );

        await user.click(screen.getByTestId('select'));

        expect(screen.getByRole('option', {name: 'Alice'})).toHaveAttribute(
            'aria-selected',
            'true',
        );

        await user.click(screen.getByRole('option', {name: 'Bob'}));

        expect(onUpdate).toHaveBeenCalledWith([alice, bob]);
        expect(onUpdate.mock.calls[0][0][1]).toBe(bob);
    });

    it('restores original generic values on form reset', async () => {
        const alice = {id: 1, name: 'Alice'};
        const bob = {id: 2, name: 'Bob'};
        const onUpdate = jest.fn();

        render(
            <form>
                <Select
                    qa="select"
                    name="user"
                    defaultValue={[alice]}
                    options={[
                        {value: alice, content: 'Alice'},
                        {value: bob, content: 'Bob'},
                    ]}
                    onUpdate={onUpdate}
                />
                <button type="reset" data-qa="reset">
                    Reset
                </button>
            </form>,
        );

        await user.click(screen.getByTestId('select'));
        await user.click(screen.getByRole('option', {name: 'Bob'}));

        expect(screen.getByTestId('select')).toHaveTextContent('Bob');

        await user.click(screen.getByTestId('reset'));

        expect(screen.getByTestId('select')).toHaveTextContent('Alice');

        const lastUpdate = onUpdate.mock.calls[onUpdate.mock.calls.length - 1][0];

        expect(lastUpdate[0]).toBe(alice);
    });

    it('renders selected options with unique keys for equally serialized values', () => {
        const first = {id: 1};
        const second = {id: 1};
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        try {
            render(
                <Select
                    qa="select"
                    multiple
                    name="items"
                    value={[first, second]}
                    options={[
                        {value: first, content: 'First'},
                        {value: second, content: 'Second'},
                    ]}
                    renderSelectedOption={(option, index) => (
                        <span>{`#${index}:${JSON.stringify(option.value)}`}</span>
                    )}
                />,
            );

            expect(screen.getByTestId('select')).toHaveTextContent('#0:{"id":1}#1:{"id":1}');

            const duplicateKeyWarnings = consoleErrorSpy.mock.calls.filter(([message]) =>
                String(message).includes('two children with the same key'),
            );

            expect(duplicateKeyWarnings).toHaveLength(0);
        } finally {
            consoleErrorSpy.mockRestore();
        }
    });

    it('serializes non-string values in forms', async () => {
        const item = {id: 1, label: 'First'};
        const formDataRef: {current: FormData | null} = {current: null};

        render(
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formDataRef.current = new FormData(e.currentTarget);
                }}
            >
                <Select name="number" options={[{value: 42, content: 'Forty-two'}]} value={[42]} />
                <Select name="object" options={[{value: item, content: 'First'}]} value={[item]} />
                <button type="submit" data-qa="submit">
                    Submit
                </button>
            </form>,
        );

        await user.click(screen.getByTestId('submit'));

        expect(formDataRef.current?.get('number')).toBe('42');
        expect(JSON.parse(formDataRef.current?.get('object') as string)).toEqual(item);
    });

    it('selects and updates number values in single mode', async () => {
        const onUpdate = jest.fn();

        render(
            <Select
                qa="select"
                defaultValue={[1]}
                options={[
                    {value: 1, content: 'One'},
                    {value: 2, content: 'Two'},
                ]}
                onUpdate={onUpdate}
            />,
        );

        expect(screen.getByTestId('select')).toHaveTextContent('One');

        await user.click(screen.getByTestId('select'));
        await user.click(screen.getByText('Two'));

        expect(onUpdate).toHaveBeenCalledWith([2]);
        expect(screen.getByTestId('select')).toHaveTextContent('Two');
    });

    it('clears number values with onUpdate([])', async () => {
        const onUpdate = jest.fn();

        render(
            <Select
                qa="select"
                hasClear
                value={[1]}
                options={[{value: 1, content: 'One'}]}
                onUpdate={onUpdate}
            />,
        );

        await user.click(screen.getByTestId(SelectQa.CLEAR));

        expect(onUpdate).toHaveBeenCalledWith([]);
    });

    it('marks object values selected by reference', async () => {
        const alice = {id: 1, name: 'Alice'};
        const bob = {id: 2, name: 'Bob'};

        render(
            <Select
                qa="select"
                multiple
                value={[bob]}
                options={[
                    {value: alice, content: 'Alice'},
                    {value: bob, content: 'Bob'},
                ]}
            />,
        );

        await user.click(screen.getByTestId('select'));

        expect(screen.getByRole('option', {name: 'Bob'})).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('option', {name: 'Alice'})).toHaveAttribute(
            'aria-selected',
            'false',
        );
    });

    it('falls back to serialized value for trigger text', () => {
        render(<Select qa="select" value={[42]} options={[{value: 42}]} />);

        expect(screen.getByTestId('select')).toHaveTextContent('42');
    });

    it('filters options with number values without crashing', async () => {
        render(<Select qa="select" filterable options={[{value: 42}, {value: 7}]} />);

        await user.click(screen.getByTestId('select'));

        expect(screen.getAllByRole('option')).toHaveLength(2);

        // the default filter matches against the serialized value when no content is set
        await user.keyboard('4');

        expect(screen.getAllByRole('option')).toHaveLength(1);
    });

    it('treats numeric 0 as a present value for control styling', () => {
        render(<Select qa="select" value={[0]} options={[{value: 0, content: 'Zero'}]} />);

        expect(screen.getByRole('group')).toHaveClass(getHasValueClass());
    });

    it('keeps empty string values absent for control styling', () => {
        render(<Select qa="select" value={['']} options={[{value: '', content: 'Empty'}]} />);

        expect(screen.getByRole('group')).not.toHaveClass(getHasValueClass());
    });
});
