import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {Drawer} from '../components/Drawer';

faker.seed(123);
const mockText = faker.lorem.sentences(15);

export function ResizableItemShowcase() {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '1200px', height: '600px'}}>
            <Drawer
                open={isOpen}
                onOpenChange={setIsOpen}
                placement="right"
                resizable
                minSize={300}
                maxSize={800}
                qa="test-drawer"
            >
                <div style={{height: '100%', padding: '20px'}} data-qa="test-drawer-item">
                    {mockText}
                </div>
            </Drawer>
        </div>
    );
}

export function HideVeilShowcase() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '1200px', height: '600px'}}>
            <Drawer open placement="right" qa="test-drawer" hideVeil>
                <div
                    style={{
                        height: '100%',
                        padding: '20px',
                    }}
                >
                    {mockText}
                </div>
            </Drawer>
        </div>
    );
}

export function ResizeOverIframeShowcase() {
    const [size, setSize] = React.useState(300);
    // Keep the callback stable so the resize listeners are not replaced during a drag.
    const onResize = React.useCallback((nextSize: number) => setSize(nextSize), []);

    return (
        <div style={{position: 'relative', width: '1200px', height: '600px'}}>
            <iframe
                title="Resize test background"
                srcDoc="<body style='margin:0;height:100%;background:#c00'></body>"
                style={{position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0}}
            />
            <Drawer
                open
                aria-label="Resizable drawer"
                hideVeil
                disableTransition
                placement="right"
                resizable
                size={size}
                minSize={200}
                maxSize={400}
                onResize={onResize}
                qa="test-drawer"
            >
                <div style={{height: '100%', padding: '20px'}} />
            </Drawer>
        </div>
    );
}
