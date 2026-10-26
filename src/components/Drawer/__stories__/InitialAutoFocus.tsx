import * as React from 'react';

import {Button} from '../../Button';
import {Text} from '../../Text';
import {TextInput} from '../../controls/TextInput';
import {Drawer} from '../components/Drawer';

export function InitialAutoFocusShowcase() {
    const [open, setOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <div style={{padding: 24}}>
            <Button view="action" onClick={() => setOpen(true)}>
                Open Drawer
            </Button>
            <Drawer open={open} onOpenChange={setOpen} initialFocus={inputRef}>
                <div
                    style={{
                        boxSizing: 'border-box',
                        padding: '24px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                        height: '100%',
                    }}
                >
                    <Text variant="header-1">Auto Focus Example</Text>
                    <Text color="secondary">
                        The input below receives focus automatically when the drawer opens.
                    </Text>
                    <TextInput controlRef={inputRef} placeholder="Focused automatically on open" />
                    <Button view="action" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </div>
            </Drawer>
        </div>
    );
}
