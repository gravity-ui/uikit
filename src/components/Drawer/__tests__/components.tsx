import * as React from 'react';

import {Drawer} from '../components/Drawer';

function PlaceholderText() {
    return (
        <div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
                Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus
                rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non
                est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
                Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin
                quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia
                dui, a porttitor lectus condimentum laoreet.
            </p>
            <p>
                Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in
                metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus
                tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate,
                ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit
                amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere. Vestibulum
                ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin
                vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In
                condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla,
                orci ac euismod semper, magna.
            </p>
        </div>
    );
}

export function ResizableItemShowcase() {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
            <Drawer
                open={isOpen}
                onOpenChange={setIsOpen}
                direction="right"
                resizable
                minSize={300}
                maxSize={800}
                style={{
                    height: '100%',
                }}
                qa="drawer"
            >
                <div
                    style={{height: '100%', overflow: 'auto', padding: '20px'}}
                    data-qa="drawer-item"
                >
                    <PlaceholderText />
                </div>
            </Drawer>
        </div>
    );
}

export function HideVeilShowcase() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
            <Drawer open direction="right" hideVeil style={{padding: '10px'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <PlaceholderText />
                </div>
            </Drawer>
        </div>
    );
}
