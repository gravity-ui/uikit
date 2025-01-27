import * as React from 'react';

import type {SheetProps} from '../Sheet';
import {Sheet} from '../Sheet';

import {QASheet} from './constants';

export const TestSheet = (props: Partial<Omit<SheetProps, 'visible' | 'onClose'>>) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <div>
            <button onClick={() => setVisible(true)}>Show modal</button>
            <Sheet
                {...props}
                visible={visible}
                onClose={() => setVisible(false)}
                qa={QASheet.content}
            >
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
