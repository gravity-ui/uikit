import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Confirm} from '../Confirm';
import type {ConfirmProps} from '../Confirm';

export default {
    title: 'Components/Feedback/Confirm',
    component: Confirm,
} as Meta<ConfirmProps>;

const DefaultTemplate: StoryFn<ConfirmProps> = (args) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Button view="normal" onClick={() => setOpen(true)}>
                Show confirm
            </Button>
            <Confirm
                {...args}
                title="Do you want to confirm?"
                onConfirm={() => {
                    alert('Confirmed');
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
                cancelButtonText="No"
                confirmButtonText="Yes"
                open={open}
                aria-labelledby="app-confirmation-dialog-title"
            />
        </React.Fragment>
    );
};
export const Default = DefaultTemplate.bind({});
