import {TabPanel, TabProvider} from '../';
import {render, screen} from '../../../../test-utils/utils';

import {tab1} from './constants';

test('should render tab panel by default', () => {
    render(
        <TabProvider value={tab1.value}>
            <TabPanel value={tab1.value}>Panel Title</TabPanel>
        </TabProvider>,
    );
    const component = screen.getByRole('tabpanel');

    expect(component).toBeVisible();
    expect(component).not.toHaveClass('g-tab-panel_hidden');
});
