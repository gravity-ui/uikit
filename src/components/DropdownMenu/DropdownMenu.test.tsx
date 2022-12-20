import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {DropdownMenu} from './DropdownMenu';

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
