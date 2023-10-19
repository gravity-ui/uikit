import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {ComponentMeta, ComponentStory} from '@storybook/react';

import {Persona} from '../Persona';

export default {
    title: 'Components/Data Display/Persona',
    component: Persona,
} as ComponentMeta<typeof Persona>;

const person = 'Charles Darwin';
const email = faker.internet.email(...person.split(' '));
const personImg = faker.internet.avatar();

const Template: ComponentStory<typeof Persona> = (args) => <Persona {...args} />;

export const Default = Template.bind({});
Default.args = {
    text: person,
};

export const Image = Template.bind({});
Image.args = {
    text: person,
    image: personImg,
};

export const Email = Template.bind({});
Email.args = {
    text: email,
    type: 'email',
};

export const Empty = Template.bind({});
Empty.args = {
    text: person,
    type: 'empty',
};

export const Clickable = Template.bind({});
Clickable.args = {
    text: person,
    onClick: (text) => console.log('clicked', text),
};

export const Closable = Template.bind({});
Closable.args = {
    text: person,
    onClose: (text) => console.log('closed', text),
};
