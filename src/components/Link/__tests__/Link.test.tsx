import React from 'react';

import {render, screen} from '@testing-library/react';

import {Link} from '../Link';

describe('Link', () => {
    test('Link is anchor', () => {
        render(<Link href="#" />);

        const link = screen.getByRole('link');

        expect(link).toBeInTheDocument();
    });

    test('Link is span', () => {
        render(<Link data-qa="test" />);

        // btw there should be role attribute at span
        const link = screen.getByTestId('test');

        expect(link.tagName).toBe('SPAN');
    });

    test('rel attribute is present', () => {
        render(<Link href="#" target="_blank" />);

        const link = screen.getByRole('link');

        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
