import React from 'react';

import {render, screen} from '@testing-library/react';
import {TEST_CHILDREN} from '@uikit/__fixtures__/consts';

import {Sheet} from '../Sheet';
import {sheetBlock} from '../constants';

describe('Sheet', () => {
    test('Renders content when visible', () => {
        render(<Sheet visible>{TEST_CHILDREN}</Sheet>);

        expect(screen.getByText(TEST_CHILDREN)).toBeInTheDocument();
    });

    test('Do not renders content when invisible', () => {
        render(<Sheet visible={false}>${TEST_CHILDREN}</Sheet>);

        expect(screen.queryByText(TEST_CHILDREN)).not.toBeInTheDocument();
    });

    test('Do not renders top bar when hideTopBar property is set', () => {
        const {container} = render(<Sheet visible hideTopBar></Sheet>);

        // Element is accessible only by selector
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.querySelector(sheetBlock('sheet-top'))).not.toBeInTheDocument();
    });
});
