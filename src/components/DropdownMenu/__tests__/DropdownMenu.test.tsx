import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen, waitFor} from '../../../../test-utils/utils';
import {DropdownMenu} from '../DropdownMenu';

describe('DropdownMenu keyboard navigation', () => {
    const mockAction = jest.fn();
    const mockSubAction = jest.fn();

    const menuItems = [
        {
            text: 'Item without submenu',
            action: mockAction,
        },
        {
            text: 'Item with submenu',
            items: [
                {
                    text: 'Submenu item 1',
                    action: mockSubAction,
                },
                {
                    text: 'Submenu item 2',
                    action: mockSubAction,
                },
            ],
        },
        {
            text: 'Another item',
            action: mockAction,
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should open dropdown menu with Tab + Enter on switcher', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} />);

        const switcher = screen.getByRole('button');

        await user.tab();
        expect(switcher).toHaveFocus();

        await user.keyboard('{Enter}');

        expect(screen.getByText('Item without submenu')).toBeInTheDocument();
        expect(screen.getByText('Item with submenu')).toBeInTheDocument();
        expect(screen.getByText('Another item')).toBeInTheDocument();
    });

    test('should open dropdown menu with Tab + Space on switcher', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} />);

        const switcher = screen.getByRole('button');

        await user.tab();
        expect(switcher).toHaveFocus();

        await user.keyboard(' ');

        expect(screen.getByText('Item without submenu')).toBeInTheDocument();
        expect(screen.getByText('Item with submenu')).toBeInTheDocument();
        expect(screen.getByText('Another item')).toBeInTheDocument();
    });

    test('should allow hovering on menu items with submenu to toggle them', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} open />);

        const submenuItem = screen.getByText('Item with submenu');

        await user.hover(submenuItem);

        await waitFor(() => {
            expect(screen.getByText('Submenu item 1')).toBeInTheDocument();
        });
        expect(screen.getByText('Submenu item 2')).toBeInTheDocument();

        await user.unhover(submenuItem);

        await waitFor(() => {
            expect(screen.queryByText('Submenu item 1')).not.toBeInTheDocument();
        });
        expect(screen.queryByText('Submenu item 2')).not.toBeInTheDocument();
    });

    test('should open submenu on hover and close by click', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} open />);

        const submenuItem = screen.getByText('Item with submenu');

        await user.hover(submenuItem);

        await waitFor(() => {
            expect(screen.getByText('Submenu item 1')).toBeInTheDocument();
        });
        expect(screen.getByText('Submenu item 2')).toBeInTheDocument();

        await user.click(submenuItem);

        await waitFor(() => {
            expect(screen.queryByText('Submenu item 1')).not.toBeInTheDocument();
        });
        expect(screen.queryByText('Submenu item 2')).not.toBeInTheDocument();
    });

    test('should execute action on regular menu item click', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} open />);

        const regularItem = screen.getByText('Item without submenu');

        await user.click(regularItem);

        expect(mockAction).toHaveBeenCalledTimes(1);
    });

    test('should execute submenu item action on click', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} open />);

        const submenuItem = screen.getByText('Item with submenu');

        await user.hover(submenuItem);

        await waitFor(() => {
            expect(screen.getByText('Submenu item 1')).toBeInTheDocument();
        });

        const submenuItem1 = screen.getByText('Submenu item 1');

        await user.click(submenuItem1);

        expect(mockSubAction).toHaveBeenCalledTimes(1);
    });

    test('should close menu with Escape key', async () => {
        render(<DropdownMenu items={menuItems} open />);

        expect(screen.getByText('Item without submenu')).toBeInTheDocument();

        const menu = screen.getByRole('menu');
        fireEvent.keyDown(menu, {key: 'Escape'});

        await waitFor(() => {
            expect(screen.queryByText('Item without submenu')).not.toBeInTheDocument();
        });
    });

    test('should allow Tab navigation to move focus between elements', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} open />);

        await user.tab();

        const menuItemElements = screen.getAllByRole('menuitem');
        expect(menuItemElements.length).toBe(3);
        expect(menuItemElements[0]).toHaveTextContent('Item without submenu');
        expect(menuItemElements[1]).toHaveTextContent('Item with submenu');
        expect(menuItemElements[2]).toHaveTextContent('Another item');
    });

    test('should support keyboard navigation with Enter key on menu items', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} />);

        const switcher = screen.getByRole('button');

        await user.tab();
        expect(switcher).toHaveFocus();

        await user.keyboard('{Enter}');

        const regularItem = screen.getByRole('menuitem', {name: 'Item without submenu'});

        await user.tab();
        expect(regularItem).toHaveFocus();
        await user.keyboard('{Enter}');

        expect(mockAction).toHaveBeenCalledTimes(1);
    });

    test('should support keyboard navigation with Space key on menu items', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} />);

        const switcher = screen.getByRole('button');

        await user.tab();
        expect(switcher).toHaveFocus();

        await user.keyboard(' ');

        const regularItem = screen.getByRole('menuitem', {name: 'Item without submenu'});

        await user.tab();
        expect(regularItem).toHaveFocus();
        await user.keyboard(' ');

        expect(mockAction).toHaveBeenCalledTimes(1);
    });

    test('should toggle submenu with Enter key on submenu items', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} />);

        const switcher = screen.getByRole('button');

        await user.tab();
        expect(switcher).toHaveFocus();

        await user.keyboard('{Enter}');

        const itemWithSubmenu = screen.getByRole('menuitem', {name: 'Item with submenu'});

        itemWithSubmenu.focus();

        await user.keyboard('{Enter}');

        await waitFor(() => {
            expect(screen.getByText('Submenu item 1')).toBeInTheDocument();
        });

        await user.keyboard('{Enter}');

        await waitFor(() => {
            expect(screen.queryByText('Submenu item 1')).not.toBeInTheDocument();
        });
    });

    test('should toggle submenu with Space key on submenu items', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} />);

        const switcher = screen.getByRole('button');

        await user.tab();
        expect(switcher).toHaveFocus();

        await user.keyboard(' ');

        const itemWithSubmenu = screen.getByRole('menuitem', {name: 'Item with submenu'});

        itemWithSubmenu.focus();

        await user.keyboard(' ');

        await waitFor(() => {
            expect(screen.getByText('Submenu item 1')).toBeInTheDocument();
        });

        await user.keyboard(' ');

        await waitFor(() => {
            expect(screen.queryByText('Submenu item 1')).not.toBeInTheDocument();
        });
    });

    test('should support arrow key navigation between menu items', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} open />);

        const menu = screen.getByRole('menu');
        menu.focus();

        await user.keyboard('{ArrowDown}');
        await user.keyboard('{ArrowDown}');

        const menuItemElements = screen.getAllByRole('menuitem');
        expect(menuItemElements.length).toBe(3);
    });

    test('should execute action on submenu item click', async () => {
        const user = userEvent.setup();

        render(<DropdownMenu items={menuItems} />);

        const switcher = screen.getByRole('button');

        await user.tab();
        expect(switcher).toHaveFocus();

        await user.keyboard(' ');

        const itemWithSubmenu = screen.getByRole('menuitem', {name: 'Item with submenu'});

        itemWithSubmenu.focus();

        await user.keyboard(' ');
        await user.tab();

        const subMenuItem = screen.getByRole('menuitem', {name: 'Submenu item 1'});

        expect(subMenuItem).toHaveFocus();

        await user.keyboard('{Enter}');

        expect(mockSubAction).toHaveBeenCalledTimes(1);
    });
});
