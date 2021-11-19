import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Modal, ModalProps} from '../Modal';

export default {
    title: 'Components/Modal',
    component: Modal,
} as Meta;

const DefaultTemplate: Story<ModalProps> = (args) => <Modal {...args} />;
export const Default = DefaultTemplate.bind({});
