import * as React from 'react';

import {Check} from '@gravity-ui/icons';
import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Accordion} from '../Accordion';

const qaId = 'accordion-component';

describe('Accordion', () => {
    test('render accordion by default', () => {
        render(
            <Accordion qa={qaId}>
                <Accordion.Item summary="Item 1">Content 1</Accordion.Item>
                <Accordion.Item summary="Item 2">Content 2</Accordion.Item>
            </Accordion>,
        );

        const accordion = screen.getByTestId(qaId);
        expect(accordion).toBeVisible();
    });

    test.each(['s', 'm', 'l', 'xl'] as const)('render with given "%s" size', (size) => {
        render(
            <Accordion size={size} qa={qaId}>
                <Accordion.Item summary="Item 1">Content 1</Accordion.Item>
            </Accordion>,
        );

        const accordion = screen.getByTestId(qaId);
        expect(accordion).toHaveClass(`g-accordion_size_${size}`);
    });

    test.each(['solid', 'top-bottom'] as const)('render with given "%s" view', (view) => {
        render(
            <Accordion view={view} qa={qaId}>
                <Accordion.Item summary="Item 1">Content 1</Accordion.Item>
            </Accordion>,
        );

        const accordion = screen.getByTestId(qaId);
        expect(accordion).toHaveClass(`g-accordion_view_${view}`);
    });

    test('render with custom className', () => {
        const className = 'custom-accordion';
        render(
            <Accordion className={className} qa={qaId}>
                <Accordion.Item summary="Item 1">Content 1</Accordion.Item>
            </Accordion>,
        );

        const accordion = screen.getByTestId(qaId);
        expect(accordion).toHaveClass(className);
    });

    test('render accordion items with summary prop', () => {
        render(
            <Accordion>
                <Accordion.Item summary="First Item">First content</Accordion.Item>
                <Accordion.Item summary="Second Item">Second content</Accordion.Item>
            </Accordion>,
        );

        expect(screen.getByText('First Item')).toBeVisible();
        expect(screen.getByText('Second Item')).toBeVisible();
    });

    test('expand/collapse items on click', async () => {
        const user = userEvent.setup();

        render(
            <Accordion>
                <Accordion.Item summary="Expandable Item">Hidden content</Accordion.Item>
            </Accordion>,
        );

        const summary = screen.getByText('Expandable Item');
        const content = screen.getByText('Hidden content');

        expect(content.className).not.toContain('g-disclosure__content_visible');

        await user.click(summary);
        expect(content.className).toContain('g-disclosure__content_visible');

        await user.click(summary);
        expect(content).not.toHaveClass('g-disclosure__content_visible');
    });

    test('single mode: only one item can be expanded at a time', async () => {
        const user = userEvent.setup();

        render(
            <Accordion>
                <Accordion.Item summary="Item 1">Content 1</Accordion.Item>
                <Accordion.Item summary="Item 2">Content 2</Accordion.Item>
            </Accordion>,
        );

        const item1 = screen.getByText('Item 1');
        const item2 = screen.getByText('Item 2');

        await user.click(item1);
        const content1 = screen.getByText('Content 1');
        expect(content1.className).toContain('g-disclosure__content_visible');

        await user.click(item2);
        const content2 = screen.getByText('Content 2');
        expect(content2.className).toContain('g-disclosure__content_visible');

        expect(content1.className).not.toContain('g-disclosure__content_visible');
    });

    test('multiple mode: multiple items can be expanded simultaneously', async () => {
        const user = userEvent.setup();

        render(
            <Accordion multiple>
                <Accordion.Item summary="Item 1">Content 1</Accordion.Item>
                <Accordion.Item summary="Item 2">Content 2</Accordion.Item>
            </Accordion>,
        );

        const item1 = screen.getByText('Item 1');
        const item2 = screen.getByText('Item 2');

        await user.click(item1);
        await user.click(item2);

        const content1 = screen.getByText('Content 1');
        const content2 = screen.getByText('Content 2');

        expect(content1.className).toContain('g-disclosure__content_visible');
        expect(content2.className).toContain('g-disclosure__content_visible');
    });

    test('controlled mode: value prop controls expanded state', async () => {
        const {rerender} = render(
            <Accordion value="item1">
                <Accordion.Item summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item summary="Item 2" value="item2">
                    Content 2
                </Accordion.Item>
            </Accordion>,
        );

        const content1 = screen.getByText('Content 1');
        const content2 = screen.getByText('Content 2');

        expect(content1).toHaveClass('g-disclosure__content_visible');
        expect(content2).not.toHaveClass('g-disclosure__content_visible');

        rerender(
            <Accordion value="item2">
                <Accordion.Item summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item summary="Item 2" value="item2">
                    Content 2
                </Accordion.Item>
            </Accordion>,
        );

        const rerenderedContent1 = screen.getByText('Content 1');
        const rerenderedContent2 = screen.getByText('Content 2');

        expect(rerenderedContent1).not.toHaveClass('g-disclosure__content_visible');
        expect(rerenderedContent2).toHaveClass('g-disclosure__content_visible');
    });

    test('defaultValue prop sets initial expanded state', () => {
        render(
            <Accordion defaultValue="item2">
                <Accordion.Item summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item summary="Item 2" value="item2">
                    Content 2
                </Accordion.Item>
            </Accordion>,
        );

        const content1 = screen.getByText('Content 1');
        const content2 = screen.getByText('Content 2');

        expect(content1.className).not.toContain('g-disclosure__content_visible');
        expect(content2.className).toContain('g-disclosure__content_visible');
    });

    test('onUpdate callback is called when state changes', async () => {
        const onUpdate = jest.fn();
        const user = userEvent.setup();

        render(
            <Accordion onUpdate={onUpdate}>
                <Accordion.Item summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
            </Accordion>,
        );

        const item = screen.getByText('Item 1');
        await user.click(item);

        expect(onUpdate).toHaveBeenCalledWith('item1');
    });

    test('render with custom summary using Accordion.Summary', () => {
        render(
            <Accordion>
                <Accordion.Item value="custom">
                    <Accordion.Summary>
                        {(props) => (
                            <Button {...props} view="outlined">
                                <Icon data={Check} size={14} />
                                Custom Summary
                            </Button>
                        )}
                    </Accordion.Summary>
                    <Text>Custom content</Text>
                </Accordion.Item>
            </Accordion>,
        );

        expect(screen.getByText('Custom Summary')).toBeVisible();
        expect(screen.getByRole('button')).toBeVisible();
    });

    test('defaultExpanded prop on AccordionItem', () => {
        render(
            <Accordion>
                <Accordion.Item summary="Item 1" defaultExpanded>
                    Content 1
                </Accordion.Item>
                <Accordion.Item summary="Item 2" defaultExpanded={false}>
                    Content 2
                </Accordion.Item>
            </Accordion>,
        );

        const content1 = screen.getByText('Content 1');
        const content2 = screen.getByText('Content 2');

        expect(content1.className).toContain('g-disclosure__content_visible');
        expect(content2.className).not.toContain('g-disclosure__content_visible');
    });

    test('disabled AccordionItem cannot be expanded', async () => {
        const user = userEvent.setup();

        render(
            <Accordion>
                <Accordion.Item summary="Disabled Item" disabled>
                    Hidden content
                </Accordion.Item>
            </Accordion>,
        );

        const summary = screen.getByText('Disabled Item');
        await user.click(summary);

        expect(summary).toBeDisabled();
    });

    test('keepMounted=false removes content from DOM when collapsed', async () => {
        render(
            <Accordion>
                <Accordion.Item summary="Not Keep Mounted" keepMounted={false}>
                    Non-persistent content
                </Accordion.Item>
            </Accordion>,
        );

        expect(screen.queryByText('Non-persistent content')).not.toBeInTheDocument();
    });

    test('AccordionItem onUpdate callback', async () => {
        const onUpdate = jest.fn();
        const user = userEvent.setup();

        render(
            <Accordion>
                <Accordion.Item summary="Item with callback" onUpdate={onUpdate}>
                    Content
                </Accordion.Item>
            </Accordion>,
        );

        const summary = screen.getByText('Item with callback');
        await user.click(summary);

        expect(onUpdate).toHaveBeenCalledWith(true);

        await user.click(summary);
        expect(onUpdate).toHaveBeenCalledWith(false);
    });

    test('use passed ref', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <Accordion ref={ref} qa={qaId}>
                <Accordion.Item summary="Item 1">Content 1</Accordion.Item>
            </Accordion>,
        );

        const accordion = screen.getByTestId(qaId);
        expect(ref.current).toBe(accordion);
    });

    test('keyboard navigation with arrow keys', async () => {
        const user = userEvent.setup();

        render(
            <Accordion>
                <Accordion.Item summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item summary="Item 2" value="item2">
                    Content 2
                </Accordion.Item>
                <Accordion.Item summary="Item 3" value="item3">
                    Content 3
                </Accordion.Item>
            </Accordion>,
        );

        const item1Button = screen.getByText('Item 1');
        const item2Button = screen.getByText('Item 2');
        const item3Button = screen.getByText('Item 3');

        item1Button.focus();
        expect(item1Button).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        expect(item2Button).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        expect(item3Button).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        expect(item1Button).toHaveFocus();

        await user.keyboard('{ArrowUp}');
        expect(item3Button).toHaveFocus();

        await user.keyboard('{ArrowUp}');
        expect(item2Button).toHaveFocus();

        await user.keyboard('{ArrowUp}');
        expect(item1Button).toHaveFocus();
    });

    test('Home key should move focus to first item', async () => {
        const user = userEvent.setup();

        render(
            <Accordion>
                <Accordion.Item summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item summary="Item 2" value="item2">
                    Content 2
                </Accordion.Item>
                <Accordion.Item summary="Item 3" value="item3">
                    Content 3
                </Accordion.Item>
            </Accordion>,
        );

        const item2Button = screen.getByText('Item 2');
        const item1Button = screen.getByText('Item 1');

        item2Button.focus();
        expect(item2Button).toHaveFocus();

        await user.keyboard('{Home}');
        expect(item1Button).toHaveFocus();
    });

    test('End key should move focus to last item', async () => {
        const user = userEvent.setup();

        render(
            <Accordion>
                <Accordion.Item summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item summary="Item 2" value="item2">
                    Content 2
                </Accordion.Item>
                <Accordion.Item summary="Item 3" value="item3">
                    Content 3
                </Accordion.Item>
            </Accordion>,
        );

        const item1Button = screen.getByText('Item 1');
        const item3Button = screen.getByText('Item 3');

        item1Button.focus();
        expect(item1Button).toHaveFocus();

        await user.keyboard('{End}');
        expect(item3Button).toHaveFocus();
    });

    test('should skip disabled items during keyboard navigation', async () => {
        const user = userEvent.setup();

        render(
            <Accordion>
                <Accordion.Item summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item summary="Item 2 (Disabled)" value="item2" disabled>
                    Content 2
                </Accordion.Item>
                <Accordion.Item summary="Item 3" value="item3">
                    Content 3
                </Accordion.Item>
            </Accordion>,
        );

        const item1Button = screen.getByText('Item 1');
        const item3Button = screen.getByText('Item 3');

        item1Button.focus();
        expect(item1Button).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        expect(item3Button).toHaveFocus();

        await user.keyboard('{ArrowUp}');
        expect(item1Button).toHaveFocus();
    });

    test('should have correct ARIA attributes', () => {
        render(
            <Accordion ariaLevel={2} qa={qaId}>
                <Accordion.Item summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
            </Accordion>,
        );

        const accordion = screen.getByTestId(qaId);
        expect(accordion).toHaveAttribute('role', 'region');
        expect(accordion).toHaveAttribute('aria-label', 'Accordion');
    });

    test('should throw error when multiple Accordion.Summary components provided', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
            render(
                <Accordion>
                    <Accordion.Item value="test">
                        <Accordion.Summary>
                            {(props) => <button {...props}>First Summary</button>}
                        </Accordion.Summary>
                        <Accordion.Summary>
                            {(props) => <button {...props}>Second Summary</button>}
                        </Accordion.Summary>
                        Content
                    </Accordion.Item>
                </Accordion>,
            );
        }).toThrow('Only one <Accordion.Summary> component is allowed');

        consoleSpy.mockRestore();
    });

    test('should handle form interactions inside accordion', async () => {
        const user = userEvent.setup();
        const onSubmit = jest.fn((e) => e.preventDefault());

        render(
            <Accordion>
                <Accordion.Item summary="Form Item">
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Test input" />
                        <button type="submit">Submit</button>
                    </form>
                </Accordion.Item>
            </Accordion>,
        );

        await user.click(screen.getByText('Form Item'));

        const input = screen.getByPlaceholderText('Test input');
        await user.type(input, 'test value');
        expect(input).toHaveValue('test value');

        await user.click(screen.getByText('Submit'));
        expect(onSubmit).toHaveBeenCalled();
    });

    test('should handle nested interactive elements', async () => {
        const user = userEvent.setup();
        const buttonClick = jest.fn();
        const linkClick = jest.fn((e) => e.preventDefault());

        render(
            <Accordion>
                <Accordion.Item summary="Interactive Item">
                    <button onClick={buttonClick}>Nested Button</button>
                    <a href="#test" onClick={linkClick}>
                        Nested Link
                    </a>
                </Accordion.Item>
            </Accordion>,
        );

        await user.click(screen.getByText('Interactive Item'));

        await user.click(screen.getByText('Nested Button'));
        expect(buttonClick).toHaveBeenCalled();

        await user.click(screen.getByText('Nested Link'));
        expect(linkClick).toHaveBeenCalled();
    });
});
