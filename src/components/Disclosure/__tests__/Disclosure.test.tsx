import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
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
        const button = screen.getByRole('button');

        expect(screen.getByText(content)).toBeVisible();
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    test('expanded content is available in accessibility tree', () => {
        render(
            <Disclosure summary="Summary" expanded={true}>
                <button type="button">Visible action</button>
            </Disclosure>,
        );

        const details = screen.getByTestId(DisclosureQa.DETAILS);

        expect(details).not.toHaveAttribute('aria-hidden');
        expect(details).not.toHaveAttribute('inert');
        expect(screen.getByRole('button', {name: 'Visible action'})).toBeVisible();
    });

    test('content is not visible when not expanded', () => {
        const content = 'Some content';
        render(<Disclosure expanded={false}>{content}</Disclosure>);
        const button = screen.getByRole('button');

        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('collapsed keepMounted content is hidden from accessibility tree', () => {
        render(
            <Disclosure summary="Summary" expanded={false} keepMounted={true}>
                <button type="button">Hidden action</button>
            </Disclosure>,
        );

        const details = screen.getByTestId(DisclosureQa.DETAILS);

        expect(details).toHaveAttribute('aria-hidden', 'true');
        expect(details).toHaveAttribute('inert');
        expect(screen.queryByRole('button', {name: 'Hidden action'})).not.toBeInTheDocument();
        expect(
            screen.getByRole('button', {name: 'Hidden action', hidden: true}),
        ).toBeInTheDocument();
    });

    test('content is hidden from accessibility tree while collapsing before unmount', async () => {
        const user = userEvent.setup();

        render(
            <Disclosure summary="Summary" defaultExpanded={true} keepMounted={false}>
                <button type="button">Collapsing action</button>
            </Disclosure>,
        );

        await user.click(screen.getByRole('button', {name: 'Summary'}));

        const details = screen.getByTestId(DisclosureQa.DETAILS);

        expect(details).toHaveAttribute('aria-hidden', 'true');
        expect(details).toHaveAttribute('inert');
        expect(screen.queryByRole('button', {name: 'Collapsing action'})).not.toBeInTheDocument();

        fireEvent.transitionEnd(details);

        expect(
            screen.queryByRole('button', {name: 'Collapsing action', hidden: true}),
        ).not.toBeInTheDocument();
    });

    test('content visibility toggles when clicked', async () => {
        const user = userEvent.setup();

        const content = 'Some content';
        render(<Disclosure>{content}</Disclosure>);
        const disclosure = screen.getByRole('button');

        expect(disclosure).toHaveAttribute('aria-expanded', 'false');
        await user.click(disclosure);
        expect(disclosure).toHaveAttribute('aria-expanded', 'true');
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
