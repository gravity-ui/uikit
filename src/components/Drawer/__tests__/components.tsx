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
