import React from 'react';

import {act, render, screen} from '@testing-library/react';

import {useIdNative, useUniqIdFallback} from '../useUniqId';

const TEST_COMPONENT_UNIQ_ID = 'test-component-uniq-id';
const TEST_COMPONENT_CLICKED_AMOUNT_ID = 'test-component-clicked-amount-id';
const TestComponentReact = () => {
    const uniqId = useIdNative();
    const [clickedAmount, setClickedAmount] = React.useState(0);

    const onClick = React.useCallback(() => {
        setClickedAmount((v) => v + 1);
    }, []);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div onClick={onClick}>
            <div data-qa={TEST_COMPONENT_UNIQ_ID}>{uniqId}</div>
            <div data-qa={TEST_COMPONENT_CLICKED_AMOUNT_ID}>{clickedAmount}</div>
        </div>
    );
};
const TestComponentWithFallback = () => {
    const uniqId = useUniqIdFallback();
    const [clickedAmount, setClickedAmount] = React.useState(0);

    const onClick = React.useCallback(() => {
        setClickedAmount((v) => v + 1);
    }, []);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div onClick={onClick}>
            <div data-qa={TEST_COMPONENT_UNIQ_ID}>{uniqId}</div>
            <div data-qa={TEST_COMPONENT_CLICKED_AMOUNT_ID}>{clickedAmount}</div>
        </div>
    );
};
describe('useUniqId', () => {
    test('should return the same id on different calls with React.useId', () => {
        render(<TestComponentReact />);

        const uniqIdElement = screen.getByTestId(TEST_COMPONENT_UNIQ_ID);
        const clickedAmountElement = screen.getByTestId(TEST_COMPONENT_CLICKED_AMOUNT_ID);
        const uniqId1 = uniqIdElement.textContent;
        const clickedAmount1 = Number(clickedAmountElement.textContent);
        act(() => {
            uniqIdElement.click();
        });
        const uniqId2 = uniqIdElement.textContent;
        const clickedAmount2 = Number(clickedAmountElement.textContent);

        expect(uniqId1).toBe('g-:r0:');
        expect(uniqId2).toBe('g-:r0:');
        expect(clickedAmount1).toBe(0);
        expect(clickedAmount2).toBe(1);
    });

    test('should return the same id on different calls without React.useId', () => {
        render(<TestComponentWithFallback />);

        const uniqIdElement = screen.getByTestId(TEST_COMPONENT_UNIQ_ID);
        const clickedAmountElement = screen.getByTestId(TEST_COMPONENT_CLICKED_AMOUNT_ID);
        const uniqId1 = uniqIdElement.textContent;
        const clickedAmount1 = Number(clickedAmountElement.textContent);
        act(() => {
            uniqIdElement.click();
        });
        const uniqId2 = uniqIdElement.textContent;
        const clickedAmount2 = Number(clickedAmountElement.textContent);

        expect(uniqId1).toBe('yc-uniq-1');
        expect(uniqId2).toBe('yc-uniq-1');
        expect(clickedAmount1).toBe(0);
        expect(clickedAmount2).toBe(1);
    });
});
