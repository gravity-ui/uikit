import React from 'react';

import {TabPanel} from '../';
import {render, screen} from '../../../../test-utils/utils';

import {tab1} from './constants';

test('should render tab panel by default', () => {
    render(<TabPanel value={tab1.id}>Panel Title</TabPanel>);
    const component = screen.getByRole('tabpanel');

    expect(component).toBeVisible();
    expect(component).not.toHaveClass('g-tabs__panel_active');

    expect(component).toHaveAttribute('id', `panel-${tab1.id}`);
    expect(component).toHaveAttribute('aria-labelledby', `tab-${tab1.id}`);
});
