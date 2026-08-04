import userEvent from '@testing-library/user-event';

import {Tab, TabList} from '..';
import {act, render, screen} from '../../../../test-utils/utils';
import {KeyCode} from '../../../constants';
import {ThemeProvider} from '../../theme';
import type {TabSize} from '../types';

const qaId = 'tabs-list';

import {tab1, tab2, tab3, tab4} from './constants';

test('should render tabs by default', () => {
    render(<TabList qa={qaId} />);
    const component = screen.getByTestId(qaId);

    expect(component).toBeVisible();
    expect(component).toHaveClass('g-tab-list');
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

test('should have passed className', () => {
    const className = 'class-name';

    render(<TabList className={className} qa={qaId} />);
    const component = screen.getByTestId(qaId);

    expect(component).toHaveClass(className);
});

test('should not select tab by default', () => {
    render(
        <TabList>
            <Tab value={tab1.value} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );
    const tabComponent1 = screen.getByTestId(tab1.qa);
    const tabComponent2 = screen.getByTestId(tab2.qa);

    expect(tabComponent1).not.toHaveClass('g-tab_active');
    expect(tabComponent1).toHaveAttribute('aria-selected', 'false');

    expect(tabComponent2).not.toHaveClass('g-tab_active');
    expect(tabComponent2).toHaveAttribute('aria-selected', 'false');
});

test('should render active tab', () => {
    render(
        <TabList value={tab2.value}>
            <Tab value={tab1.value} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );
    const tabComponent1 = screen.getByTestId(tab1.qa);
    const tabComponent2 = screen.getByTestId(tab2.qa);

    expect(tabComponent1).not.toHaveClass('g-tab_active');
    expect(tabComponent1).toHaveAttribute('aria-selected', 'false');

    expect(tabComponent2).toHaveClass('g-tab_active');
    expect(tabComponent2).toHaveAttribute('aria-selected', 'true');
});

test('should call onUpdate on tab click', async () => {
    const onUpdateFn = jest.fn();
    const user = userEvent.setup();

    render(
        <TabList onUpdate={onUpdateFn}>
            <Tab value={tab1.value} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );
    const tabComponent1 = screen.getByTestId(tab1.qa);
    const tabComponent2 = screen.getByTestId(tab2.qa);

    await user.click(tabComponent2);
    expect(onUpdateFn).toHaveBeenCalledWith(tab2.value);

    await user.click(tabComponent1);
    expect(onUpdateFn).toHaveBeenCalledWith(tab1.value);
});

test('should not call onUpdate if default prevented', async () => {
    const onUpdateFn = jest.fn();
    const user = userEvent.setup();

    render(
        <TabList onUpdate={onUpdateFn}>
            <Tab value={tab1.value} qa={tab1.qa} onClick={(e) => e.preventDefault()}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );

    const tabComponent1 = screen.getByTestId(tab1.qa);
    const tabComponent2 = screen.getByTestId(tab2.qa);

    await user.click(tabComponent1);
    await user.click(tabComponent2);

    expect(onUpdateFn).toBeCalledTimes(1);
    expect(onUpdateFn).toHaveBeenCalledWith(tab2.value);
});

test('should wrap tabs', () => {
    const wrapQaId = 'wrap';

    render(
        <TabList>
            <div data-qa={wrapQaId}>
                <Tab value={tab1.value}>{tab1.title}</Tab>
            </div>
        </TabList>,
    );

    const wrapper = screen.getByTestId(wrapQaId);
    const tabComponent = screen.getByText(tab1.title);

    expect(wrapper).toContainElement(tabComponent);
});

test('should call onUpdate on "{Space}" key', async () => {
    const onUpdateFn = jest.fn();
    const user = userEvent.setup();
    render(
        <TabList onUpdate={onUpdateFn}>
            <Tab value={tab1.value} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );

    const tabComponent2 = screen.getByTestId(tab2.qa);

    act(() => tabComponent2.focus());
    await user.keyboard(' ');

    expect(onUpdateFn).toHaveBeenCalledWith(tab2.value);
});

test('should call onUpdate on "{Enter}" key', async () => {
    const onUpdateFn = jest.fn();
    const user = userEvent.setup();

    render(
        <TabList onUpdate={onUpdateFn}>
            <Tab value={tab1.value} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );

    const tabComponent2 = screen.getByTestId(tab2.qa);

    act(() => tabComponent2.focus());
    await user.keyboard('{Enter}');

    expect(onUpdateFn).toHaveBeenCalledWith(tab2.value);
});

test('move focus on LEFT/RIGHT arrows', async () => {
    const user = userEvent.setup();

    render(
        <TabList value={tab2.value}>
            <div>
                <Tab value={tab1.value} qa={tab1.qa}>
                    {tab1.title}
                </Tab>
            </div>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
            <Tab disabled value={tab3.value} qa={tab3.qa}>
                {tab3.title}
            </Tab>
            <Tab value={tab4.value} qa={tab4.qa}>
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
        <TabList value={tab2.value}>
            <div>
                <Tab value={tab1.value} qa={tab1.qa}>
                    {tab1.title}
                </Tab>
            </div>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
            <Tab value={tab3.value} qa={tab3.qa}>
                {tab3.title}
            </Tab>
            <Tab disabled value={tab4.value} qa={tab4.qa}>
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

function makeDOMRect(width: number): DOMRect {
    return {
        width,
        height: 40,
        x: 0,
        y: 0,
        top: 0,
        right: width,
        bottom: 40,
        left: 0,
        toJSON: () => ({}),
    } as DOMRect;
}

function mockNarrowContainer() {
    return jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element,
    ) {
        if (this.classList.contains('g-tab-list')) return makeDOMRect(50);
        if (this.classList.contains('g-tab-more')) return makeDOMRect(80);
        return makeDOMRect(100); // tabs
    });
}

test('contentOverflow collapse: shows localized More button when some tabs overflow', () => {
    // Container 280px: More(80) + Tab1(100) + Tab2(100) = 280 fits, Tab3(100) would exceed
    const spy = jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element,
    ) {
        if (this.classList.contains('g-tab-list')) return makeDOMRect(280);
        if (this.classList.contains('g-tab-more')) return makeDOMRect(80);
        return makeDOMRect(100);
    });

    render(
        <TabList contentOverflow="collapse" value={tab1.value}>
            <Tab value={tab1.value} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
            <Tab value={tab3.value} qa={tab3.qa}>
                {tab3.title}
            </Tab>
        </TabList>,
        {wrapper: ({children}) => <ThemeProvider lang="ru">{children}</ThemeProvider>},
    );

    const trigger = screen.getByRole('button', {name: /ещё/i});
    expect(trigger).toHaveClass('g-tab-more');
    expect(screen.getByTestId(tab1.qa)).toBeVisible();
    expect(screen.getByTestId(tab2.qa)).toBeVisible();
    // tab3 is collapsed into the closed menu — not mounted
    expect(screen.queryByTestId(tab3.qa)).not.toBeInTheDocument();

    spy.mockRestore();
});

test('contentOverflow collapse: supports custom moreLabel', () => {
    const spy = jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element,
    ) {
        if (this.classList.contains('g-tab-list')) return makeDOMRect(280);
        if (this.classList.contains('g-tab-more')) return makeDOMRect(80);
        return makeDOMRect(100);
    });

    render(
        <TabList contentOverflow="collapse" value={tab1.value} moreLabel="Ещё">
            <Tab value={tab1.value} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
            <Tab value={tab3.value} qa={tab3.qa}>
                {tab3.title}
            </Tab>
        </TabList>,
    );

    expect(screen.getByRole('button', {name: /ещё/i})).toBeInTheDocument();

    spy.mockRestore();
});

test('contentOverflow collapse: with narrow container shows selected tab as trigger', () => {
    const spy = mockNarrowContainer();

    render(
        <TabList contentOverflow="collapse" value={tab1.value}>
            <Tab value={tab1.value} qa={tab1.qa}>
                {tab1.title}
            </Tab>
            <Tab value={tab2.value} qa={tab2.qa}>
                {tab2.title}
            </Tab>
        </TabList>,
    );

    const trigger = screen.getByRole('button', {name: new RegExp(tab1.title)});
    expect(trigger).toHaveClass('g-tab-more');
    expect(trigger).not.toHaveTextContent('More');
    expect(trigger).toHaveTextContent(tab1.title);

    spy.mockRestore();
});

test('contentOverflow collapse: with narrow container and single tab does not render collapse button', () => {
    const spy = mockNarrowContainer();

    render(
        <TabList contentOverflow="collapse" value={tab1.value}>
            <Tab value={tab1.value} qa={tab1.qa}>
                {tab1.title}
            </Tab>
        </TabList>,
    );

    expect(screen.queryByRole('button', {name: /more/i})).not.toBeInTheDocument();
    expect(screen.getByTestId(tab1.qa)).toBeVisible();

    spy.mockRestore();
});
