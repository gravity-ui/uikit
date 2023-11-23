import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Disclosure} from '../Disclosure';
import type {DisclosureSize} from '../Disclosure';

const qaId = 'disclosure-component';

describe.only('Disclosure', () => {
    test('render disclosure by default', () => {
        render(<Disclosure />);
        const disclosure = screen.getByRole('button');

        expect(disclosure).toBeVisible();
        expect(disclosure).not.toBeDisabled();
        expect(disclosure).toHaveAttribute('aria-expanded', 'false');
    });

    test.each(new Array<DisclosureSize>('m', 'l', 'xl'))('render with given "%s" size', (size) => {
        render(<Disclosure qa={qaId} size={size} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(`g-disclosure_size_${size}`);
    });

    test('disabled when disabled=true prop is given', () => {
        render(<Disclosure disabled={true} />);
        const disclosure = screen.getByRole('button');

        expect(disclosure).toBeDisabled();
    });

    test('not disabled when disabled=false prop is given', () => {
        render(<Disclosure disabled={false} />);
        const disclosure = screen.getByRole('button');

        expect(disclosure).not.toBeDisabled();
    });

    test('show given summary', () => {
        const content = 'Some content';

        render(<Disclosure summary={content} />);
        const text = screen.getByText(content);

        expect(text).toBeVisible();
    });

    test('add className', () => {
        const className = 'my-class';

        render(<Disclosure className={className} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });

    test('use defaultExpanded attribute', () => {
        render(<Disclosure defaultExpanded={true} />);
        const disclosure = screen.getByRole('button');

        expect(disclosure).toHaveAttribute('aria-expanded', 'true');
    });
    test('call onUpdate when clicked', async () => {
        const onUpdateFn = jest.fn();
        const user = userEvent.setup();

        render(<Disclosure onUpdate={onUpdateFn} />);
        const disclosure = screen.getByRole('button');

        await user.click(disclosure);

        expect(onUpdateFn).toBeCalled();
    });
    test('content is visible when expanded', () => {
        const content = 'Some content';
        render(<Disclosure expanded={true}>{content}</Disclosure>);
        const text = screen.getByText(content);
        const button = screen.getByRole('button');

        expect(text).toHaveClass('g-disclosure__content_visible');
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });
    test('content is not visible when not expanded', () => {
        const content = 'Some content';
        render(<Disclosure expanded={false}>{content}</Disclosure>);
        const button = screen.getByRole('button');
        const text = screen.getByText(content);

        expect(text).not.toHaveClass('g-disclosure__content_visible');
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });
    test('content visibility toggles when clicked', async () => {
        const user = userEvent.setup();

        const content = 'Some content';
        render(<Disclosure>{content}</Disclosure>);
        const disclosure = screen.getByRole('button');
        const component = screen.getByText(content);

        expect(component).not.toHaveClass('g-disclosure__content_visible');
        await user.click(disclosure);
        expect(component).toHaveClass('g-disclosure__content_visible');
    });
    test('content not in dom if not keepMounted and not expanded', () => {
        const content = 'Some content';
        render(
            <Disclosure expanded={false} keepMounted={false}>
                {content}
            </Disclosure>,
        );

        const text = screen.queryByText(content);

        expect(text).not.toBeInTheDocument();
    });
    test('content in dom if keepMounted and not expanded', () => {
        const content = 'Some content';
        render(
            <Disclosure expanded={false} keepMounted={true}>
                {content}
            </Disclosure>,
        );

        const text = screen.queryByText(content);
        expect(text).toBeInTheDocument();
    });
    test('arrow on the start position by default', () => {
        render(<Disclosure />);
        const disclosure = screen.getByRole('button');

        expect(disclosure).not.toHaveClass('g-disclosure__trigger_arrow_end');
    });
    test('arrow on the end position if arrowPosition=end', () => {
        render(<Disclosure arrowPosition="end" />);
        const disclosure = screen.getByRole('button');

        expect(disclosure).toHaveClass('g-disclosure__trigger_arrow_end');
    });
});
