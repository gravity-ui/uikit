import React from 'react';

import {render, screen} from '@testing-library/react';

import {SelectQa} from '../../Select/constants';
import {List} from '../List';
import type {ListProps} from '../types';

const mockIntersectionObserver = () => {
    const observe = jest.fn();
    const unobserve = jest.fn();

    (window as any).IntersectionObserver = jest.fn(() => ({
        observe,
        unobserve,
    }));
};

mockIntersectionObserver();

const ITEMS = ['1', '2'];

function setup(props: Partial<ListProps<string>> = {}) {
    const defaultProps: ListProps<string> = {
        loading: true,
        virtualized: false,
        items: ITEMS,
    };

    return render(<List<string> {...defaultProps} {...props} />);
}

test('List loading case', () => {
    setup();

    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(ITEMS.length + 1);

    expect(screen.getByTestId(SelectQa.SELECT_LOADING_INDICATOR)).toBeVisible();
});
