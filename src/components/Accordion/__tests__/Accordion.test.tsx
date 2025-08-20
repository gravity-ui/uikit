import * as React from 'react';

import {Check} from '@gravity-ui/icons';
import userEvent from '@testing-library/user-event';

import {Accordion} from '..';
import {render, screen} from '../../../../test-utils/utils';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Link} from '../../Link';
import {Text} from '../../Text';

const qaId = 'accordion-component';

describe('Accordion', () => {
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

    test('expand/collapse items on click', async () => {
        const user = userEvent.setup();

        render(
            <Accordion>
                <Accordion.Item qa={'item'} summary="Expandable Item">
                    Hidden content
                </Accordion.Item>
            </Accordion>,
        );

        const summary = screen.getByTestId('item-summary');
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
                <Accordion.Item qa={'item-1'} summary="Item 1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item qa={'item-2'} summary="Item 2">
                    Content 2
                </Accordion.Item>
            </Accordion>,
        );

        const item1 = screen.getByTestId('item-1-summary');
        const item2 = screen.getByTestId('item-2-summary');

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
                <Accordion.Item qa={'item-1'} summary="Item 1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item qa={'item-2'} summary="Item 2">
                    Content 2
                </Accordion.Item>
            </Accordion>,
        );

        const item1 = screen.getByTestId('item-1-summary');
        const item2 = screen.getByTestId('item-2-summary');

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
                <Accordion.Item qa={'item-1'} summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item qa={'item-2'} summary="Item 2" value="item2">
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
                <Accordion.Item qa={'item-1'} summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
            </Accordion>,
        );

        const item = screen.getByTestId('item-1-summary');
        await user.click(item);

        expect(onUpdate).toHaveBeenCalledWith('item1');
    });

    test('render with custom summary using Accordion.Summary', () => {
        render(
            <Accordion>
                <Accordion.Item value="custom">
                    <Accordion.Summary>
                        {(props) => (
                            <Button {...props} qa={'custom-summary'} view="outlined">
                                <Icon data={Check} size={14} />
                                Custom Summary
                            </Button>
                        )}
                    </Accordion.Summary>
                    <Text>Custom content</Text>
                </Accordion.Item>
            </Accordion>,
        );

        expect(screen.getByTestId('custom-summary')).toBeVisible();
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
                <Accordion.Item qa={'disabled'} summary="Disabled Item" disabled>
                    Hidden content
                </Accordion.Item>
            </Accordion>,
        );

        const summary = screen.getByTestId('disabled-summary');
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
                <Accordion.Item qa={'item'} summary="Item with callback" onUpdate={onUpdate}>
                    Content
                </Accordion.Item>
            </Accordion>,
        );

        const summary = screen.getByTestId('item-summary');
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
                <Accordion.Item qa={'item-1'} summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item qa={'item-2'} summary="Item 2" value="item2">
                    Content 2
                </Accordion.Item>
                <Accordion.Item qa={'item-3'} summary="Item 3" value="item3">
                    Content 3
                </Accordion.Item>
            </Accordion>,
        );

        const item1Button = screen.getByTestId('item-1-summary');
        const item2Button = screen.getByTestId('item-2-summary');
        const item3Button = screen.getByTestId('item-3-summary');

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
                <Accordion.Item qa={'item-1'} summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item qa={'item-2'} summary="Item 2" value="item2">
                    Content 2
                </Accordion.Item>
                <Accordion.Item summary="Item 3" value="item3">
                    Content 3
                </Accordion.Item>
            </Accordion>,
        );

        const item1Button = screen.getByTestId('item-1-summary');
        const item2Button = screen.getByTestId('item-2-summary');

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
                <Accordion.Item qa={'item-1'} summary="Item 1" value="item1">
                    Content 1
                </Accordion.Item>
                <Accordion.Item summary="Item 2 (Disabled)" value="item2" disabled>
                    Content 2
                </Accordion.Item>
                <Accordion.Item qa={'item-3'} summary="Item 3" value="item3">
                    Content 3
                </Accordion.Item>
            </Accordion>,
        );

        const item1Button = screen.getByTestId('item-1-summary');
        const item3Button = screen.getByTestId('item-3-summary');

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
                <Accordion.Item qa={'form-item'} summary="Form Item">
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Test input" />
                        <button type="submit">Submit</button>
                    </form>
                </Accordion.Item>
            </Accordion>,
        );

        await user.click(screen.getByTestId('form-item-summary'));

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
                <Accordion.Item qa={'interactive-item'} summary="Interactive Item">
                    <Button qa={'nested-button'} onClick={buttonClick}>
                        Nested Button
                    </Button>
                    <Link qa={'nested-link'} href="#test" onClick={linkClick}>
                        Nested Link
                    </Link>
                </Accordion.Item>
            </Accordion>,
        );

        await user.click(screen.getByTestId('interactive-item-summary'));

        await user.click(screen.getByTestId('nested-button'));
        expect(buttonClick).toHaveBeenCalled();

        await user.click(screen.getByTestId('nested-link'));
        expect(linkClick).toHaveBeenCalled();
    });
});
