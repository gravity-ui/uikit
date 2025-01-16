import userEvent from '@testing-library/user-event';

import {Tab, TabList, TabPanel, TabProvider} from '../';
import {render, screen} from '../../../../test-utils/utils';

import {panel1qa, panel2qa, tab1, tab2} from './constants';
import {ControlledTabs} from './helpers';

test('should render active tab and panel', () => {
    render(
        <TabProvider value={tab2.id}>
            <TabList>
                <Tab value={tab1.id} qa={tab1.qa}>
                    {tab1.title}
                </Tab>
                <Tab value={tab2.id} qa={tab2.qa}>
                    {tab2.title}
                </Tab>
            </TabList>
            <TabPanel value={tab1.id} qa={panel1qa}>
                panel1
            </TabPanel>
            <TabPanel value={tab2.id} qa={panel2qa}>
                panel2
            </TabPanel>
        </TabProvider>,
    );

    const tabComponent1 = screen.getByTestId(tab1.qa);
    const tabComponent2 = screen.getByTestId(tab2.qa);

    const panelComponent1 = screen.getByTestId(panel1qa);
    const panelComponent2 = screen.getByTestId(panel2qa);

    expect(tabComponent1).not.toHaveClass('g-tab-list__item_active');
    expect(tabComponent1).toHaveAttribute('aria-selected', 'false');

    expect(tabComponent2).toHaveClass('g-tab-list__item_active');
    expect(tabComponent2).toHaveAttribute('aria-selected', 'true');

    expect(panelComponent1).toBeEmptyDOMElement();
    expect(panelComponent1).not.toHaveClass('g-tab-list__panel_active');

    expect(panelComponent2).not.toBeEmptyDOMElement();
    expect(panelComponent2).toHaveClass('g-tab-list__panel_active');
});

test('should chose tabpanel on value change', async () => {
    render(<ControlledTabs value={tab1.id} />);

    const user = userEvent.setup();
    const panelComponent1 = screen.getByTestId(panel1qa);
    const panelComponent2 = screen.getByTestId(panel2qa);

    expect(panelComponent2).toBeEmptyDOMElement();
    expect(panelComponent2).not.toHaveClass('g-tab-list__panel_active');

    expect(panelComponent1).not.toBeEmptyDOMElement();
    expect(panelComponent1).toHaveClass('g-tab-list__panel_active');

    const tabComponent2 = screen.getByTestId(tab2.qa);

    await user.click(tabComponent2);

    expect(panelComponent1).toBeEmptyDOMElement();
    expect(panelComponent1).not.toHaveClass('g-tab-list__panel_active');

    expect(panelComponent2).not.toBeEmptyDOMElement();
    expect(panelComponent2).toHaveClass('g-tab-list__panel_active');
});
