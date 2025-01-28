import userEvent from '@testing-library/user-event';

import {Tab, TabList} from '../';
import {render, screen} from '../../../../test-utils/utils';
import {KeyCode} from '../../../constants';
import type {TabSize} from '../types';

const qaId = 'tabs-list';

import {tab1, tab2, tab3, tab4} from './constants';

test('should render tabs by default', () => {
    render(<TabList qa={qaId} />);
    const component = screen.getByTestId(qaId);

    expect(component).toBeVisible();
    expect(component).toHaveClass('g-tab-list_size_m');
});

test('should not render tabs if no items', () => {
    render(<TabList />);
    const component = screen.getByRole('tablist');
    const tabsComponents = screen.queryAllByRole('tab');

    expect(component).toBeEmptyDOMElement();
    expect(tabsComponents).toHaveLength(0);
});

test.each(new Array<TabSize>('m', 'l', 'xl'))('should render with given "%s" size', (size) => {
    render(<TabList size={size} qa={qaId} />);
    const component = screen.getByTestId(qaId);

    expect(component).toHaveClass(`g-tab-list_size_${size}`);
});

test('should passed className', () => {
    const className = 'class-name';

    render(<TabList className={className} qa={qaId} />);
    const component = screen.getByTestId(qaId);

    expect(component).toHaveClass(className);
});

test('should not select tab by default', () => {
    render(
        <TabList>
            <Tab value={tab1.id} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.id} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );
    const tabComponent1 = screen.getByTestId(tab1.qa);
    const tabComponent2 = screen.getByTestId(tab2.qa);

    expect(tabComponent1).not.toHaveClass('g-tab-list__item_active');
    expect(tabComponent1).toHaveAttribute('aria-selected', 'false');

    expect(tabComponent2).not.toHaveClass('g-tab-list__item_active');
    expect(tabComponent2).toHaveAttribute('aria-selected', 'false');
});

test('should passed active tab', () => {
    render(
        <TabList value={tab2.id}>
            <Tab value={tab1.id} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.id} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );
    const tabComponent1 = screen.getByTestId(tab1.qa);
    const tabComponent2 = screen.getByTestId(tab2.qa);

    expect(tabComponent1).not.toHaveClass('g-tab-list__item_active');
    expect(tabComponent1).toHaveAttribute('aria-selected', 'false');

    expect(tabComponent2).toHaveClass('g-tab-list__item_active');
    expect(tabComponent2).toHaveAttribute('aria-selected', 'true');
});

test('should call onUpdate on tab click', async () => {
    const onUpdateFn = jest.fn();
    const user = userEvent.setup();

    render(
        <TabList onUpdate={onUpdateFn}>
            <Tab value={tab1.id} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.id} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );
    const tabComponent1 = screen.getByTestId(tab1.qa);
    const tabComponent2 = screen.getByTestId(tab2.qa);

    await user.click(tabComponent2);
    expect(onUpdateFn).toHaveBeenCalledWith(tab2.id);

    await user.click(tabComponent1);
    expect(onUpdateFn).toHaveBeenCalledWith(tab1.id);
});

test('should wrap tabs', () => {
    const wrapQaId = 'wrap';

    render(
        <TabList>
            <div data-qa={wrapQaId}>
                <Tab value={tab1.id}>{tab1.title}</Tab>
            </div>
        </TabList>,
    );

    const wrapper = screen.getByTestId(wrapQaId);
    const tabComponent = screen.getByText(tab1.title);

    expect(wrapper).toContainElement(tabComponent);
});

test('should call onUpdate on "\' \'" key', async () => {
    const onUpdateFn = jest.fn();
    const user = userEvent.setup();
    render(
        <TabList onUpdate={onUpdateFn}>
            <Tab value={tab1.id} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.id} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );

    const tabComponent2 = screen.getByTestId(tab2.qa);
    tabComponent2.focus();

    await user.keyboard(' ');

    expect(onUpdateFn).toHaveBeenCalledWith(tab2.id);
});

test('should call onUpdate on "[Enter]" key', async () => {
    const onUpdateFn = jest.fn();
    const user = userEvent.setup();

    render(
        <TabList onUpdate={onUpdateFn}>
            <Tab value={tab1.id} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.id} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );

    const tabComponent2 = screen.getByTestId(tab2.qa);
    tabComponent2.focus();

    await user.keyboard('[Enter]');

    expect(onUpdateFn).toHaveBeenCalledWith(tab2.id);
});

test('move focus on LEFT/RIGHT arrows', async () => {
    const user = userEvent.setup();

    render(
        <TabList value={tab2.id}>
            <div>
                <Tab value={tab1.id} qa={tab1.qa}>
                    {tab1.title}
                </Tab>
            </div>
            <Tab value={tab2.id} qa={tab2.qa}>
                {tab2.title}
            </Tab>
            <Tab disabled value={tab3.id} qa={tab3.qa}>
                {tab3.title}
            </Tab>
            <Tab value={tab4.id} qa={tab4.qa}>
                {tab4.title}
            </Tab>
        </TabList>,
    );

    const tabs = screen.queryAllByRole('tab');

    await user.keyboard(`{${KeyCode.TAB}}`);
    // active tab
    expect(tabs[1]).toHaveFocus();

    await user.keyboard(`{${KeyCode.ARROW_RIGHT}}`);
    expect(tabs[3]).toHaveFocus();
    expect(tabs[3]).toHaveAttribute('aria-selected', 'false');

    await user.keyboard(`{${KeyCode.ARROW_RIGHT}}`);
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');

    await user.keyboard(`{${KeyCode.ARROW_RIGHT}}`);
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard(`{${KeyCode.ARROW_LEFT}}`);
    expect(tabs[0]).toHaveFocus();

    await user.keyboard(`{${KeyCode.ARROW_LEFT}}`);
    expect(tabs[3]).toHaveFocus();

    await user.keyboard(`{${KeyCode.ARROW_LEFT}}`);
    expect(tabs[1]).toHaveFocus();

    await user.keyboard(`{${KeyCode.ARROW_LEFT}}`);
    expect(tabs[0]).toHaveFocus();
});

it('move focus to the first/last tab on HOME/END button', async () => {
    const user = userEvent.setup();
    render(
        <TabList value={tab2.id}>
            <div>
                <Tab value={tab1.id} qa={tab1.qa}>
                    {tab1.title}
                </Tab>
            </div>
            <Tab value={tab2.id} qa={tab2.qa}>
                {tab2.title}
            </Tab>
            <Tab value={tab3.id} qa={tab3.qa}>
                {tab3.title}
            </Tab>
            <Tab disabled value={tab4.id} qa={tab4.qa}>
                {tab4.title}
            </Tab>
        </TabList>,
    );

    const tabs = screen.queryAllByRole('tab');

    await user.keyboard(`{${KeyCode.TAB}}`);
    // active tab
    expect(tabs[1]).toHaveFocus();

    await user.keyboard(`{${KeyCode.END}}`);
    expect(tabs[2]).toHaveFocus();

    await user.keyboard(`{${KeyCode.HOME}}`);
    expect(tabs[0]).toHaveFocus();
});
