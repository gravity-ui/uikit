import {TabPanel} from '../';
import {render, screen} from '../../../../test-utils/utils';

import {tab1} from './constants';

test('should render tab panel by default', () => {
    render(<TabPanel value={tab1.id}>Panel Title</TabPanel>);
    const component = screen.getByRole('tabpanel');

    expect(component).toBeVisible();
    expect(component).not.toHaveClass('g-tabs__panel_active');
});

test('should passed aria-labelledby and id', () => {
    const panelId = 'panel-id';
    const ariaId = 'aria-id';
    render(
        <TabPanel value={tab1.id} aria-labelledby={ariaId} id={panelId}>
            Panel Title
        </TabPanel>,
    );

    const component = screen.getByRole('tabpanel');

    expect(component).toHaveAttribute('aria-labelledby', ariaId);
    expect(component).toHaveAttribute('id', panelId);
});
