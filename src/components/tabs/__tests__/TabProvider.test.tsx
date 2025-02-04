import userEvent from '@testing-library/user-event';

import {Tab, TabList, TabPanel, TabProvider} from '../';
import {render, screen} from '../../../../test-utils/utils';

import {panel1qa, panel2qa, tab1, tab2} from './constants';
import {ControlledTabs} from './helpers';

test('should render active tab and panel with correct attributes', () => {
    render(
        <TabProvider value={tab2.value}>
            <TabList>
                <Tab value={tab1.value} qa={tab1.qa}>
                    {tab1.title}
                </Tab>
                <Tab value={tab2.value} qa={tab2.qa}>
                    {tab2.title}
                </Tab>
            </TabList>
            <TabPanel value={tab1.value} qa={panel1qa}>
                panel1
            </TabPanel>
            <TabPanel value={tab2.value} qa={panel2qa}>
                panel2
            </TabPanel>
        </TabProvider>,
    );

    const tabComponent1 = screen.getByTestId(tab1.qa);
    const tabComponent2 = screen.getByTestId(tab2.qa);

    const panelComponent1 = screen.getByTestId(panel1qa);
    const panelComponent2 = screen.getByTestId(panel2qa);

    const tab1Id = tabComponent1.id;
    const tab2Id = tabComponent2.id;
    const panel1Id = panelComponent1.id;
    const panel2Id = panelComponent2.id;

    expect(tabComponent1).not.toHaveClass('g-tab_active');
    expect(tabComponent1).toHaveAttribute('aria-selected', 'false');
    expect(tab1Id).toBeDefined();
    expect(tabComponent1).toHaveAttribute('aria-controls', panel1Id);

    expect(tabComponent2).toHaveClass('g-tab_active');
    expect(tabComponent2).toHaveAttribute('aria-selected', 'true');
    expect(tab2Id).toBeDefined();
    expect(tabComponent2).toHaveAttribute('aria-controls', panel2Id);

    expect(panelComponent1).toHaveClass('g-tab-panel_hidden');
    expect(panel1Id).toBeDefined();
    expect(panelComponent1).toHaveAttribute('aria-labelledby', tab1Id);

    expect(panelComponent2).not.toHaveClass('g-tab-panel_hidden');
    expect(panel2Id).toBeDefined();
    expect(panelComponent2).toHaveAttribute('aria-labelledby', tab2Id);
});

test('should chose tabpanel on value change', async () => {
    render(<ControlledTabs value={tab1.value} />);

    const user = userEvent.setup();
    const panelComponent1 = screen.getByTestId(panel1qa);
    const panelComponent2 = screen.getByTestId(panel2qa);

    expect(panelComponent1).not.toHaveClass('g-tab-panel_hidden');
    expect(panelComponent2).toHaveClass('g-tab-panel_hidden');

    const tabComponent2 = screen.getByTestId(tab2.qa);
    await user.click(tabComponent2);

    expect(panelComponent1).toHaveClass('g-tab-panel_hidden');
    expect(panelComponent2).not.toHaveClass('g-tab-panel_hidden');
});
