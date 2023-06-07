import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Dialog} from '../Dialog';
import type {DialogProps} from '../Dialog';

import {DialogShowcase} from './DialogShowcase';

export default {
    title: 'Components/Dialog',
    component: Dialog,
} as Meta<DialogProps>;

const DefaultTemplate: StoryFn<DialogProps> = (args) => {
    const dialogTitleId = 'app-confirmation-dialog-title';
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <DialogShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
