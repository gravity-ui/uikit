import {Gear} from '@gravity-ui/icons';
import userEvent from '@testing-library/user-event';

import {act, getAllByRole, render, screen, waitFor} from '../../../../../test-utils/utils';
import {Icon} from '../../../Icon';
import {Modal} from '../../../Modal';
import {Popup} from '../../../Popup';
import {Menu} from '../Menu';
import type {MenuSize} from '../types';

const TRIGGER_QA = 'trigger';
const MENU_QA = 'menu';
const SUBMENU_QA = 'submenu';
const MENU_ICON_QA = 'menu-icon';

const menuIconSizes: Array<[MenuSize, number]> = [
    ['s', 14],
    ['m', 16],
    ['l', 16],
    ['xl', 20],
];

function SimpleMenu() {
    return (
        <Menu trigger={<Menu.Trigger qa={TRIGGER_QA} />} qa={MENU_QA}>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
            <Menu.Item>Item 3</Menu.Item>
        </Menu>
    );
}

function ComplexMenu() {
    return (
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
        </Menu>
    );
}

describe('Menu', () => {
    test.each(menuIconSizes)(
        'should set item icon size according to the "%s" menu size',
        (size, expectedSize) => {
            render(
                <Menu inline size={size}>
                    <Menu.Item icon={<Icon data={Gear} qa={MENU_ICON_QA} />}>Item</Menu.Item>
                </Menu>,
            );

            expect(screen.getByTestId(MENU_ICON_QA)).toHaveAttribute('width', String(expectedSize));
            expect(screen.getByTestId(MENU_ICON_QA)).toHaveAttribute(
                'height',
                String(expectedSize),
            );
        },
    );

    test('should update item icon size when menu size changes', () => {
        const {rerender} = render(
            <Menu inline size="s">
                <Menu.Item icon={<Icon data={Gear} qa={MENU_ICON_QA} />}>Item</Menu.Item>
            </Menu>,
        );

        rerender(
            <Menu inline size="xl">
                <Menu.Item icon={<Icon data={Gear} qa={MENU_ICON_QA} />}>Item</Menu.Item>
            </Menu>,
        );

        expect(screen.getByTestId(MENU_ICON_QA)).toHaveAttribute('width', '20');
        expect(screen.getByTestId(MENU_ICON_QA)).toHaveAttribute('height', '20');
    });

    test('should preserve explicitly specified item icon dimensions', () => {
        render(
            <Menu inline size="xl">
                <Menu.Item icon={<Icon data={Gear} size={24} qa="sized-icon" />}>Size</Menu.Item>
                <Menu.Item icon={<Icon data={Gear} width={24} qa="wide-icon" />}>Width</Menu.Item>
                <Menu.Item icon={<Icon data={Gear} height={24} qa="tall-icon" />}>Height</Menu.Item>
            </Menu>,
        );

        expect(screen.getByTestId('sized-icon')).toHaveAttribute('width', '24');
        expect(screen.getByTestId('sized-icon')).toHaveAttribute('height', '24');
        expect(screen.getByTestId('wide-icon')).toHaveAttribute('width', '24');
        expect(screen.getByTestId('wide-icon')).toHaveAttribute('height', '20');
        expect(screen.getByTestId('tall-icon')).toHaveAttribute('width', '20');
        expect(screen.getByTestId('tall-icon')).toHaveAttribute('height', '24');
    });

    test('should set missing dimensions of an svg item icon', () => {
        render(
            <Menu inline size="xl">
                <Menu.Item icon={<svg data-qa={MENU_ICON_QA} width={24} />}>Item</Menu.Item>
            </Menu>,
        );

        expect(screen.getByTestId(MENU_ICON_QA)).toHaveAttribute('width', '24');
        expect(screen.getByTestId(MENU_ICON_QA)).toHaveAttribute('height', '20');
    });

    test('should not pass icon size to a different component with Icon displayName', () => {
        const CustomIcon = ({size = 'custom'}: {size?: string}) => (
            <svg data-qa={MENU_ICON_QA} data-size={size} />
        );
        CustomIcon.displayName = 'Icon';

        render(
            <Menu inline size="xl">
                <Menu.Item icon={<CustomIcon />}>Item</Menu.Item>
            </Menu>,
        );

        expect(screen.getByTestId(MENU_ICON_QA)).toHaveAttribute('data-size', 'custom');
    });

    test('should set the built-in submenu arrow size according to the menu size', async () => {
        render(
            <Menu trigger={<Menu.Trigger qa={TRIGGER_QA} />} size="xl">
                <Menu.Item>
                    Item
                    <Menu>
                        <Menu.Item>Subitem</Menu.Item>
                    </Menu>
                </Menu.Item>
            </Menu>,
        );
        const user = userEvent.setup();

        await user.click(screen.getByTestId(TRIGGER_QA));

        // eslint-disable-next-line testing-library/no-node-access
        const arrow = screen.getByRole('menuitem').querySelector('.g-lab-menu-item__arrow svg');
        expect(arrow).toHaveAttribute('width', '20');
        expect(arrow).toHaveAttribute('height', '20');
    });

    test('should render default trigger', () => {
        render(<SimpleMenu />);
        const trigger = screen.getByTestId(TRIGGER_QA);

        expect(trigger).toBeVisible();
    });

    test('should open menu by click', async () => {
        render(<SimpleMenu />);
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
            render(<SimpleMenu />);
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
        render(<SimpleMenu />);
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

    test('should close menu by selecting an item inside Popup', async () => {
        render(
            <Popup open>
                <SimpleMenu />
            </Popup>,
        );
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

    test('should close menu by selecting an item inside Modal', async () => {
        render(
            <Modal open>
                <SimpleMenu />
            </Modal>,
        );
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
        render(<SimpleMenu />);
        const user = userEvent.setup();
        const trigger = screen.getByTestId(TRIGGER_QA);

        expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();

        trigger.focus();
        await user.keyboard(' ');
        await waitFor(() => {
            expect(screen.getByTestId(MENU_QA)).toBeVisible();
        });

        const items = screen.getAllByRole('menuitem');

        await waitFor(() => {
            expect(items[0]).toHaveFocus();
        });
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
        render(<ComplexMenu />);
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
        render(<ComplexMenu />);
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

    test('should not open by hover inside Popup', async () => {
        render(
            <Popup open>
                <SimpleMenu />
            </Popup>,
        );
        const user = userEvent.setup();
        const trigger = screen.getByTestId(TRIGGER_QA);

        await user.hover(trigger);

        expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();
    });

    test('should not open by hover inside Modal', async () => {
        render(
            <Modal open>
                <SimpleMenu />
            </Modal>,
        );
        const user = userEvent.setup();
        const trigger = screen.getByTestId(TRIGGER_QA);

        await user.hover(trigger);

        expect(screen.queryByTestId(MENU_QA)).not.toBeInTheDocument();
    });
});
