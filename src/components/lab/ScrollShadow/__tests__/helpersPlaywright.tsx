import * as React from 'react';

import {ScrollShadow} from '../ScrollShadow';
import {useScrollShadow} from '../useScrollShadow';

export function OpaqueContent() {
    return (
        <div style={{background: 'var(--g-color-base-generic)'}}>
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    padding: 8,
                    background: 'var(--g-color-base-generic)',
                }}
            >
                Sticky header
            </div>
            {Array.from({length: 16}, (_, index) => (
                <div
                    key={index}
                    style={{
                        height: 32,
                        padding: 8,
                        borderBottom: '1px solid var(--g-color-line-generic)',
                    }}
                >
                    Item {index + 1}
                </div>
            ))}
        </div>
    );
}

export function DynamicContent() {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <div>
            <button onClick={() => setExpanded((value) => !value)}>Toggle content</button>
            <ScrollShadow style={{width: expanded ? 180 : 260, height: 160}}>
                {expanded && <OpaqueContent />}
            </ScrollShadow>
        </div>
    );
}

export function ExistingScroller() {
    const ref = React.useRef<HTMLDivElement>(null);
    const shadow = useScrollShadow({ref});

    return (
        <div
            ref={ref}
            className={shadow.className}
            onScroll={shadow.onScroll}
            style={{width: 220, height: 160, overflow: 'auto'}}
        >
            <OpaqueContent />
        </div>
    );
}

const MemoScroller = React.memo(function MemoScroller() {
    return (
        <ScrollShadow axis="inline" style={{width: 220, height: 100}}>
            <div style={{width: 600, height: 80, background: 'var(--g-color-base-generic)'}} />
        </ScrollShadow>
    );
});

export function DynamicDirection() {
    const [rtl, setRtl] = React.useState(false);

    return (
        <div dir={rtl ? 'rtl' : 'ltr'}>
            <button onClick={() => setRtl((value) => !value)}>Toggle direction</button>
            <MemoScroller />
        </div>
    );
}
