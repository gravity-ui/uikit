import React from 'react';
import {render, screen} from '@testing-library/react';
import {Card} from '../Card';

describe('Card', () => {
    test('it renders title attribute', () => {
        const title = 'title-tooltip-text';
        const childrenText = 'card-children';

        render(<Card titleAttribute={title}>{childrenText}</Card>);

        const card = screen.getByText(childrenText);

        expect(card).toHaveAttribute('title', title);
    });
});
