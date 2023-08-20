import React from 'react';

import {render, screen} from '@testing-library/react';

import {Link} from '../Link';

describe('Link', () => {
    test('Link is anchor html element', () => {
        render(<Link href="/">Link</Link>);

        const link = screen.getByRole('link');

        expect(link).toBeInTheDocument();
    });

    test('Default "rel" attribute is present', () => {
        render(
            <Link href="/" target="_blank">
                Link
            </Link>,
        );

        const link = screen.getByRole('link');

        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('Custom "rel" attribute is present', () => {
        render(
            <Link href="/" target="_blank" rel="login">
                Link
            </Link>,
        );

        const link = screen.getByRole('link');

        expect(link).toHaveAttribute('rel', 'login');
    });
});
