import React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import {block} from '../../utils/cn';
import {Divider} from '../Divider';

const b = block('custom-divider');
const qa = 'divider';

describe('Divider', () => {
    test('Should passed className', () => {
        render(<Divider className={b()} qa={qa} />);

        expect(screen.getByTestId(qa)).toHaveClass('g-custom-divider');
    });
    test('Should passed style', () => {
        render(<Divider style={{borderWidth: '2px'}} qa={qa} />);

        expect(screen.getByTestId(qa)).toHaveStyle({borderWidth: '2px'});
    });
    test('Should render with orientation=horizontal', () => {
        render(<Divider qa={qa} />);

        const element = screen.getByTestId(qa);

        expect(element).not.toHaveAttribute('aria-orientation');
        expect(element).toHaveAttribute('role', 'separator');
        expect(element).toHaveClass('g-divider_orientation_horizontal');
    });
    test('Should render with orientation=vertical', () => {
        render(<Divider orientation="vertical" qa={qa} />);

        const element = screen.getByTestId(qa);

        expect(element).toHaveAttribute('aria-orientation', 'vertical');
        expect(element).toHaveAttribute('role', 'separator');
        expect(element).toHaveClass('g-divider_orientation_vertical');
    });
});
