import userEvent from '@testing-library/user-event';

import {act, getAllByRole, render, screen, waitFor} from '../../../../../test-utils/utils';
import {Menu} from '../Menu';

const TRIGGER_QA = 'trigger';
const MENU_QA = 'menu';
const SUBMENU_QA = 'submenu';

function renderSimpleMenu() {
    return render(
        <Menu trigger={<Menu.Trigger qa={TRIGGER_QA} />} qa={MENU_QA}>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
            <Menu.Item>Item 3</Menu.Item>
        </Menu>,
    );
}

function renderComplexMenu() {
    return render(
        <Menu trigger={<Menu.Trigger qa={TRIGGER_QA} />} qa={MENU_QA}>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
            <Menu.Item>
                Item 3
                <Menu qa={SUBMENU_QA}>
                    <Menu.Item>Item 4</Menu.Item>
                    <Menu.Item>Item 4</Menu.Item>
                </Menu>
            </Menu.Item>
        </Menu>,
    );
}

describe('Menu', () => {
    test('should render default trigger', () => {
        renderSimpleMenu();
        const trigger = screen.getByTestId(TRIGGER_QA);

        expect(trigger).toBeVisible();
    });

    test('should open menu by click', async () => {
        renderSimpleMenu();
        const user = userEvent.setup();
        const trigger = screen.getByTestId(TRIGGER_QA);

        expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();

        await user.click(trigger);
        await waitFor(() => {
            expect(screen.getByTestId(MENU_QA)).toBeVisible();
        });
    });

    test.each(['{Space}', '{Enter}', '{ArrowDown}', '{ArrowUp}'])(
        'should open menu by keyboard %s',
        async (key) => {
            renderSimpleMenu();
            const user = userEvent.setup();
            const trigger = screen.getByTestId(TRIGGER_QA);

            expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();

            trigger.focus();
            await user.keyboard(key === '{Space}' ? ' ' : key);
            await waitFor(() => {
                expect(screen.getByTestId(MENU_QA)).toBeVisible();
            });

            const items = screen.getAllByRole('menuitem');

            if (key === '{ArrowUp}') {
                expect(items[items.length - 1]).toHaveClass(/active/);
            } else {
                expect(items[0]).toHaveClass(/active/);
            }
        },
    );

    test('should close menu by selecting an item', async () => {
        renderSimpleMenu();
        const user = userEvent.setup();
        const trigger = screen.getByTestId(TRIGGER_QA);

        expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();

        await user.click(trigger);
        await waitFor(() => {
            expect(screen.getByTestId(MENU_QA)).toBeVisible();
        });

        const items = screen.getAllByRole('menuitem');

        await user.click(items[1]);
        await waitFor(() => {
            expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();
        });
    });

    test('should have correct keyboard navigation', async () => {
        renderSimpleMenu();
        const user = userEvent.setup();
        const trigger = screen.getByTestId(TRIGGER_QA);

        expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();

        trigger.focus();
        await user.keyboard(' ');
        await waitFor(() => {
            expect(screen.getByTestId(MENU_QA)).toBeVisible();
        });

        const items = screen.getAllByRole('menuitem');

        expect(items[0]).toHaveClass(/active/);
        await user.keyboard('{ArrowDown}');
        expect(items[1]).toHaveClass(/active/);
        await user.keyboard('{ArrowDown}');
        expect(items[2]).toHaveClass(/active/);
        await user.keyboard('{ArrowDown}');
        expect(items[2]).toHaveClass(/active/);
        await user.keyboard('{ArrowUp}');
        expect(items[1]).toHaveClass(/active/);
        await user.keyboard('{ArrowUp}');
        expect(items[0]).toHaveClass(/active/);
        await user.keyboard('{ArrowUp}');
        expect(items[0]).toHaveClass(/active/);
    });

    test('should open submenu by hover', async () => {
        renderComplexMenu();
        const user = userEvent.setup();
        const trigger = screen.getByTestId(TRIGGER_QA);

        expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();

        await user.click(trigger);
        await waitFor(() => {
            expect(screen.getByTestId(MENU_QA)).toBeVisible();
        });

        const items = screen.getAllByRole('menuitem');

        expect(screen.queryByTestId(SUBMENU_QA)).not.toBeInTheDocument();

        await user.hover(items[2]);
        await waitFor(() => {
            expect(screen.getByTestId(SUBMENU_QA)).toBeVisible();
        });
    });

    test('should open/close submenu by keyboard', async () => {
        renderComplexMenu();
        const user = userEvent.setup();
        const trigger = screen.getByTestId(TRIGGER_QA);

        expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();

        await user.click(trigger);
        await waitFor(() => {
            expect(screen.getByTestId(MENU_QA)).toBeVisible();
        });

        const items = screen.getAllByRole('menuitem', {});

        expect(screen.queryByTestId(SUBMENU_QA)).not.toBeInTheDocument();

        act(() => {
            items[2].focus();
        });
        await user.keyboard('{ArrowRight}');
        await waitFor(() => {
            expect(screen.getByTestId(SUBMENU_QA)).toBeVisible();
        });

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const subitems = getAllByRole(screen.getByTestId(SUBMENU_QA), 'menuitem');
        expect(items[2]).toHaveClass(/hovered/);
        expect(subitems[0]).toHaveClass(/active/);

        await user.keyboard('{ArrowLeft}');
        await waitFor(() => {
            expect(screen.queryByTestId(SUBMENU_QA)).not.toBeInTheDocument();
        });
        expect(items[2]).toHaveClass(/active/);
    });
});
