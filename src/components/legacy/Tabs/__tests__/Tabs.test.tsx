import type * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../../test-utils/utils';
import {Tabs, TabsDirection} from '../Tabs';
import type {TabsItemProps, TabsSize} from '../Tabs';

const tabId1 = 'tab1';
const tabTitle1 = 'Tab 1 title';
const tab1 = {id: tabId1, title: tabTitle1};

const tabId2 = 'tab2';
const tabTitle2 = 'Tab 2 title';
const tab2 = {id: tabId2, title: tabTitle2};

const qaId = 'tabs';

test('should render tabs by default', () => {
    render(<Tabs items={[]} />);
    const component = screen.getByRole('tablist');

    expect(component).toBeVisible();
    expect(component).toHaveClass('g-tabs-legacy_size_m');
    expect(component).toHaveClass('g-tabs-legacy_direction_horizontal');
});

test('should not render tabs if no items', () => {
    render(<Tabs items={[]} />);
    const component = screen.getByRole('tablist');
    const tabsComponents = screen.queryAllByRole('tab');

    expect(component).toBeEmptyDOMElement();
    expect(tabsComponents).toHaveLength(0);
});

test.each(new Array<TabsSize>('m', 'l', 'xl'))('should render with given "%s" size', (size) => {
    render(<Tabs items={[]} size={size} qa={qaId} />);
    const component = screen.getByTestId(qaId);

    expect(component).toHaveClass(`g-tabs-legacy_size_${size}`);
});

test.each(new Array<TabsDirection>(TabsDirection.Horizontal, TabsDirection.Vertical))(
    'render with given "%s" direction',
    (direction) => {
        render(<Tabs items={[]} direction={direction} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(`g-tabs-legacy_direction_${direction}`);
    },
);

test('should passed className', () => {
    const className = 'class-name';

    render(<Tabs items={[]} className={className} qa={qaId} />);
    const component = screen.getByTestId(qaId);

    expect(component).toHaveClass(className);
});

test('should not select tab if allow not selected', () => {
    render(<Tabs items={[tab1, tab2]} allowNotSelected />);
    const tabComponent1 = screen.getByTitle(tabTitle1);
    const tabComponent2 = screen.getByTitle(tabTitle2);

    expect(tabComponent1).not.toHaveClass('g-tabs-legacy__item_active');
    expect(tabComponent1).toHaveAttribute('aria-selected', 'false');

    expect(tabComponent2).not.toHaveClass('g-tabs-legacy__item_active');
    expect(tabComponent2).toHaveAttribute('aria-selected', 'false');
});

test('should select first tab as active', () => {
    render(<Tabs items={[tab1, tab2]} />);
    const tabComponent1 = screen.getByTitle(tabTitle1);
    const tabComponent2 = screen.getByTitle(tabTitle2);

    expect(tabComponent1).toHaveClass('g-tabs-legacy__item_active');
    expect(tabComponent1).toHaveAttribute('aria-selected', 'true');

    expect(tabComponent2).not.toHaveClass('g-tabs-legacy__item_active');
    expect(tabComponent2).toHaveAttribute('aria-selected', 'false');
});

test('should passed active tab', () => {
    render(<Tabs items={[tab1, tab2]} activeTab={tabId2} />);
    const tabComponent1 = screen.getByTitle(tabTitle1);
    const tabComponent2 = screen.getByTitle(tabTitle2);

    expect(tabComponent1).not.toHaveClass('g-tabs-legacy__item_active');
    expect(tabComponent1).toHaveAttribute('aria-selected', 'false');

    expect(tabComponent2).toHaveClass('g-tabs-legacy__item_active');
    expect(tabComponent2).toHaveAttribute('aria-selected', 'true');
});

test('should call onSelectTab on tab click', async () => {
    const onSelectTabFn = jest.fn();
    const user = userEvent.setup();

    render(<Tabs items={[tab1, tab2]} onSelectTab={onSelectTabFn} />);
    const tabComponent1 = screen.getByTitle(tabTitle1);
    const tabComponent2 = screen.getByTitle(tabTitle2);

    await user.click(tabComponent2);
    expect(onSelectTabFn).toBeCalledWith(tabId2);

    await user.click(tabComponent1);
    expect(onSelectTabFn).toBeCalledWith(tabId1);
});

test('should wrap tabs', () => {
    const wrapQaId = 'wrap';

    render(
        <Tabs
            items={[tab1]}
            wrapTo={(_item: TabsItemProps, node: React.ReactNode, index: number) => {
                return (
                    <div data-qa={wrapQaId} key={index}>
                        {node}
                    </div>
                );
            }}
        />,
    );

    const wrapper = screen.getByTestId(wrapQaId);
    const tabComponent = screen.getByTitle(tabTitle1);

    expect(wrapper).toContainElement(tabComponent);
});
