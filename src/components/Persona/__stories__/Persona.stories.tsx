import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker/locale/en';
import {Tooltip} from '../../Tooltip';
import {Persona} from '../Persona';

const person = 'Charles Darwin';

export default {
    title: 'Components/Persona',
    component: Persona,
    args: {
        text: person,
    },
} as ComponentMeta<typeof Persona>;

const email = faker.internet.email(...person.split(' '));
const personImg = faker.internet.avatar();

const Template: ComponentStory<typeof Persona> = (args) => <Persona {...args} />;

export const Default = Template.bind({});

export const Image = Template.bind({});
Image.args = {
    image: personImg,
};

export const Email = Template.bind({});
Email.args = {
    text: email,
    type: 'email',
};

export const Empty = Template.bind({});
Empty.args = {
    type: 'empty',
};

export const Clickable = Template.bind({});
Clickable.args = {
    onClick: (text) => console.log('clicked', text),
};

export const Closable = Template.bind({});
Closable.args = {
    onClose: (text) => console.log('closed', text),
};

function CustomButton() {
    return (
        <Tooltip content={'This action is not permitted'}>
            <Persona.Button extraProps={{'aria-label': 'Remove user from the list'}} />
        </Tooltip>
    );
}

CustomButton.displayName = 'CustomButton';

export const WithCustomButton = Template.bind({});
WithCustomButton.args = {
    renderButton: () => <CustomButton />,
};
