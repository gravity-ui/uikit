import * as React from 'react';

import {ActionsPanel} from '../ActionsPanel';
import type {ActionsPanelProps} from '../types';

export const TestActionsPanelWithNote = (props: ActionsPanelProps) => {
    return <ActionsPanel renderNote={() => 'note'} {...props} />;
};

export const TestActionsPanelNestedAction = () => {
    const [result, setResult] = React.useState('idle');
    return (
        <React.Fragment>
            <span data-qa="menu-action-result">{result}</span>
            <ActionsPanel
                actions={[
                    {
                        id: 'submenu',
                        collapsed: true,
                        button: {props: {children: 'More'}},
                        dropdown: {
                            item: {
                                text: 'More',
                                items: [{text: 'Run', action: () => setResult('run')}],
                            },
                        },
                    },
                ]}
            />
        </React.Fragment>
    );
};
