import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {HelpPopover} from '../../HelpPopover';
import {Text} from '../../Text';
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

export const WithLongLabel = Template.bind({});
WithLongLabel.args = {
    fieldName: 'Very long label for text field to test how it will wrap label text in real life',
};

export const WithFieldDescription = Template.bind({});
WithFieldDescription.args = {
    children: (
        <>
            <TextInput id={fieldId} />
            <Text as={'p'} style={{margin: '10px 0 0'}} color={'secondary'}>
                Your name as it used in your foreign passport.
            </Text>
        </>
    ),
};

export const RequiredField = Template.bind({});
RequiredField.args = {
    fieldRequired: true,
};

export const WithHelpPopover = Template.bind({});
WithHelpPopover.args = {
    fieldHelpPopover: (
        <HelpPopover
            content={'Your name as it used in your foreign passport.'}
            placement={['top', 'bottom']}
        />
    ),
};
