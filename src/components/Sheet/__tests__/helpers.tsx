import * as React from 'react';

import type {SheetProps} from '../Sheet';
import {Sheet} from '../Sheet';

import {QASheet} from './constants';

export const TestSheet = (props: Partial<Omit<SheetProps, 'open' | 'onOpenChange'>>) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <button onClick={() => setOpen(true)}>Show modal</button>
            <Sheet {...props} open={open} onOpenChange={setOpen} qa={QASheet.content}>
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
