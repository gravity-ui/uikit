import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {Select} from '..';
import type {SelectOption} from '..';
import {render, screen} from '../../../../test-utils/utils';
import {DefaultPropsProvider} from '../../theme';
import {SelectQa} from '../constants';

const SELECT_ID = 'value-select';
const QA = 'value-select-qa';

type City = {id: number; name: string};

const MOSCOW: City = {id: 1, name: 'Moscow'};
const PARIS: City = {id: 2, name: 'Paris'};
const CITY_OPTIONS: SelectOption<unknown, City>[] = [
    {value: MOSCOW, content: MOSCOW.name},
    {value: PARIS, content: PARIS.name},
];
const getCityKey = (city: City) => String(city.id);

const NUMBER_OPTIONS = [
    {value: 0, content: 'Zero'},
    {value: 1, content: 'One'},
    {value: 2, content: 'Two'},
];

const getControl = () => screen.getByTestId(QA);
const getRow = (name: string) => screen.getByRole('option', {name});
const HAS_VALUE_CLASS = 'g-select-control_has-value';
const queryClear = () => screen.queryByRole('button', {name: 'Clear'});

describe('Select with non-string values', () => {
    test('uses non-string values from default props', async () => {
        const onUpdate = jest.fn();
        render(
            <DefaultPropsProvider
                defaultProps={{Select: {options: NUMBER_OPTIONS, defaultValue: [0], onUpdate}}}
            >
                <Select<unknown, number> qa={QA} />
            </DefaultPropsProvider>,
        );
        const user = userEvent.setup();

        expect(getControl()).toHaveTextContent('Zero');
        await user.click(getControl());
        await user.click(getRow('Two'));
        expect(onUpdate).toHaveBeenCalledWith([2]);
    });

    describe('numbers', () => {
        test('`0` is a value: the control shows it and can clear it', async () => {
            const onUpdate = jest.fn();
            render(
                <Select
                    qa={QA}
                    hasClear
                    options={NUMBER_OPTIONS}
                    value={[0]}
                    onUpdate={onUpdate}
                />,
            );
            const user = userEvent.setup();

            expect(getControl()).toHaveTextContent('Zero');
            await user.click(screen.getByRole('button', {name: 'Clear'}));
            expect(onUpdate).toHaveBeenLastCalledWith([]);
        });

        test('a number without content is its own text: the control and the filter', async () => {
            const onUpdate = jest.fn();
            render(
                <Select
                    id={SELECT_ID}
                    qa={QA}
                    filterable
                    options={[{value: 10}, {value: 25}, {value: 30}]}
                    defaultValue={[10]}
                    onUpdate={onUpdate}
                />,
            );
            const user = userEvent.setup();

            expect(getControl()).toHaveTextContent('10');
            await user.click(getControl());
            await user.keyboard('2');
            expect(screen.getAllByRole('option').map((row) => row.id)).toEqual([
                `select-popup-${SELECT_ID}-item-25`,
            ]);
            await user.keyboard('{Enter}');
            expect(onUpdate).toHaveBeenLastCalledWith([25]);
        });

        test('the search by the first letters finds a number', async () => {
            render(<Select qa={QA} options={NUMBER_OPTIONS.map(({value}) => ({value}))} />);
            const user = userEvent.setup();

            await user.click(getControl());
            await user.keyboard('2{Enter}');
            expect(getControl()).toHaveTextContent('2');
        });
    });

    describe('objects', () => {
        test('a structural copy of a value selects the option by its key', async () => {
            render(
                <Select
                    qa={QA}
                    options={CITY_OPTIONS}
                    getValueKey={getCityKey}
                    value={[{...PARIS}]}
                />,
            );
            const user = userEvent.setup();

            expect(getControl()).toHaveTextContent('Paris');
            await user.click(getControl());
            expect(getRow('Paris')).toHaveAttribute('aria-selected', 'true');
            expect(getRow('Moscow')).toHaveAttribute('aria-selected', 'false');
        });

        test('the update carries the values themselves, the selected one included', async () => {
            const onUpdate = jest.fn((value: City[]) => value);
            const selected = {...MOSCOW};
            render(
                <Select
                    qa={QA}
                    multiple
                    options={CITY_OPTIONS}
                    getValueKey={getCityKey}
                    defaultValue={[selected]}
                    onUpdate={onUpdate}
                />,
            );
            const user = userEvent.setup();

            await user.click(getControl());
            await user.click(getRow('Paris'));
            expect(onUpdate.mock.lastCall?.[0][0]).toBe(selected);
            expect(onUpdate.mock.lastCall?.[0][1]).toBe(PARIS);

            await user.keyboard('{ArrowUp}{ }');
            expect(onUpdate).toHaveBeenLastCalledWith([PARIS]);
        });

        test('the filter and Enter select an object value', async () => {
            const onUpdate = jest.fn();
            render(
                <Select
                    qa={QA}
                    filterable
                    options={CITY_OPTIONS}
                    getValueKey={getCityKey}
                    onUpdate={onUpdate}
                />,
            );
            const user = userEvent.setup();

            await user.click(getControl());
            await user.keyboard('par{Enter}');
            expect(onUpdate).toHaveBeenLastCalledWith([PARIS]);
        });

        test('the search by the first letters selects an object value', async () => {
            const onUpdate = jest.fn();
            render(
                <Select
                    qa={QA}
                    options={CITY_OPTIONS}
                    getValueKey={getCityKey}
                    onUpdate={onUpdate}
                />,
            );
            const user = userEvent.setup();

            await user.click(getControl());
            await user.keyboard('m{Enter}');
            expect(onUpdate).toHaveBeenLastCalledWith([MOSCOW]);
        });

        test('a value without an option is shown by its key and kept', async () => {
            const onUpdate = jest.fn();
            const gone: City = {id: 9, name: 'Atlantis'};
            render(
                <Select
                    qa={QA}
                    multiple
                    options={CITY_OPTIONS}
                    getValueKey={getCityKey}
                    defaultValue={[gone]}
                    onUpdate={onUpdate}
                />,
            );
            const user = userEvent.setup();

            expect(getControl()).toHaveTextContent('9');
            await user.click(getControl());
            await user.click(getRow('Moscow'));
            expect(onUpdate).toHaveBeenLastCalledWith([gone, MOSCOW]);
        });
    });

    describe('empty values', () => {
        test("`''` with an option is a value", async () => {
            render(
                <Select
                    qa={QA}
                    hasClear
                    options={[
                        {value: '', content: 'None'},
                        {value: 'a', content: 'A'},
                    ]}
                    value={['']}
                />,
            );
            const user = userEvent.setup();

            expect(getControl()).toHaveTextContent('None');
            expect(screen.getByRole('group')).toHaveClass(HAS_VALUE_CLASS);
            expect(queryClear()).toBeInTheDocument();
            await user.click(getControl());
            expect(getRow('None')).toHaveAttribute('aria-selected', 'true');
        });

        test("`''` with an option of no text hides the placeholder", () => {
            render(<Select qa={QA} placeholder="Pick" options={[{value: ''}]} value={['']} />);

            expect(getControl()).not.toHaveTextContent('Pick');
        });

        test.each([[''], [null]])('`%p` without an option is empty', (empty) => {
            const renderSelectedOptions = jest.fn();
            render(
                <Select<unknown, string | null>
                    qa={QA}
                    hasClear
                    placeholder="Pick"
                    options={[{value: 'a', content: 'A'}]}
                    value={[empty]}
                    renderSelectedOptions={renderSelectedOptions}
                />,
            );

            expect(getControl()).toHaveTextContent('Pick');
            expect(screen.getByRole('group')).not.toHaveClass(HAS_VALUE_CLASS);
            expect(queryClear()).not.toBeInTheDocument();
            expect(renderSelectedOptions).not.toHaveBeenCalled();
        });

        test('an empty value without an option is not counted', () => {
            render(
                <Select
                    qa={QA}
                    multiple
                    hasCounter
                    options={[{value: 'a', content: 'A'}]}
                    value={['', 'a']}
                />,
            );

            expect(getControl()).toHaveTextContent(/^A/);
            expect(screen.getByTestId(SelectQa.COUNTER)).toHaveTextContent('1');
        });

        test('a form sends an empty value without an option as an empty string', async () => {
            let submitted: FormDataEntryValue[] = [];
            const onSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                submitted = new FormData(event.currentTarget).getAll('letter');
            });
            render(
                <form onSubmit={onSubmit}>
                    <Select<unknown, string | null>
                        name="letter"
                        multiple
                        options={[{value: 'a', content: 'A'}]}
                        value={[null, 'a']}
                    />
                    <button type="submit" data-qa="submit" />
                </form>,
            );
            const user = userEvent.setup();

            await user.click(screen.getByTestId('submit'));
            expect(submitted).toEqual(['', 'a']);
        });

        test.each([[0], [false]])('`%p` without an option is a value', (item) => {
            render(<Select<unknown, number | boolean> qa={QA} options={[]} value={[item]} />);

            expect(getControl()).toHaveTextContent(String(item));
            expect(screen.getByRole('group')).toHaveClass(HAS_VALUE_CLASS);
        });
    });

    describe('warnings', () => {
        let consoleError: jest.SpyInstance;

        beforeEach(() => {
            consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleError.mockRestore();
        });

        const expectWarning = (text: string) => {
            expect(consoleError).toHaveBeenCalledWith(expect.stringContaining(text));
        };

        test('`1` and `"1"` in one Select share a key and are reported as duplicates', () => {
            render(
                <Select<unknown, number | string>
                    options={[
                        {value: 1, content: 'Number'},
                        {value: '1', content: 'String'},
                    ]}
                />,
            );

            expectWarning('More than one option has the value "1"');
        });

        test('an object without `getValueKey` is reported', () => {
            render(<Select options={CITY_OPTIONS} />);

            expectWarning('pass `getValueKey`');
        });

        test('an object without a text of its own is reported', () => {
            render(
                <Select options={[{value: MOSCOW}]} getValueKey={getCityKey} value={[MOSCOW]} />,
            );

            expectWarning('Pass `getOptionText`');
        });
    });

    describe('form', () => {
        test('the field holds the key of a value and the reset brings the value back', async () => {
            let submitted: FormDataEntryValue[] = [];
            const onSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                submitted = new FormData(event.currentTarget).getAll('city');
            });
            render(
                <form onSubmit={onSubmit}>
                    <Select
                        qa={QA}
                        name="city"
                        options={CITY_OPTIONS}
                        getValueKey={getCityKey}
                        defaultValue={[MOSCOW]}
                    />
                    <input type="reset" data-qa="reset" />
                    <button type="submit" data-qa="submit" />
                </form>,
            );
            const user = userEvent.setup();

            await user.click(screen.getByTestId('submit'));
            expect(submitted).toEqual(['1']);

            await user.click(getControl());
            await user.click(getRow('Paris'));

            await user.click(screen.getByTestId('reset'));
            expect(getControl()).toHaveTextContent('Moscow');
        });
    });

    test('types: the value follows the options, `ComponentProps` keeps the string', () => {
        const props: React.ComponentProps<typeof Select> = {
            // @ts-expect-error a value of `ComponentProps` is a string
            value: [1],
        };

        render(
            <React.Fragment>
                <Select {...props} />
                <Select options={NUMBER_OPTIONS} onUpdate={(value: number[]) => value} />
                {/* @ts-expect-error a string value for number options */}
                <Select options={NUMBER_OPTIONS} value={['1']} />
                {/* @ts-expect-error the key getter takes the value */}
                <Select options={CITY_OPTIONS} getValueKey={(city: string) => city} />
                <Select
                    options={CITY_OPTIONS}
                    getValueKey={(city) => String(city.id)}
                    onUpdate={(value) => value.map((city) => city.name)}
                />
                <Select value={[1]}>
                    {/* @ts-expect-error the value of a child is a string unless named */}
                    <Select.Option value={1}>One</Select.Option>
                    <Select.Option<unknown, number> value={2}>Two</Select.Option>
                </Select>
            </React.Fragment>,
        );
    });
});
