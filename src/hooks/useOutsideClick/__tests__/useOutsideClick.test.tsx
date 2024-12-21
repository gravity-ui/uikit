import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';

import {Demo} from './Demo';

test('Check useOutsideClick correct work', async () => {
    render(<Demo />);

    expect(screen.getByRole('heading')).toHaveTextContent('0');

    await userEvent.click(screen.getByText('Target'));

    expect(screen.getByRole('heading')).toHaveTextContent('1');

    await userEvent.click(screen.getByText('Outside'));

    expect(screen.getByRole('heading')).toHaveTextContent('0');
});
