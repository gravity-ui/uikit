import React, {useState} from 'react';
import {Story, Meta} from '@storybook/react';
import {Button} from '../../Button';
import {Dialog, DialogProps} from '../Dialog';
import {DialogShowcase} from './DialogShowcase';

export default {
    title: 'Components/Dialog',
    component: Dialog,
} as Meta<DialogProps>;

const DefaultTemplate: Story<DialogProps> = (args) => {
    const dialogTitleId = 'app-confirmation-dialog-title';
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
                aria-labelledby={dialogTitleId}
            >
                <Dialog.Header caption="Caption" id={dialogTitleId} />
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
