import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Select} from '../../Select/Select';
import type {DialogProps} from '../Dialog';
import {Dialog} from '../Dialog';

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
    const [open, setOpen] = React.useState(false);

    const initialFocusRef = React.useRef<HTMLButtonElement>(null);

    return (
        <React.Fragment>
            <Button view="normal" onClick={() => setOpen(true)}>
                Show dialog
            </Button>
            <Dialog
                {...args}
                onClose={() => setOpen(false)}
                open={open}
                initialFocus={initialFocusRef}
                aria-labelledby={dialogTitleId}
            >
                <Dialog.Header caption="Caption" id={dialogTitleId} />
                <Dialog.Body>
                    <Select
                        ref={initialFocusRef}
                        options={[
                            {value: 'valueA', content: 'Value A'},
                            {value: 'valueB', content: 'Value B'},
                            {value: 'valueC', content: 'Value C'},
                            {value: 'valueD', content: 'Value D'},
                        ]}
                    />
                </Dialog.Body>
                <Dialog.Footer
                    onClickButtonCancel={() => setOpen(false)}
                    onClickButtonApply={() => alert('onApply')}
                    textButtonApply="Apply"
                    textButtonCancel="Cancel"
                    showError={showError}
                    errorText="Error text"
                />
            </Dialog>
        </React.Fragment>
    );
};
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <DialogShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
