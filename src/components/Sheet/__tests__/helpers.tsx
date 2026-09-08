import * as React from 'react';

import type {SheetProps} from '../Sheet';
import {Sheet} from '../Sheet';

import {QASheet} from './constants';

export const TestSheet = (props: Partial<Omit<SheetProps, 'visible' | 'onOpenChange'>>) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <div>
            <button onClick={() => setVisible(true)}>Show modal</button>
            <Sheet {...props} visible={visible} onOpenChange={setVisible} qa={QASheet.content}>
                <div
                    style={{
                        minHeight: 100,
                        border: '1px solid tomato',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Sheet content
                </div>
            </Sheet>
        </div>
    );
};

export function FocusTestSheet({
    modal = true,
    sibling = false,
}: {
    modal?: boolean;
    sibling?: boolean;
}) {
    const [visible, setVisible] = React.useState(false);
    const [nestedVisible, setNestedVisible] = React.useState(false);

    const nestedSheet = (
        <Sheet visible={nestedVisible} title="Nested" onClose={() => setNestedVisible(false)}>
            <button>Nested action</button>
        </Sheet>
    );

    return (
        <React.Fragment>
            <button onClick={() => setVisible(true)}>Open sheet</button>
            <button>Background action</button>
            <Sheet visible={visible} title="Parent" modal={modal} onClose={() => setVisible(false)}>
                <button>First action</button>
                <button onClick={() => setNestedVisible(true)}>Open nested sheet</button>
                <button>Last action</button>
                {!sibling && nestedSheet}
            </Sheet>
            {sibling && nestedSheet}
        </React.Fragment>
    );
}
