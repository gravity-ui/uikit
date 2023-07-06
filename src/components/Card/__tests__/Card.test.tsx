import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Button} from '../../Button';
import {Card} from '../Card';
import type {CardSize, CardTheme, CardType, CardView} from '../Card';

const qaId = 'card-component';
const cardText = 'Some text';

const cardSizes: CardSize[] = ['l', 'm'];

const cardThemes: CardTheme[] = ['danger', 'info', 'normal', 'positive', 'warning'];

const cardTypes: CardType[] = ['action', 'container', 'selection'];

const cardViews: CardView[] = ['outlined', 'clear', 'outlined', 'filled', 'raised', 'raised'];

describe('Card', () => {
    test('render card by default', () => {
        render(<Card qa={qaId}>{cardText}</Card>);
        const card = screen.getByText(cardText);

        expect(card).toBeVisible();
    });

    test.each(cardThemes)('render with given "%s" theme', (theme) => {
        render(
            <Card theme={theme} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByTestId(qaId);

        expect(card).toHaveClass(`yc-card_theme_${theme}`);
    });

    test.each(cardSizes)('render with given "%s" size', (size) => {
        render(
            <Card size={size} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByTestId(qaId);

        expect(card).toHaveClass(`yc-card_size_${size}`);
    });

    test.each(cardViews)('render with given "%s" view', (view) => {
        render(
            <Card view={view} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByTestId(qaId);

        expect(card).toHaveClass(`yc-card_view_${view}`);
    });

    test.each(cardTypes)('render with given "%s" type', (type) => {
        render(
            <Card type={type} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByTestId(qaId);

        expect(card).toHaveClass(`yc-card_type_${type}`);
    });

    test('selected when selected=true prop is given', () => {
        render(
            <Card selected={true} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByText(cardText);

        expect(card).toBeVisible();
        expect(card).toHaveClass('yc-card_selected');
    });

    test('not selected when selected=false prop is given', () => {
        render(
            <Card selected={false} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByText(cardText);

        expect(card).toBeVisible();
        expect(card).not.toHaveClass('yc-card_selected');
    });

    test('disabled when disabled=true prop is given', () => {
        render(
            <Card disabled={true} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByText(cardText);

        expect(card).toHaveClass('yc-card_disabled');
    });

    test('not disabled when disabled=false prop is given', () => {
        render(
            <Card disabled={false} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByText(cardText);

        expect(card).not.toHaveClass('yc-card_disabled');
    });

    test('show given content', () => {
        const content = 'Some content';

        render(<Card>{content}</Card>);
        const text = screen.getByText(content);

        expect(text).toBeVisible();
    });

    test('show given children', () => {
        const childrenText = 'Children content';

        render(
            <Card>
                <span>{childrenText}</span>
            </Card>,
        );
        const text = screen.getByText(childrenText);

        expect(text).toBeVisible();
    });

    test('add className', () => {
        const className = 'my-class';

        render(
            <Card className={className} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByTestId(qaId);

        expect(card).toHaveClass(className);
    });

    test('add style', () => {
        const style = {color: 'red'};

        render(
            <Card style={style} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByTestId(qaId);

        expect(card).toHaveStyle(style);
    });

    test('use passed ref for component', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <Card ref={ref} qa={qaId}>
                {cardText}
            </Card>,
        );
        const card = screen.getByTestId(qaId);

        expect(ref.current).toBe(card);
    });

    test('call onClick if type="action"', async () => {
        const user = userEvent.setup();
        const handleOnClick = jest.fn();
        render(
            <Card type="action" onClick={handleOnClick} qa={qaId}>
                {cardText}
            </Card>,
        );

        const card = screen.getByText(cardText);

        await user.click(card);
        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });

    test('call onClick if type="selection"', async () => {
        const user = userEvent.setup();
        const handleOnClick = jest.fn();
        render(
            <Card type="selection" onClick={handleOnClick} qa={qaId}>
                {cardText}
            </Card>,
        );

        const card = screen.getByText(cardText);

        await user.click(card);
        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });

    test('ignore onClick if type!="container"', async () => {
        const user = userEvent.setup();
        const handleOnClick = jest.fn();
        render(
            <Card type="container" onClick={handleOnClick} qa={qaId}>
                {cardText}
            </Card>,
        );

        const card = screen.getByText(cardText);

        await user.click(card);
        expect(handleOnClick).toHaveBeenCalledTimes(0);
    });

    describe('should respond to clicks correctly', () => {
        test('reacts to keystrokes if focused', async () => {
            const user = userEvent.setup();
            const handleOnClick = jest.fn();
            render(
                <Card type="action" onClick={handleOnClick} qa={qaId}>
                    {cardText}
                </Card>,
            );

            const card = screen.getByText(cardText);

            card.focus();
            await user.keyboard('[Space]');
            await user.keyboard('[Enter]');

            expect(handleOnClick).toHaveBeenCalledTimes(2);
        });

        test('ignores keystrokes if not focused', async () => {
            const user = userEvent.setup();
            const handleOnClick = jest.fn();
            render(
                <Card type="action" onClick={handleOnClick} qa={qaId}>
                    {cardText}
                </Card>,
            );

            const card = screen.getByText(cardText);

            card.focus();

            card.blur();

            await user.keyboard('[Enter]');

            expect(handleOnClick).toHaveBeenCalledTimes(0);
        });

        test('has the role of a button if type="action"', async () => {
            const handleOnClick = jest.fn();
            render(
                <Card type="action" onClick={handleOnClick} qa={qaId}>
                    {cardText}
                </Card>,
            );

            const card = screen.getByRole('button');

            expect(card).toBeDefined();
        });

        test('should be able to focus through the keyboard', async () => {
            const user = userEvent.setup();
            const handleOnClick = jest.fn();
            render(
                <Card type="action" onClick={handleOnClick} qa={qaId}>
                    {cardText}
                </Card>,
            );

            const card = screen.getByTestId(qaId);

            await user.keyboard('[Tab]');

            expect(card).toHaveFocus();
        });

        test('should take over the focus after the active element', async () => {
            const user = userEvent.setup();
            const handleOnClick = jest.fn();

            const noopButtonQaId = 'noop-button';

            render(
                <React.Fragment>
                    <Button qa={noopButtonQaId}>Some noop button</Button>
                    <Card type="action" onClick={handleOnClick} qa={qaId}>
                        {cardText}
                    </Card>
                </React.Fragment>,
            );

            const noopButton = screen.getByTestId(noopButtonQaId);
            noopButton.focus();

            const card = screen.getByTestId(qaId);

            await user.keyboard('[Tab]');

            expect(card).toHaveFocus();
        });

        const testCases: {type: CardType; expected: number; keys: string[]}[] = [
            {type: 'action', expected: 0, keys: ['Enter']},
            {type: 'action', expected: 0, keys: ['Space']},
            {type: 'action', expected: 0, keys: ['K']},
            {type: 'action', expected: 0, keys: ['Enter', 'Space']},

            {type: 'action', expected: 1, keys: ['Tab', 'Enter']},
            {type: 'action', expected: 1, keys: ['Tab', 'Space']},
            {type: 'action', expected: 0, keys: ['Tab', 'K']},
            {type: 'action', expected: 2, keys: ['Tab', 'Enter', 'Space']},

            {type: 'action', expected: 0, keys: ['Tab', 'Tab', 'Enter']},
            {type: 'action', expected: 0, keys: ['Tab', 'Tab', 'Space']},
            {type: 'action', expected: 0, keys: ['Tab', 'Tab', 'K']},
            {type: 'action', expected: 0, keys: ['Tab', 'Tab', 'Enter', 'Space']},

            {type: 'action', expected: 1, keys: ['Tab', 'Enter', 'Tab']},
            {type: 'action', expected: 1, keys: ['Tab', 'Space', 'Tab']},
            {type: 'action', expected: 0, keys: ['Tab', 'K', 'Tab']},
            {type: 'action', expected: 1, keys: ['Tab', 'Enter', 'Tab', 'Space']},

            {type: 'container', expected: 0, keys: ['Tab', 'Enter']},

            {type: 'selection', expected: 0, keys: ['Enter']},
            {type: 'selection', expected: 0, keys: ['Space']},
            {type: 'selection', expected: 0, keys: ['K']},
            {type: 'selection', expected: 0, keys: ['Enter', 'Space']},

            {type: 'selection', expected: 1, keys: ['Tab', 'Enter']},
            {type: 'selection', expected: 1, keys: ['Tab', 'Space']},
            {type: 'selection', expected: 0, keys: ['Tab', 'K']},
            {type: 'selection', expected: 2, keys: ['Tab', 'Enter', 'Space']},

            {type: 'selection', expected: 0, keys: ['Tab', 'Tab', 'Enter']},
            {type: 'selection', expected: 0, keys: ['Tab', 'Tab', 'Space']},
            {type: 'selection', expected: 0, keys: ['Tab', 'Tab', 'K']},
            {type: 'selection', expected: 0, keys: ['Tab', 'Tab', 'Enter', 'Space']},

            {type: 'selection', expected: 1, keys: ['Tab', 'Enter', 'Tab']},
            {type: 'selection', expected: 1, keys: ['Tab', 'Space', 'Tab']},
            {type: 'selection', expected: 0, keys: ['Tab', 'K', 'Tab']},
            {type: 'selection', expected: 1, keys: ['Tab', 'Enter', 'Tab', 'Space']},
        ];

        test.each(testCases)('%s in %s list', async ({type, expected, keys}) => {
            const user = userEvent.setup();
            const handleOnClick = jest.fn();

            const noopButtonQaId = 'noop-button';

            render(
                <React.Fragment>
                    <Button qa={noopButtonQaId}>Some noop button</Button>
                    <Card type={type} onClick={handleOnClick} qa={qaId}>
                        {cardText}
                    </Card>
                </React.Fragment>,
            );

            const noopButton = screen.getByTestId(noopButtonQaId);
            noopButton.focus();

            for (const key of keys) {
                await user.keyboard(`[${key}]`);
            }

            expect(handleOnClick).toHaveBeenCalledTimes(expected);
        });
    });
});
