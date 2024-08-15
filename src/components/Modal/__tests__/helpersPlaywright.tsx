import React from 'react';

import type {ModalProps} from '../Modal';
import {Modal} from '../Modal';

import {ModalQa} from './constants';

export const TestModal = (props: Partial<Omit<ModalProps, 'open' | 'onClose'>>) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Modal {...props} open={open} onClose={() => setOpen(false)} qa={ModalQa.content}>
                <div style={{padding: 10}}>Modal content</div>
            </Modal>
            <div
                style={{
                    width: '100%',
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <button data-qa={ModalQa.trigger} onClick={() => setOpen(true)}>
                    Show
                </button>
            </div>
        </React.Fragment>
    );
};
