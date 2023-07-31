import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Toc} from '../Toc';

const defaultItems = [
    {
        value: 'firstItem',
        title: 'First item',
        items: [],
    },
    {
        value: 'secondItem',
        title: 'Second item',
        items: [],
    },
    {
        value: 'thirdItem',
        title: 'Third item',
        items: [
            {
                value: 'firstChildItem',
                title: 'First child item',
            },
            {
                value: 'secondChildItem',
                title: 'Second child item',
            },
        ],
    },
    {
        value: 'fourthItem',
        title: 'Fourth item',
        items: [],
    },
];

const defaultValue = defaultItems[2].items[0].value;
const defaultTitle = defaultItems[2].items[0].title;

const qaId = 'toc-component';

describe('Toc', () => {
    test('renders active item correctly', () => {
        const onUpdateFn = jest.fn();

        render(<Toc value={defaultValue} items={defaultItems} onUpdate={onUpdateFn} />);
        const activeItem = screen.getByText(defaultTitle);

        expect(activeItem).toHaveAttribute('aria-checked', 'true');
    });

    test('calls onUpdate with correct value', async () => {
        const nextValue = defaultItems[0].value;
        const nextTitle = defaultItems[0].title;
        const onUpdateFn = jest.fn();
        const user = userEvent.setup();

        render(<Toc value={defaultValue} items={defaultItems} onUpdate={onUpdateFn} />);
        const nextItem = screen.getByText(nextTitle);
        await user.click(nextItem);

        expect(onUpdateFn).toBeCalledWith(nextValue);
    });

    test('accessible for keyboard', async () => {
        const firstTitle = defaultItems[0].title;
        const secondValue = defaultItems[1].value;
        const onUpdateFn = jest.fn();
        const user = userEvent.setup();

        render(<Toc value={defaultValue} items={defaultItems} onUpdate={onUpdateFn} />);
        const firstItem = screen.getByText(firstTitle);
        await user.click(firstItem);
        await user.tab();
        await user.keyboard('{Enter}');

        expect(onUpdateFn).toBeCalledWith(secondValue);
    });

    test('add className', () => {
        const className = 'my-class';
        const onUpdateFn = jest.fn();

        render(
            <Toc
                className={className}
                value={defaultValue}
                items={defaultItems}
                onUpdate={onUpdateFn}
                qa={qaId}
            />,
        );
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });

    test('use passed ref for component', () => {
        const onUpdateFn = jest.fn();
        const ref = React.createRef<HTMLDivElement>();

        render(
            <Toc
                ref={ref}
                value={defaultValue}
                items={defaultItems}
                onUpdate={onUpdateFn}
                qa={qaId}
            />,
        );
        const component = screen.getByTestId(qaId);

        expect(ref.current).toBe(component);
    });
});
