import {Fragment, useState} from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Dialog} from '../Dialog';
import type {DialogProps} from '../Dialog';

import {DialogShowcase} from './DialogShowcase';

export default {
    title: 'Components/Overlays/Dialog',
    component: Dialog,
    argTypes: {
        showError: {
            type: 'boolean',
        },
    },
} as Meta<DialogProps>;

const DefaultTemplate: StoryFn<DialogProps & {showError: boolean}> = ({showError, ...args}) => {
    const dialogTitleId = 'app-confirmation-dialog-title';
    const [open, setOpen] = useState(false);
    return (
        <Fragment>
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
                    showError={showError}
                    errorText="Error text"
                />
            </Dialog>
        </Fragment>
    );
};
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <DialogShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
