import React from 'react';

import {Meta, Story} from '@storybook/react';

import {GearIcon} from '../../icons/GearIcon';
import {Icon, IconProps} from '../Icon';

export default {
    title: 'Components/Icon',
    component: Icon,
} as Meta;

const DefaultTemplate: Story<IconProps> = (args) => <Icon {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    data: GearIcon,
};

export const DataUri = DefaultTemplate.bind({});
DataUri.args = {
    data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMTZDMCA3LjE2MyA3LjE2MyAwIDE2IDBzMTYgNy4xNjMgMTYgMTYtNy4xNjMgMTYtMTYgMTZTMCAyNC44MzcgMCAxNnoiIGZpbGw9IiM1MjgyRkYiLz48cGF0aCBkPSJNMjIuMTI1IDE4Ljg0NFY5LjY1NmMwLS4zNTUtLjMtLjY1Ni0uNjU2LS42NTZIMTIuNWEyLjYyNiAyLjYyNiAwIDAgMC0yLjYyNSAyLjYyNXY4Ljc1QTIuNjI2IDIuNjI2IDAgMCAwIDEyLjUgMjNoOC45NjlhLjY0OC42NDggMCAwIDAgLjY1Ni0uNjU2di0uNDM4YS42NjQuNjY0IDAgMCAwLS4yNDYtLjQ5MmMtLjEzNy0uNDM3LS4xMzctMS42NCAwLTIuMDUuMTM3LS4xMS4yNDYtLjMwMi4yNDYtLjUyem0tOC43NS02LjE4YzAtLjA4Mi4wNTUtLjE2NC4xNjQtLjE2NGg1Ljc5N2MuMDgyIDAgLjE2NC4wODIuMTY0LjE2NHYuNTQ3YzAgLjExLS4wODIuMTY0LS4xNjQuMTY0aC01Ljc5N2MtLjExIDAtLjE2NC0uMDU1LS4xNjQtLjE2NHYtLjU0N3ptMCAxLjc1YzAtLjA4Mi4wNTUtLjE2NC4xNjQtLjE2NGg1Ljc5N2MuMDgyIDAgLjE2NC4wODIuMTY0LjE2NHYuNTQ3YzAgLjExLS4wODIuMTY0LS4xNjQuMTY0aC01Ljc5N2MtLjExIDAtLjE2NC0uMDU1LS4xNjQtLjE2NHYtLjU0N3ptNi45MTggNi44MzZIMTIuNWEuODY0Ljg2NCAwIDAgMS0uODc1LS44NzVjMC0uNDY1LjM4My0uODc1Ljg3NS0uODc1aDcuNzkzYTkuMzUgOS4zNSAwIDAgMCAwIDEuNzV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+',
};
