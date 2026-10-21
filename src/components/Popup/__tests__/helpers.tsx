import * as React from 'react';

import {Button} from '../../Button';
import type {PopupProps} from '../Popup';
import {Popup} from '../Popup';

import {VisualTestQA} from './constants';

export const RapidReopenPopup = () => {
    const [anchorElement, setAnchorElement] = React.useState<HTMLDivElement | null>(null);
    const [open, setOpen] = React.useState(true);

    return (
        <React.Fragment>
            <div ref={setAnchorElement} style={{margin: 100, width: 100, height: 50}}>
                Anchor
            </div>
            <Button onClick={() => setOpen(true)}>Open popup</Button>
            <Popup
                anchorElement={anchorElement}
                open={open}
                onOpenChange={setOpen}
                placement="bottom"
                qa={VisualTestQA.popupContent}
            >
                Popup content
            </Popup>
        </React.Fragment>
    );
};

export const TestPopup = (props: PopupProps) => {
    const anchorRef = React.useRef<HTMLDivElement>(null);

    return (
        <React.Fragment>
            <Popup
                {...props}
                open
                onClose={() => {
                    // nothing
                }}
                anchorRef={anchorRef}
                qa={VisualTestQA.popupContent}
            >
                <div style={{padding: 10}}>Popup content</div>
            </Popup>
            <div
                style={{
                    width: '400px',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    ref={anchorRef}
                    style={{
                        width: '200px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid tomato',
                    }}
                >
                    trigger block
                </div>
            </div>
        </React.Fragment>
    );
};
