import userEvent from '@testing-library/user-event';

import {render, screen, within} from '../../../../test-utils/utils';
import type {ButtonSize} from '../../Button/Button';
import type {PaletteOption} from '../Palette';
import {Palette} from '../Palette';

const qaId = 'palette-component';

const defaultOptions: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];

describe('Palette', () => {
    test('render Palette by default', () => {
        render(<Palette options={defaultOptions} qa={qaId} />);

        const $component = screen.getByTestId(qaId);

        expect($component).toBeVisible();
    });

    test.each(new Array<ButtonSize>('s', 'm', 'l', 'xl'))('render with given "%s" size', (size) => {
        render(<Palette options={defaultOptions} size={size} qa={qaId} />);

        const $component = screen.getByTestId(qaId);

        expect($component).toHaveClass(`g-palette_size_${size}`);
    });

    test('all children are disabled when disabled=true prop is given', () => {
        render(<Palette options={defaultOptions} disabled={true} qa={qaId} />);

        const $component = screen.getByTestId(qaId);
        const $options = within($component).getAllByRole('button');

        $options.forEach(($option: HTMLElement) => {
            expect($option).toBeDisabled();
        });
    });

    test('all children are not disabled when disabled=false prop is given', () => {
        render(<Palette options={defaultOptions} disabled={false} qa={qaId} />);

        const $component = screen.getByTestId(qaId);
        const $options = within($component).getAllByRole('button');

        $options.forEach(($option: HTMLElement) => {
            expect($option).not.toBeDisabled();
        });
    });

    test('a proper option is disabled when disabled=false prop is given to one of the options', () => {
        const customOptions: PaletteOption[] = [
            {content: '🥶', value: 'ID-cold-face', disabled: true},
            ...defaultOptions,
        ];

        render(<Palette options={customOptions} disabled={false} qa={qaId} />);

        const $component = screen.getByTestId(qaId);
        const $options = within($component).getAllByRole('button');

        $options.forEach(($option: HTMLElement) => {
            const value = $option.getAttribute('value');

            if (value === customOptions[0].value) {
                expect($option).toBeDisabled();
            } else {
                expect($option).not.toBeDisabled();
            }
        });
    });

    test('show given option', () => {
        render(<Palette options={defaultOptions} disabled={false} qa={qaId} />);

        const text = screen.getByText(defaultOptions[0].content as string);

        expect(text).toBeVisible();
    });

    test('add className', () => {
        const className = 'my-class';

        render(
            <Palette options={defaultOptions} className={className} disabled={false} qa={qaId} />,
        );

        const $component = screen.getByTestId(qaId);

        expect($component).toHaveClass(className);
    });

    test('add style', () => {
        const style = {color: 'red'};

        render(<Palette options={defaultOptions} style={style} disabled={false} qa={qaId} />);

        const $component = screen.getByTestId(qaId);

        expect($component).toHaveStyle(style);
    });

    test('can (un)select an option', async () => {
        const user = userEvent.setup();

        render(
            <Palette options={defaultOptions} defaultValue={[defaultOptions[0].value]} qa={qaId} />,
        );

        const $component = screen.getByTestId(qaId);
        const $options = within($component).getAllByRole('button');

        const $firstOption = await screen.findByText(defaultOptions[0].content as string);
        const $secondOption = await screen.findByText(defaultOptions[1].content as string);

        // Check initial state [selected, unselected]

        $options.forEach(($option: HTMLElement) => {
            const value = $option.getAttribute('value');
            const isSelected = $option.getAttribute('aria-pressed');

            if (value === defaultOptions[0].value) {
                expect(isSelected).toBe('true');
            } else {
                expect(isSelected).toBe('false');
            }
        });

        // Click on both: [selected, unselected] -> [unselected, selected]
        await user.click($firstOption);
        await user.click($secondOption);

        $options.forEach(($option: HTMLElement) => {
            const value = $option.getAttribute('value');
            const isSelected = $option.getAttribute('aria-pressed');

            if (value === defaultOptions[0].value) {
                expect(isSelected).toBe('false');
            } else {
                expect(isSelected).toBe('true');
            }
        });

        // Click on the second option: [unselected, selected] -> [unselected, unselected]
        await user.click($secondOption);

        $options.forEach(($option: HTMLElement) => {
            const isSelected = $option.getAttribute('aria-pressed');
            expect(isSelected).toBe('false');
        });
    });
});
