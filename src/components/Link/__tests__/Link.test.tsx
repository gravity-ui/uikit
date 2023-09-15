import React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import {Link} from '../Link';

describe('Link', () => {
    test('Link is anchor', () => {
        render(<Link href="#" />);

        const link = screen.getByRole('link');

        expect(link).toBeInTheDocument();
    });

    test('rel attribute is present', () => {
        render(<Link href="#" target="_blank" />);

        const link = screen.getByRole('link');

        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('passing data attribute', () => {
        render(<Link href="#" target="_blank" data-action="visit" />);

        const link = screen.getByRole('link');

        expect(link.dataset.action).toEqual('visit');
    });
});
