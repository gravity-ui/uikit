import React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen, within} from '../../../../test-utils/utils';
import type {ButtonSize} from '../../Button/Button';
import type {EmojiOption} from '../EmojiPalette';
import {EmojiPalette} from '../EmojiPalette';

const qaId = 'emoji-palette-component';

const options: EmojiOption[] = [
    {icon: '😎', value: 'ID-cool'},
    {icon: '🥴', value: 'ID-woozy'},
];

describe('EmojiPalette', () => {
    test('render EmojiPalette by default', () => {
        render(<EmojiPalette options={options} qa={qaId} />);

        const component = screen.getByTestId(qaId);

        expect(component).toBeVisible();
    });

    test.each(new Array<ButtonSize>('s', 'm', 'l', 'xl'))('render with given "%s" size', (size) => {
        render(<EmojiPalette options={options} size={size} qa={qaId} />);

        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(`g-emoji-palette_size_${size}`);
    });

    test('all children are disabled when disabled=true prop is given', () => {
        render(<EmojiPalette options={options} disabled={true} qa={qaId} />);

        const component = screen.getByTestId(qaId);
        const emojis = within(component).getAllByRole('button');

        emojis.forEach((radio: HTMLElement) => {
            expect(radio).toBeDisabled();
        });
    });

    test('all children are not disabled when disabled=false prop is given', () => {
        render(<EmojiPalette options={options} disabled={false} qa={qaId} />);

        const component = screen.getByTestId(qaId);
        const radios = within(component).getAllByRole('button');

        radios.forEach((radio: HTMLElement) => {
            expect(radio).not.toBeDisabled();
        });
    });

    test('a proper emoji is disabled when disabled=false prop is given to one of the options', () => {
        const customOptions: EmojiOption[] = [
            {icon: '🥶', value: 'ID-cold-face', disabled: true},
            ...options,
        ];

        render(<EmojiPalette options={customOptions} disabled={false} qa={qaId} />);

        const component = screen.getByTestId(qaId);
        const emojis = within(component).getAllByRole('button');

        emojis.forEach((emoji: HTMLElement) => {
            const value = emoji.getAttribute('value');

            if (value === customOptions[0].value) {
                expect(emoji).toBeDisabled();
            } else {
                expect(emoji).not.toBeDisabled();
            }
        });
    });

    test('show given emoji', () => {
        render(<EmojiPalette options={options} disabled={false} qa={qaId} />);

        const text = screen.getByText(options[0].icon as string);

        expect(text).toBeVisible();
    });

    test('add className', () => {
        const className = 'my-class';

        render(<EmojiPalette options={options} className={className} disabled={false} qa={qaId} />);

        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });

    test('add style', () => {
        const style = {color: 'red'};

        render(<EmojiPalette options={options} style={style} disabled={false} qa={qaId} />);

        const component = screen.getByTestId(qaId);

        expect(component).toHaveStyle(style);
    });

    test('can (un)select an emoji', async () => {
        const user = userEvent.setup();

        render(<EmojiPalette options={options} defaultValue={[options[0].value]} qa={qaId} />);

        const component = screen.getByTestId(qaId);
        const emojis = within(component).getAllByRole('button');

        const firstEmoji = await screen.findByText(options[0].icon as string);
        const secondEmoji = await screen.findByText(options[1].icon as string);

        // Check initial state [selected, unselected]

        emojis.forEach((emoji: HTMLElement) => {
            const value = emoji.getAttribute('value');
            const isSelected = emoji.getAttribute('aria-pressed');

            if (value === options[0].value) {
                expect(isSelected).toBe('true');
            } else {
                expect(isSelected).toBe('false');
            }
        });

        // Click on both: [selected, unselected] -> [unselected, selected]
        await user.click(firstEmoji);
        await user.click(secondEmoji);

        emojis.forEach((emoji: HTMLElement) => {
            const value = emoji.getAttribute('value');
            const isSelected = emoji.getAttribute('aria-pressed');

            if (value === options[0].value) {
                expect(isSelected).toBe('false');
            } else {
                expect(isSelected).toBe('true');
            }
        });

        // Click on the second emoji: [unselected, selected] -> [unselected, unselected]
        await user.click(secondEmoji);

        emojis.forEach((emoji: HTMLElement) => {
            const isSelected = emoji.getAttribute('aria-pressed');
            expect(isSelected).toBe('false');
        });
    });
});
