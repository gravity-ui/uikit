import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ColorsGrid, ColorsGridSize} from '../ColorsGrid';
import type {Color} from '../utils';

const qaId = 'colors-grid-component';

const colors: Color[] = ['#ff0000'];
const sizes: ColorsGridSize[] = ['s', 'm', 'l'];

describe('ColorsGrid', () => {
    test('render by default', () => {
        render(<ColorsGrid qa={qaId} colors={colors} />);
        const grid = screen.getByTestId(qaId);

        expect(grid).toBeVisible();
    });

    test.each(sizes)('render with given "%s" size', (size) => {
        render(<ColorsGrid qa={qaId} colors={colors} size={size} />);
        const grid = screen.getByTestId(qaId);

        expect(grid).toHaveClass(`g-colors-grid_size_${size}`);
    });

    test('render with empty colors list', () => {
        render(<ColorsGrid qa={qaId} colors={[]} />);
        const grid = screen.getByTestId(qaId);

        expect(grid).toBeEmptyDOMElement();
    });

    test('render colors list', () => {
        render(<ColorsGrid qa={qaId} colors={colors} />);
        const {children} = screen.getByTestId(qaId);

        expect(children.length).toBe(colors.length);
    });

    test('render with null color', async () => {
        render(<ColorsGrid qa={qaId} colors={[null]} />);
        const {firstChild} = screen.getByTestId(qaId);

        expect(firstChild).toHaveClass('g-colors-grid__item_void');
    });

    test('render with active color', () => {
        const color = colors[0];

        render(<ColorsGrid qa={qaId} colors={colors} value={color} />);
        const {firstChild} = screen.getByTestId(qaId);

        expect(firstChild).toHaveClass('g-colors-grid__item_active');
    });

    test('call onChange when color changed', async () => {
        const color = colors[0];
        const onChangeFn = jest.fn();
        const user = userEvent.setup();

        render(<ColorsGrid qa={qaId} colors={colors} onUpdate={onChangeFn} />);

        await user.click(screen.getByRole('button'));

        expect(onChangeFn).toBeCalledWith(color);
    });
});
