import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {FormRow} from '../FormRow';
import {TextInput} from '../../TextInput';

const fieldId = 'form-row-input-id';

export default {
    title: 'Components/FormRow',
    component: FormRow,
    args: {
        fieldName: 'Enter your name',
        fieldId,
        children: <TextInput id={fieldId} />,
    },
} as ComponentMeta<typeof FormRow>;

const Template: ComponentStory<typeof FormRow> = (args) => <FormRow {...args} />;

export const Default = Template.bind({});

export const RequiredField = Template.bind({});
RequiredField.args = {
    fieldRequired: true,
};
