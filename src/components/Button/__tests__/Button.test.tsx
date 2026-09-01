import * as React from 'react';

import {Gear} from '@gravity-ui/icons';
import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Icon} from '../../Icon';
import {DefaultPropsProvider} from '../../theme/DefaultPropsProvider';
import {Button} from '../Button';
import type {ButtonPin, ButtonSize, ButtonView} from '../types';

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

const buttonIconSizes: Array<[ButtonSize, number]> = [
    ['xs', 12],
    ['s', 14],
    ['m', 16],
    ['l', 16],
    ['xl', 20],
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

            expect(button).toHaveClass(`g-button_size_${size}`);
        },
    );

    test.each(new Array<ButtonView>(...buttonViews))('render with given "%s" view', (view) => {
        render(<Button view={view} qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(button).toHaveClass(`g-button_view_${view}`);
    });

    test.each(new Array<ButtonPin>(...buttonPins))('render with given "%s" pin', (pin) => {
        render(<Button pin={pin} qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(button).toHaveClass(`g-button_pin_${pin}`);
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
                <Gear data-qa={iconQaId} width={20} height={20} />
                Start
            </Button>,
        );

        const button = screen.getByRole('button');
        const iconComponent = screen.getByTestId(iconQaId);

        expect(iconComponent).toBeVisible();
        expect(button).toContainElement(iconComponent);
    });

    test.each(buttonIconSizes)(
        'should set icon size according to the "%s" button size',
        (size, expectedSize) => {
            const iconQaId = `icon-${size}`;

            render(
                <Button size={size}>
                    <Icon data={Gear} qa={iconQaId} />
                    Start
                </Button>,
            );

            const icon = screen.getByTestId(iconQaId);

            expect(icon).toHaveAttribute('width', String(expectedSize));
            expect(icon).toHaveAttribute('height', String(expectedSize));
        },
    );

    test('should update icon size when button size changes', () => {
        const iconQaId = 'icon-qa-id';
        const {rerender} = render(
            <Button size="xs">
                <Icon data={Gear} qa={iconQaId} />
            </Button>,
        );

        rerender(
            <Button size="xl">
                <Icon data={Gear} qa={iconQaId} />
            </Button>,
        );

        const icon = screen.getByTestId(iconQaId);

        expect(icon).toHaveAttribute('width', '20');
        expect(icon).toHaveAttribute('height', '20');
    });

    test('should preserve explicitly specified icon size', () => {
        const iconQaId = 'icon-qa-id';

        render(
            <Button size="xl">
                <Icon data={Gear} size={24} qa={iconQaId} />
            </Button>,
        );

        const icon = screen.getByTestId(iconQaId);

        expect(icon).toHaveAttribute('width', '24');
        expect(icon).toHaveAttribute('height', '24');
    });

    test('should preserve explicitly specified icon width and height', () => {
        const iconQaId = 'icon-qa-id';

        render(
            <Button size="xl">
                <Icon data={Gear} width={24} height={28} qa={iconQaId} />
            </Button>,
        );

        const icon = screen.getByTestId(iconQaId);

        expect(icon).toHaveAttribute('width', '24');
        expect(icon).toHaveAttribute('height', '28');
    });

    test('should use button size for unspecified icon dimension', () => {
        const widthIconQaId = 'width-icon-qa-id';
        const heightIconQaId = 'height-icon-qa-id';

        render(
            <React.Fragment>
                <Button size="xl">
                    <Icon data={Gear} width={24} qa={widthIconQaId} />
                </Button>
                <Button size="xl">
                    <Icon data={Gear} height={24} qa={heightIconQaId} />
                </Button>
            </React.Fragment>,
        );

        expect(screen.getByTestId(widthIconQaId)).toHaveAttribute('width', '24');
        expect(screen.getByTestId(widthIconQaId)).toHaveAttribute('height', '20');
        expect(screen.getByTestId(heightIconQaId)).toHaveAttribute('width', '20');
        expect(screen.getByTestId(heightIconQaId)).toHaveAttribute('height', '24');
    });

    test('should set size of raw svg and preserve explicitly specified dimension', () => {
        const defaultIconQaId = 'default-svg-qa-id';
        const customIconQaId = 'custom-svg-qa-id';

        render(
            <React.Fragment>
                <Button size="xl">
                    <svg data-qa={defaultIconQaId} />
                </Button>
                <Button size="xl">
                    <svg data-qa={customIconQaId} width={24} />
                </Button>
            </React.Fragment>,
        );

        expect(screen.getByTestId(defaultIconQaId)).toHaveAttribute('width', '20');
        expect(screen.getByTestId(defaultIconQaId)).toHaveAttribute('height', '20');
        expect(screen.getByTestId(customIconQaId)).toHaveAttribute('width', '24');
        expect(screen.getByTestId(customIconQaId)).toHaveAttribute('height', '20');
    });

    test('should prefer button icon size over Icon default size', () => {
        const iconQaId = 'icon-qa-id';

        render(
            <DefaultPropsProvider defaultProps={{Icon: {size: 24}}}>
                <Button size="xs">
                    <Icon data={Gear} qa={iconQaId} />
                </Button>
            </DefaultPropsProvider>,
        );

        expect(screen.getByTestId(iconQaId)).toHaveAttribute('width', '12');
        expect(screen.getByTestId(iconQaId)).toHaveAttribute('height', '12');
    });

    test('should not pass icon size to a different component with Icon displayName', () => {
        const iconQaId = 'icon-qa-id';
        const CustomIcon = ({size = 's'}: {size?: ButtonSize}) => (
            <svg data-qa={iconQaId} data-size={size} />
        );
        CustomIcon.displayName = 'Icon';

        render(
            <Button size="xl">
                <CustomIcon />
            </Button>,
        );

        expect(screen.getByTestId(iconQaId)).toHaveAttribute('data-size', 's');
    });

    test('should render custom component', () => {
        const text = 'Button with custom component';

        const ButtonComponent = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
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

    test('should not forward "component" prop to the rendered element', () => {
        render(<Button component="div" qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(button.tagName).toBe('DIV');
        expect(button).not.toHaveAttribute('component');
    });

    test('should render icon in Button.Icon', () => {
        const iconQaId = 'icon-qa-id';

        render(
            <Button>
                <Button.Icon>
                    <Gear data-qa={iconQaId} width={20} height={20} />
                </Button.Icon>
                Start
            </Button>,
        );

        const button = screen.getByRole('button');
        const iconComponent = screen.getByTestId(iconQaId);

        expect(iconComponent).toBeVisible();
        expect(button).toContainElement(iconComponent);
    });

    test('should set icon size inside explicit Button.Icon', () => {
        const iconQaId = 'icon-qa-id';

        render(
            <Button size="xs">
                <Button.Icon>
                    <Icon data={Gear} qa={iconQaId} />
                </Button.Icon>
                Start
            </Button>,
        );

        const icon = screen.getByTestId(iconQaId);

        expect(icon).toHaveAttribute('width', '12');
        expect(icon).toHaveAttribute('height', '12');
    });

    test('should leave icon inside standalone Button.Icon untouched', () => {
        const iconQaId = 'icon-qa-id';

        render(
            <Button.Icon>
                <Icon data={Gear} qa={iconQaId} />
            </Button.Icon>,
        );

        expect(screen.getByTestId(iconQaId)).toHaveAttribute('width', '16');
        expect(screen.getByTestId(iconQaId)).toHaveAttribute('height', '16');
    });

    test('should set size of an end icon', () => {
        const iconQaId = 'icon-qa-id';

        render(
            <Button size="xl">
                End
                <Icon data={Gear} qa={iconQaId} />
            </Button>,
        );

        const icon = screen.getByTestId(iconQaId);

        expect(icon).toHaveAttribute('width', '20');
        expect(icon).toHaveAttribute('height', '20');
    });

    test('selected when selected=true prop is given', () => {
        render(<Button selected />);
        const button = screen.getByRole('button');

        expect(button).toBeVisible();
        expect(button).toHaveClass('g-button_selected');
    });

    test('should render <a /> tag', () => {
        const href = 'https://gravity-ui.com';
        const target = '_blank';
        const iconQaId = 'icon-qa-id';

        render(
            <Button href={href} target={target} size="xl">
                <Icon data={Gear} qa={iconQaId} />
            </Button>,
        );
        const button = screen.getByRole('link');

        expect(button).toBeVisible();
        expect(button).toHaveAttribute('href', href);
        expect(button).toHaveAttribute('target', target);
        expect(screen.getByTestId(iconQaId)).toHaveAttribute('width', '20');
    });

    test('should set icon size when rendering a custom component', () => {
        const iconQaId = 'icon-qa-id';
        const CustomButton = React.forwardRef<
            HTMLButtonElement,
            React.ButtonHTMLAttributes<HTMLButtonElement>
        >((props, ref) => <button {...props} ref={ref} />);
        CustomButton.displayName = 'CustomButton';

        render(
            <Button component={CustomButton} size="xs">
                <Icon data={Gear} qa={iconQaId} />
            </Button>,
        );

        expect(screen.getByTestId(iconQaId)).toHaveAttribute('width', '12');
        expect(screen.getByTestId(iconQaId)).toHaveAttribute('height', '12');
    });

    test('not selected when selected=false prop is given', () => {
        render(<Button selected={false} />);
        const button = screen.getByRole('button');

        expect(button).toBeVisible();
        expect(button).not.toHaveClass('g-button_selected');
    });

    test('loading when loading=true prop is given', () => {
        render(<Button loading />);
        const button = screen.getByRole('button');

        expect(button).toBeVisible();
        expect(button).toHaveClass('g-button_loading');
    });

    test('not loading when loading=false prop is given', () => {
        render(<Button loading={false} />);
        const button = screen.getByRole('button');

        expect(button).toBeVisible();
        expect(button).not.toHaveClass('g-button_loading');
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
        const title = 'Some title';

        render(<Button title={title} />);
        const label = screen.getByTitle(title);

        expect(label).toBeVisible();
    });

    test('show given content', () => {
        const content = 'Some content';

        render(<Button>{content}</Button>);
        const text = screen.getByText(content);

        expect(text).toBeVisible();
    });

    test('show given children', () => {
        const childrenText = 'Children content';

        render(
            <Button>
                <span>{childrenText}</span>
            </Button>,
        );
        const text = screen.getByText(childrenText);

        expect(text).toBeVisible();
    });

    test('add className', () => {
        const className = 'my-class';

        render(<Button className={className} qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(button).toHaveClass(className);
    });

    test('add style', () => {
        const style = {color: 'red'};

        render(<Button style={style} qa={qaId} />);
        const button = screen.getByTestId(qaId);

        expect(button).toHaveStyle(style);
    });

    test('set base control props', () => {
        const id = 'my_id';
        const title = 'my_title';
        const tabIndex = 777;

        render(<Button id={id} title={title} tabIndex={tabIndex} />);
        const button = screen.getByRole('button');

        expect(button).toHaveAttribute('id', id);
        expect(button).toHaveAttribute('title', title);
        expect(button).toHaveAttribute('tabIndex', `${tabIndex}`);
    });

    test('use passed ref for component', () => {
        const ref = React.createRef<HTMLLabelElement>();

        render(<Button ref={ref} component="label" qa={qaId} />);
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
