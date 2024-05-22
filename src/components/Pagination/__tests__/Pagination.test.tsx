import React from 'react';

import {noop} from 'lodash';

import {render, screen} from '../../../../test-utils/utils';
import {Pagination} from '../Pagination';
import {PaginationQa} from '../constants';

describe('Pagination', () => {
    test('Total property disable Next', () => {
        render(<Pagination pageSize={20} onUpdate={noop} page={0} total={undefined} />);

        const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);

        expect(nextButton).toBeDisabled();
    });
});
