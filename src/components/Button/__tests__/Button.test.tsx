import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    TEST_CHILDREN,
    TEST_CLASS_NAME,
    TEST_ID,
    TEST_STYLE,
    TEST_TITLE,
} from '@uikit/__fixtures__/consts';

import {GearIcon} from '../../icons/GearIcon';
import {Button} from '../Button';
import type {ButtonPin, ButtonProps, ButtonSize, ButtonView} from '../Button';

const qaId = 'button-component';

const buttonViews: ButtonView[] = [
    'normal',
    'action',
    'outlined',
    'outlined-info',
    'outlined-danger',
    'raised',
    'flat',
    'flat-info',
    'flat-danger',
    'flat-secondary',
    'normal-contrast',
    'outlined-contrast',
    'flat-contrast',
];

const buttonPins: ButtonPin[] = [
    'round-round',
    'brick-brick',
    'clear-clear',
    'circle-circle',
    'round-brick',
    'brick-round',
    'round-clear',
    'clear-round',
    'brick-clear',
    'clear-brick',
    'circle-brick',
    'brick-circle',
    'circle-clear',
    'clear-circle',
];

describe('Button', () => {
    test('render button by default', () => {
        render(<Button />);
        const button = screen.getByRole('button');

        expect(button).toBeVisible();
        expect(button).not.toBeDisabled();
    });

    test.each(new Array<ButtonSize>('xs', 's', 'm', 'l', 'xl'))(
        'render with given "%s" size',
        (size) => {
            render(<Button size={size} qa={qaId} />);
            const button = screen.getByTestId(qaId);

            expect(button).toHaveClass(`yc-button_size_${size}`);
        },
    );

    test.each(new Array<ButtonView>(...buttonViews))('render with given "%s" view', (view) => {
        render(<Button view={view} qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(button).toHaveClass(`yc-button_view_${view}`);
    });

    test.each(new Array<ButtonPin>(...buttonPins))('render with given "%s" pin', (pin) => {
        render(<Button pin={pin} qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(button).toHaveClass(`yc-button_pin_${pin}`);
    });

    test.each(new Array<'button' | 'submit' | 'reset'>('button', 'submit', 'reset'))(
        'render with given "%s" type',
        (type) => {
            render(<Button type={type} qa={qaId} />);
            const button = screen.getByTestId(qaId);

            expect(button).toHaveAttribute('type', `${type}`);
        },
    );

    test('should render icon', () => {
        const iconQaId = 'icon-qa-id';

        render(
            <Button>
                <GearIcon data-qa={iconQaId} width={20} height={20} />
                Left
            </Button>,
        );

        const button = screen.getByRole('button');
        const iconComponent = screen.getByTestId(iconQaId);

        expect(iconComponent).toBeVisible();
        expect(button).toContainElement(iconComponent);
    });

    test('should render custom component', () => {
        const text = 'Button with custom component';

        const ButtonComponent = (props: ButtonProps) => {
            return (
                <button {...props} style={{boxShadow: '2px 2px 2px 2px deepskyblue'}}>
                    {text}
                </button>
            );
        };

        render(<Button component={ButtonComponent} />);

        const button = screen.getByText(text);
        expect(button).toBeVisible();
    });

    test('should render icon in Button.Icon', () => {
        const iconQaId = 'icon-qa-id';

        render(
            <Button>
                <Button.Icon>
                    <GearIcon data-qa={iconQaId} width={20} height={20} />
                </Button.Icon>
                Left
            </Button>,
        );

        const button = screen.getByRole('button');
        const iconComponent = screen.getByTestId(iconQaId);

        expect(iconComponent).toBeVisible();
        expect(button).toContainElement(iconComponent);
    });

    test('selected when selected=true prop is given', () => {
        render(<Button selected />);
        const button = screen.getByRole('button');

        expect(button).toBeVisible();
        expect(button).toHaveClass('yc-button_selected');
    });

    test('should render `<a />` tag', () => {
        const href = 'https://yandex.ru';
        const target = '_blank';

        render(<Button href={href} target={target} />);
        const button = screen.getByRole('link');

        expect(button).toBeVisible();
        expect(button).toHaveAttribute('href', href);
        expect(button).toHaveAttribute('target', target);
    });

    test('not selected when selected=false prop is given', () => {
        render(<Button selected={false} />);
        const button = screen.getByRole('button');

        expect(button).toBeVisible();
        expect(button).not.toHaveClass('yc-button_selected');
    });

    test('loading when loading=true prop is given', () => {
        render(<Button loading />);
        const button = screen.getByRole('button');

        expect(button).toBeVisible();
        expect(button).toHaveClass('yc-button_loading');
    });

    test('not loading when loading=false prop is given', () => {
        render(<Button loading={false} />);
        const button = screen.getByRole('button');

        expect(button).toBeVisible();
        expect(button).not.toHaveClass('yc-button_loading');
    });

    test('disabled when disabled=true prop is given', () => {
        render(<Button disabled={true} />);
        const button = screen.getByRole('button');

        expect(button).toBeDisabled();
    });

    test('not disabled when disabled=false prop is given', () => {
        render(<Button disabled={false} />);
        const button = screen.getByRole('button');

        expect(button).not.toBeDisabled();
    });

    test('set given title to label', () => {
        render(<Button title={TEST_TITLE} />);
        const label = screen.getByTitle(TEST_TITLE);

        expect(label).toBeVisible();
    });

    test('show given content', () => {
        const content = TEST_CHILDREN;

        render(<Button>{content}</Button>);
        const text = screen.getByText(content);

        expect(text).toBeVisible();
    });

    test('show given children', () => {
        const childrenText = TEST_CHILDREN;

        render(
            <Button>
                <span>{childrenText}</span>
            </Button>,
        );
        const text = screen.getByText(childrenText);

        expect(text).toBeVisible();
    });

    test('add className', () => {
        render(<Button className={TEST_CLASS_NAME} qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(button).toHaveClass(TEST_CLASS_NAME);
    });

    test('add style', () => {
        render(<Button style={TEST_STYLE} qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(button).toHaveStyle(TEST_STYLE);
    });

    test('set base control props', () => {
        const tabIndex = 777;

        render(<Button id={TEST_ID} title={TEST_TITLE} tabIndex={tabIndex} />);
        const button = screen.getByRole('button');

        expect(button).toHaveAttribute('id', TEST_ID);
        expect(button).toHaveAttribute('title', TEST_TITLE);
        expect(button).toHaveAttribute('tabIndex', `${tabIndex}`);
    });

    test('use passed ref for component', () => {
        const ref = React.createRef<HTMLLabelElement>();

        render(<Button ref={ref} qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(ref.current).toBe(button);
    });

    test('call onFocus/onBlur', async () => {
        const handleOnFocus = jest.fn();
        const handleOnBlur = jest.fn();
        render(<Button onFocus={handleOnFocus} onBlur={handleOnBlur} />);
        const button = screen.getByRole('button');

        button.focus();
        expect(handleOnFocus).toHaveBeenCalledTimes(1);

        button.blur();
        expect(handleOnBlur).toHaveBeenCalledTimes(1);
    });

    test('call onMouseEnter/onMouseLeave', async () => {
        const handleOnMouseEnter = jest.fn();
        const handleOnMouseLeave = jest.fn();
        render(<Button onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} />);
        const button = screen.getByRole('button');
        const user = userEvent.setup();

        await user.hover(button);
        expect(handleOnMouseEnter).toHaveBeenCalledTimes(1);

        await user.unhover(button);
        expect(handleOnMouseLeave).toHaveBeenCalledTimes(1);
    });

    test('call onClick', async () => {
        const user = userEvent.setup();
        const handleOnClick = jest.fn();
        render(<Button onClick={handleOnClick} />);

        const button = screen.getByRole('button');

        await user.click(button);
        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });
});
