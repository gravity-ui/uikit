import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../test-utils/utils';

import type {DropdownMenuItem} from './DropdownMenu';
import {DropdownMenu} from './DropdownMenu';

export const optionsWithSubItems: DropdownMenuItem<unknown>[] = [
    {text: 'Edit', action: () => {}},
    {text: 'Other', items: [{action: () => {}, text: 'Submenu'}]},
];

test('do not trigger `onOpenToggle` on mount', () => {
    const onOpenToggle = jest.fn();
    render(<DropdownMenu onOpenToggle={onOpenToggle} />);

    expect(onOpenToggle).not.toHaveBeenCalled();
});

test('should trigger `onOpenToggle` when menu open', async () => {
    const onOpenToggle = jest.fn();
    render(<DropdownMenu onOpenToggle={onOpenToggle} />);

    const switcher = screen.getByRole('button');
    await userEvent.click(switcher);

    expect(onOpenToggle).toHaveBeenCalled();
});

test('should not trigger on control disable', async () => {
    const onOpenToggle = jest.fn();
    const {rerender} = render(<DropdownMenu onOpenToggle={onOpenToggle} />);

    rerender(<DropdownMenu onOpenToggle={onOpenToggle} disabled />);

    expect(onOpenToggle).not.toHaveBeenCalled();
});

describe('submenu', () => {
    test('should open submenu if it presses enter on submenu toggle', async () => {
        render(<DropdownMenu items={optionsWithSubItems} />);

        const switcher = screen.getByRole('button');
        await userEvent.click(switcher);

        expect(screen.getByText('Other')).toBeVisible();

        await userEvent.keyboard('[ArrowDown]');
        await userEvent.keyboard('[ArrowDown]');
        await userEvent.keyboard('[Enter]');

        expect(screen.getByText('Submenu')).toBeVisible();
    });
});
