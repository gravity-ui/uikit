import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Modal} from '../Modal';
import type {ModalProps} from '../Modal';

export default {
    title: 'Components/Overlays/Modal',
    component: Modal,
} as Meta;

const showButtonStyle = {
    width: '100%',
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export const Default: StoryFn<ModalProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Modal {...props} open={open} onClose={() => setOpen(false)}>
                <div style={{padding: 10}}>Modal content</div>
            </Modal>
            <div style={showButtonStyle}>
                <Button onClick={() => setOpen(true)}>Show</Button>
            </div>
        </React.Fragment>
    );
};

export const FullPage: StoryFn<ModalProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Modal {...props} open={open} onClose={() => setOpen(false)} fullPage>
                <div style={{padding: 10}}>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </div>
            </Modal>
            <div style={showButtonStyle}>
                <Button onClick={() => setOpen(true)}>Show full page modal</Button>
            </div>
        </React.Fragment>
    );
};
