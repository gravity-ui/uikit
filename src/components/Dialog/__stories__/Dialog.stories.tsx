import React, {useState} from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {Button} from '../../Button';
import {Dialog} from '../Dialog';
import {DialogShowcase} from './DialogShowcase';

export default {
    title: 'Components/Dialog',
    component: Dialog,
} as Meta;

const DefaultTemplate: Story = (args: any) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button view="normal" onClick={() => setOpen(true)}>
                Show dialog
            </Button>
            <Dialog
                {...args}
                onClose={() => setOpen(false)}
                open={open}
                onEnterKeyDown={() => {
                    alert('onEnterKeyDown');
                }}
            >
                <Dialog.Header caption="Caption" />
                <Dialog.Body>Dialog.Body</Dialog.Body>
                <Dialog.Footer
                    onClickButtonCancel={() => setOpen(false)}
                    onClickButtonApply={() => alert('onApply')}
                    textButtonApply="Apply"
                    textButtonCancel="Cancel"
                />
            </Dialog>
        </>
    );
};
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story = () => <DialogShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
