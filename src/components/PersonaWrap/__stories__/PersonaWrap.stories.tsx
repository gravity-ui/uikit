import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {PersonaWrap} from '../PersonaWrap';

export default {
    title: 'Components/PersonaWrap',
    component: PersonaWrap,
    args: {
        children: 'Darwin',
    },
} as ComponentMeta<typeof PersonaWrap>;

const personImg = faker.internet.avatar();

const Template: ComponentStory<typeof PersonaWrap> = (args) => <PersonaWrap {...args} />;
export const Default = Template.bind({});
Default.args = {
    avatar: <img alt={''} src={personImg} />,
};
