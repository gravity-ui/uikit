import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {DropdownMenu} from './DropdownMenu';

test('do not trigger `onMenuToggle` on mount', () => {
    const onMenuToggle = jest.fn();
    render(<DropdownMenu onMenuToggle={onMenuToggle} />);

    expect(onMenuToggle).not.toHaveBeenCalled();
});

test('should trigger `onMenuToggle` when menu open', async () => {
    const onMenuToggle = jest.fn();
    render(<DropdownMenu onMenuToggle={onMenuToggle} />);

    const switcher = screen.getByRole('button');
    await userEvent.click(switcher);

    expect(onMenuToggle).toHaveBeenCalled();
});
