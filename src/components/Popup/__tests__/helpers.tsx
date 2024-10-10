import React from 'react';

import {Button} from '../../Button';
import type {PopupProps} from '../Popup';
import {Popup} from '../Popup';

import {VisualTestQA} from './constants';

export const VisualTestPopup = (props: PopupProps) => {
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Popup
                {...props}
                open={open}
                anchorRef={anchorRef}
                onClose={() => setOpen(false)}
                qa={VisualTestQA.popupContent}
            >
                <div style={{padding: 10}}>Popup content</div>
            </Popup>
            <div
                style={{
                    width: '400px',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button ref={anchorRef} onClick={() => setOpen(!open)} qa={VisualTestQA.trigger}>
                    {open ? 'Hide' : 'Show'}
                </Button>
            </div>
        </React.Fragment>
    );
};
