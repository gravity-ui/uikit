import React from 'react';

import {act, render, screen} from '@testing-library/react';

import {useIdNative, useUniqIdFallback} from '../useUniqId';

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
            <div data-qa={uniqId}>{uniqId}</div>
            <div data-qa={`${TEST_COMPONENT_CLICKED_AMOUNT_ID}${uniqId}`}>{clickedAmount}</div>
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
            <div data-qa={uniqId}>{uniqId}</div>
            <div data-qa={`${TEST_COMPONENT_CLICKED_AMOUNT_ID}${uniqId}`}>{clickedAmount}</div>
        </div>
    );
};
describe('useUniqId', () => {
    test.each([
        {
            Component: TestComponentReact,
            uniqId: 'g-:r0:',
        },
        {
            Component: TestComponentWithFallback,
            uniqId: 'yc-uniq-1',
        },
    ])('should return the same id on different calls', ({Component, uniqId}) => {
        render(<Component />);

        const uniqIdElement = screen.getByTestId(uniqId);
        const clickedAmountElement = screen.getByTestId(
            `${TEST_COMPONENT_CLICKED_AMOUNT_ID}${uniqId}`,
        );
        const uniqId1 = uniqIdElement.textContent;
        const clickedAmount1 = Number(clickedAmountElement.textContent);
        act(() => {
            uniqIdElement.click();
        });
        const uniqId2 = uniqIdElement.textContent;
        const clickedAmount2 = Number(clickedAmountElement.textContent);

        expect(uniqId1).toBe(uniqId);
        expect(uniqId2).toBe(uniqId);
        expect(clickedAmount1).toBe(0);
        expect(clickedAmount2).toBe(1);
    });

    test.each([
        {
            Component: TestComponentReact,
            uniqId1: 'g-:r0:',
            uniqId2: 'g-:r1:',
        },
        {
            Component: TestComponentWithFallback,
            uniqId1: 'yc-uniq-1',
            uniqId2: 'yc-uniq-2',
        },
    ])('different components should have different ids', ({Component, uniqId1, uniqId2}) => {
        render(
            <div>
                <Component />
                <Component />
            </div>,
        );

        const uniqId1Element = screen.getByTestId(uniqId1);
        const uniqId2Element = screen.getByTestId(uniqId2);
        const clickedAmount1Element = screen.getByTestId(
            `${TEST_COMPONENT_CLICKED_AMOUNT_ID}${uniqId1}`,
        );
        const clickedAmount2Element = screen.getByTestId(
            `${TEST_COMPONENT_CLICKED_AMOUNT_ID}${uniqId2}`,
        );
        const uniqId1BeforeValue = uniqId1Element.textContent;
        const uniqId2BeforeValue = uniqId2Element.textContent;
        const clickedAmount1Before = Number(clickedAmount1Element.textContent);
        const clickedAmount2Before = Number(clickedAmount2Element.textContent);
        act(() => {
            uniqId1Element.click();
        });
        act(() => {
            uniqId2Element.click();
        });
        const uniqId1AfterValue = uniqId1Element.textContent;
        const uniqId2AfterValue = uniqId2Element.textContent;
        const clickedAmount1After = Number(clickedAmount1Element.textContent);
        const clickedAmount2After = Number(clickedAmount2Element.textContent);

        expect(uniqId1BeforeValue).toBe(uniqId1);
        expect(uniqId1AfterValue).toBe(uniqId1);
        expect(uniqId2BeforeValue).toBe(uniqId2);
        expect(uniqId2AfterValue).toBe(uniqId2);
        expect(clickedAmount1Before).toBe(0);
        expect(clickedAmount1After).toBe(1);
        expect(clickedAmount2Before).toBe(0);
        expect(clickedAmount2After).toBe(1);
    });
});
