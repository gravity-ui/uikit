import React from 'react';

import {actions} from '@storybook/addon-actions';
import type {Meta, Story} from '@storybook/react/types-6-0';

import type {PromoSheetProps} from '../PromoSheet';
import {PromoSheet} from '../PromoSheet';

export default {
    title: 'Components/PromoSheet',
    component: PromoSheet,
} as Meta;

const actionsHandlers = actions('onActionClick', 'onClose');

const DefaultTemplate: Story<PromoSheetProps> = (args) => {
    return <PromoSheet {...args} {...actionsHandlers} />;
};

export const Default = DefaultTemplate.bind({});

Default.args = {
    title: 'Some announcement title',
    message:
        'Some announcement message with a lot of text. We want to see how it looks like when there is more than one line of text. Check if everything looks OK with margins.',
    actionText: 'Action',
    closeText: 'Close',
};
Default.parameters = {};
