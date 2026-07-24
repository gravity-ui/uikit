import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Disclosure} from '../Disclosure';
import type {DisclosureSize} from '../Disclosure';
import {DisclosureQa} from '../constants';

const qaId = 'disclosure-component';

describe('Disclosure', () => {
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

    test('show given string summary', () => {
        const content = 'Some content';

        render(<Disclosure summary={content} />);
        const text = screen.getByText(content);

        expect(text).toBeVisible();
    });

    test('show given node summary', () => {
        const className = 'content';
        const content = (
            <div data-qa={qaId} className={className}>
                Some content
            </div>
        );

        render(<Disclosure summary={content} />);
        const component = screen.getByTestId(qaId);
        const wrapperComponent = screen.getByTestId(DisclosureQa.SUMMARY);

        expect(wrapperComponent).toBeVisible();
        expect(component).toHaveClass(className);
    });

    test('render custom summary without default', () => {
        const className = 'content';
        render(
            <Disclosure>
                <Disclosure.Summary>
                    {() => (
                        <div data-qa={qaId} className={className}>
                            Some content
                        </div>
                    )}
                </Disclosure.Summary>
            </Disclosure>,
        );
        const component = screen.getByTestId(qaId);
        const wrapperComponent = screen.queryByTestId(DisclosureQa.SUMMARY);

        expect(wrapperComponent).toBeNull();
        expect(component).toHaveClass(className);
    });

    test('render custom summary with default', () => {
        const className = 'content';
        render(
            <Disclosure>
                <Disclosure.Summary>
                    {(_, defaultButton) => (
                        <div data-qa={qaId} className={className}>
                            {defaultButton}
                            Some content
                        </div>
                    )}
                </Disclosure.Summary>
            </Disclosure>,
        );
        const component = screen.getByTestId(qaId);
        const wrapperComponent = screen.getByTestId(DisclosureQa.SUMMARY);

        expect(wrapperComponent).toBeVisible();
        expect(component).toHaveClass(className);
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

    test('collapsed details are visible when not expanded', () => {
        const collapsed = 'Collapsed content';
        const details = 'Details content';
        render(
            <Disclosure expanded={false}>
                <Disclosure.CollapsedDetails>{collapsed}</Disclosure.CollapsedDetails>
                {details}
            </Disclosure>,
        );

        expect(screen.getByText(collapsed)).toHaveClass('g-disclosure__collapsed-content_visible');
        expect(screen.getByText(details)).not.toHaveClass('g-disclosure__content_visible');
    });

    test('collapsed details are hidden when expanded', () => {
        const collapsed = 'Collapsed content';
        const details = 'Details content';
        render(
            <Disclosure expanded={true}>
                <Disclosure.CollapsedDetails>{collapsed}</Disclosure.CollapsedDetails>
                {details}
            </Disclosure>,
        );

        expect(screen.getByText(collapsed)).not.toHaveClass(
            'g-disclosure__collapsed-content_visible',
        );
        expect(screen.getByText(details)).toHaveClass('g-disclosure__content_visible');
    });

    test('collapsed details visibility toggles when clicked', async () => {
        const user = userEvent.setup();
        const collapsed = 'Collapsed content';
        render(
            <Disclosure>
                <Disclosure.CollapsedDetails>{collapsed}</Disclosure.CollapsedDetails>
            </Disclosure>,
        );
        const disclosure = screen.getByRole('button');
        const component = screen.getByText(collapsed);

        expect(component).toHaveClass('g-disclosure__collapsed-content_visible');
        await user.click(disclosure);
        expect(component).not.toHaveClass('g-disclosure__collapsed-content_visible');
    });

    test('collapsed details not in dom if not keepMounted and expanded', () => {
        const collapsed = 'Collapsed content';
        render(
            <Disclosure expanded={true} keepMounted={false}>
                <Disclosure.CollapsedDetails>{collapsed}</Disclosure.CollapsedDetails>
            </Disclosure>,
        );

        expect(screen.queryByText(collapsed)).not.toBeInTheDocument();
    });

    test('collapsed details in dom if keepMounted and expanded', () => {
        const collapsed = 'Collapsed content';
        render(
            <Disclosure expanded={true} keepMounted={true}>
                <Disclosure.CollapsedDetails>{collapsed}</Disclosure.CollapsedDetails>
            </Disclosure>,
        );

        const text = screen.queryByText(collapsed);
        expect(text).toBeInTheDocument();
    });

    test('throws when more than one collapsed details is provided', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        expect(() =>
            render(
                <Disclosure>
                    <Disclosure.CollapsedDetails>First</Disclosure.CollapsedDetails>
                    <Disclosure.CollapsedDetails>Second</Disclosure.CollapsedDetails>
                </Disclosure>,
            ),
        ).toThrow('Only one <Disclosure.CollapsedDetails> component is allowed');
        spy.mockRestore();
    });

    test('custom qa', () => {
        render(
            <Disclosure qa="test-custom-qa">
                <div>content</div>
            </Disclosure>,
        );

        expect(screen.getByTestId('test-custom-qa')).toBeTruthy();
        expect(screen.getByTestId('test-custom-qa-summary')).toBeTruthy();
        expect(screen.getByTestId('test-custom-qa-details')).toBeTruthy();
    });
});
