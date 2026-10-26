import * as React from 'react';

import {Button} from '../../Button';
import {Popup} from '../../Popup';

import {ToastStories} from './helpersPlaywright';

function InlinePopupContent() {
    const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

    return (
        <React.Fragment>
            <div>VeryLongNotificationContentWithoutAnySpacesToBreakNaturally</div>
            <Button ref={setAnchorElement} style={{marginBlockStart: 'var(--g-spacing-3)'}}>
                Details
            </Button>
            <Popup
                open
                disablePortal
                disableTransition
                anchorElement={anchorElement}
                placement={['bottom-start']}
                offset={24}
                qa="inline-popup"
            >
                <div style={{padding: 'var(--g-spacing-4)'}}>
                    <Button>Inline popup action</Button>
                </div>
            </Popup>
        </React.Fragment>
    );
}

export function ToastWithInlinePopup() {
    return (
        <div style={{width: 312, paddingBlockEnd: 120}}>
            <ToastStories.ToastPlayground
                name="inline-popup-toast"
                theme="warning"
                autoHiding={false}
                isClosable
                title="VeryLongNotificationTitleWithoutAnySpacesToBreakNaturally"
                content={<InlinePopupContent />}
                actions={[]}
            />
        </div>
    );
}
