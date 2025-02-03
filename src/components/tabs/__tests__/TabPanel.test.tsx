import {TabPanel} from '../';
import {render, screen} from '../../../../test-utils/utils';

import {tab1} from './constants';

test('should render tab panel by default', () => {
    render(<TabPanel value={tab1.value}>Panel Title</TabPanel>);
    const component = screen.getByRole('tabpanel');

    expect(component).toBeVisible();
    expect(component).toHaveClass('g-tab-panel_hidden');
});
