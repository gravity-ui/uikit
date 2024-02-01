import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryObj} from '@storybook/react';

import {UserLabel} from '../UserLabel';

const meta: Meta<typeof UserLabel> = {
    title: 'Components/Data Display/UserLabel',
    component: UserLabel,
};

export default meta;

type Story = StoryObj<typeof UserLabel>;

const person = 'Charles Darwin';
const email = faker.internet.email(...person.split(' '));
const personImg = faker.internet.avatar();

export const Default: Story = {
    args: {
        children: person,
    },
};

export const Image: Story = {
    args: {
        avatar: {
            imgUrl: personImg,
        },
        children: person,
    },
};

export const Email: Story = {
    args: {
        type: 'email',
        children: email,
    },
};

export const Empty: Story = {
    args: {
        type: 'empty',
        children: person,
    },
};

export const LongChildren: Story = {
    args: {
        children: person.repeat(100),
    },
};

export const Clickable: Story = {
    args: {
        children: person,
        onClick: (value) => console.log('clicked', value),
    },
};

export const Closable: Story = {
    args: {
        children: person,
        onCloseClick: (value) => console.log('closed', value),
    },
};
