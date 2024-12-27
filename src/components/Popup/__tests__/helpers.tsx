import * as React from 'react';

import type {PopupProps} from '../Popup';
import {Popup} from '../Popup';

import {VisualTestQA} from './constants';

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
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    ref={anchorRef}
                    style={{
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid tomato',
                    }}
                >
                    base content
                </div>
            </div>
        </React.Fragment>
    );
};
