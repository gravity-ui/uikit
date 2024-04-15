import React from 'react';

import _ from 'react-virtualized-auto-sizer';

import {cleanup, render, screen} from '../../../../test-utils/utils';
import {List} from '../List';
import type {ListProps} from '../types';

function setup(props: Partial<ListProps<string>> = {}) {
    const baseProps: ListProps<string> = {
        items: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
        itemsHeight: 150,
        itemHeight: 28,
        filterable: false,
    };

    return render(
        <div>
            <List<string> {...baseProps} {...props} />
        </div>,
    );
}

const mockOnLoadMorFn = jest.fn();

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('base List', () => {
    it('should render loading indicator', () => {
        setup({virtualized: false, onLoadMore: mockOnLoadMorFn, loading: true});

        const loader = screen.getByRole('list').querySelector('.g-loader');
        expect(loader).toBeInTheDocument();
    });
    it('should call onLoadMore callback when loading indicator is visible', () => {
        setup({virtualized: false, onLoadMore: mockOnLoadMorFn, loading: true});

        const loader = screen.getByRole('list').querySelector('.g-loader');

        expect(loader).toBeVisible();
        expect(mockOnLoadMorFn).toHaveBeenCalled();
    });
});

describe('virtualized List', () => {
    it('should render loading indicator', () => {
        setup({virtualized: true, onLoadMore: mockOnLoadMorFn, loading: true});

        const loader = screen.getByRole('list').querySelector('.g-loader');
        expect(loader).toBeInTheDocument();
    });

    it('should call onLoadMore callback when loading indicator is visible', () => {
        setup({virtualized: true, onLoadMore: mockOnLoadMorFn, loading: true});

        const loader = screen.getByRole('list').querySelector('.g-loader');
        expect(loader).toBeVisible();
        expect(mockOnLoadMorFn).toHaveBeenCalled();
    });
});
