import React from 'react';
import {render, screen} from '@testing-library/react';

import {Progress, Stack} from '../Progress';

const qaId = 'progressbar';

describe('Progress', () => {
    test('render Progress with value', () => {
        render(<Progress value={0} qa={qaId} />);
        const progressbar = screen.getByTestId(qaId);
        const progress = screen.getByRole('progress-container');

        expect(progressbar).toBeVisible();
        expect(progress).toHaveClass('yc-progress__item');
    });

    test('render Progress with stack', () => {
        const stack: Stack[] = [
            {
                value: 0,
            },
        ];

        render(<Progress stack={stack} qa={qaId} />);
        const progressbar = screen.getByTestId(qaId);
        const progress = screen.getByRole('progress-container');

        expect(progressbar).toBeVisible();
        expect(progress).toHaveClass('yc-progress__stack');
    });

    test('should render stacks with provided amount', () => {
        const stack: Stack[] = [
            {
                value: 20,
            },
            {
                value: 40,
            },
            {
                value: 60,
            },
            {
                value: 80,
            },
            {
                value: 90,
            },
        ];

        render(<Progress stack={stack} qa={qaId} />);
        const progress = screen.getByRole('progress-container');
        const stackItemsAmount = progress.childElementCount;

        expect(stackItemsAmount).toEqual(stack.length);
    });

    test('render Progress with text', () => {
        const text = 'test string';
        render(<Progress value={0} text={text} qa={qaId} />);
        const textElement = screen.getByRole('text');

        expect(textElement).toBeVisible();
    });

    test('should passed className', () => {
        const className = 'class-name';

        render(<Progress value={0} className={className} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });
});
