import {cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    TEST_QA,
    SELECT_CONTROL_ACTIVE_CLASS,
    DEFAULT_OPTIONS,
    GROUPED_OPTIONS,
    OptionsListType,
    setup,
} from './utils';

afterEach(cleanup);

const onUpdate = jest.fn();
const onOpenChange = jest.fn();
const SELECTED_OPTIONS = [DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[1]];

describe('Select multiple mode actions', () => {
    describe('select options by click in', () => {
        test.each([
            [OptionsListType.FLAT, SELECTED_OPTIONS],
            [OptionsListType.GROUPED, SELECTED_OPTIONS],
        ])('%s list', async (type, selectedOptions) => {
            const options = type === 'grouped' ? GROUPED_OPTIONS : DEFAULT_OPTIONS;
            const {getByTestId, getByText} = setup({
                options,
                multiple: true,
                onUpdate,
                onOpenChange,
            });
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            // open select popup
            await user.click(selectControl);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            let option = getByText(selectedOptions[0].content as string);
            // select first option
            await user.click(option);
            expect(onUpdate).toHaveBeenLastCalledWith([selectedOptions[0].value]);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            option = getByText(selectedOptions[1].content as string);
            // select second option
            await user.click(option);
            expect(onUpdate).toHaveBeenLastCalledWith([
                selectedOptions[0].value,
                selectedOptions[1].value,
            ]);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            // close select popup
            await user.keyboard('[Escape]');
            expect(selectControl).not.toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
        });
    });

    describe('deselect options by click in', () => {
        test.each([
            [OptionsListType.FLAT, SELECTED_OPTIONS],
            [OptionsListType.GROUPED, SELECTED_OPTIONS],
        ])('%s list', async (type, selectedOptions) => {
            const options = type === 'grouped' ? GROUPED_OPTIONS : DEFAULT_OPTIONS;
            const {getByTestId, getByText} = setup({
                options,
                value: [selectedOptions[0].value, selectedOptions[1].value],
                multiple: true,
                onUpdate,
                onOpenChange,
            });
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            // open select popup
            await user.click(selectControl);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            const option = getByText(selectedOptions[0].content as string);
            // deselect first option
            await user.click(option);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            expect(onUpdate).toHaveBeenLastCalledWith([selectedOptions[1].value]);
            // close select popup
            await user.keyboard('[Escape]');
            expect(selectControl).not.toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
        });
    });

    describe('select option by', () => {
        test.each([
            ['Enter', OptionsListType.FLAT, SELECTED_OPTIONS],
            ['Enter', OptionsListType.GROUPED, SELECTED_OPTIONS],
            ['Space', OptionsListType.FLAT, SELECTED_OPTIONS],
            ['Space', OptionsListType.GROUPED, SELECTED_OPTIONS],
        ])('%s in %s list', async (key, type, selectedOptions) => {
            const options = type === 'grouped' ? GROUPED_OPTIONS : DEFAULT_OPTIONS;
            const {getByTestId} = setup({options, multiple: true, onUpdate, onOpenChange});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            await user.keyboard('[Tab]');
            // open select popup
            await user.keyboard(`[${key}]`);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            // select active option (first option by default)
            await user.keyboard(`[${key}]`);
            expect(onUpdate).toHaveBeenLastCalledWith([selectedOptions[0].value]);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            // focus next option
            await user.keyboard('[ArrowDown]');
            // select next option
            await user.keyboard(`[${key}]`);
            expect(onUpdate).toHaveBeenCalledWith([
                selectedOptions[0].value,
                selectedOptions[1].value,
            ]);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            // close select popup
            await user.keyboard('[Escape]');
            expect(selectControl).not.toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
        });
    });

    describe('deselect option by', () => {
        test.each([
            ['Enter', OptionsListType.FLAT, SELECTED_OPTIONS],
            ['Enter', OptionsListType.GROUPED, SELECTED_OPTIONS],
            ['Space', OptionsListType.FLAT, SELECTED_OPTIONS],
            ['Space', OptionsListType.GROUPED, SELECTED_OPTIONS],
        ])('%s in %s list', async (key, type, selectedOptions) => {
            const options = type === 'grouped' ? GROUPED_OPTIONS : DEFAULT_OPTIONS;
            const {getByTestId} = setup({
                options,
                value: [selectedOptions[0].value, selectedOptions[1].value],
                multiple: true,
                onUpdate,
                onOpenChange,
            });
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            await user.keyboard('[Tab]');
            // open select popup
            await user.keyboard(`[${key}]`);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            // select active option (first option by default)
            await user.keyboard(`[${key}]`);
            expect(onUpdate).toHaveBeenLastCalledWith([selectedOptions[1].value]);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            // focus next option
            await user.keyboard('[ArrowDown]');
            // select next option
            await user.keyboard(`[${key}]`);
            expect(onUpdate).toHaveBeenCalledWith([]);
            expect(selectControl).toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
            // close select popup
            await user.keyboard('[Escape]');
            expect(selectControl).not.toHaveClass(SELECT_CONTROL_ACTIVE_CLASS);
        });
    });
});
