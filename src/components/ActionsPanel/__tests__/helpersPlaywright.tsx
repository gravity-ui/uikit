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

export const TestActionsPanelMenuCompatibility = () => {
    const [result, setResult] = React.useState('idle');
    return (
        <React.Fragment>
            <span data-qa="menu-action-result">{result}</span>
            <ActionsPanel
                actions={[
                    {
                        id: 'empty',
                        collapsed: true,
                        button: {props: {children: 'Empty'}},
                        dropdown: {
                            item: {text: 'Empty', items: [], action: () => setResult('empty')},
                        },
                    },
                    {
                        id: 'hidden',
                        collapsed: true,
                        button: {props: {children: 'Hidden'}},
                        dropdown: {
                            item: {
                                text: 'Hidden',
                                items: [{text: 'Invisible', hidden: true, action: () => {}}],
                                action: () => setResult('hidden'),
                            },
                        },
                    },
                    {
                        id: 'parent',
                        collapsed: true,
                        button: {props: {children: 'Parent'}},
                        dropdown: {
                            item: {
                                text: 'Parent',
                                iconEnd: <span data-qa="custom-arrow" />,
                                action: () => setResult('parent'),
                                items: [{text: 'Run', action: () => setResult('run')}],
                            },
                        },
                    },
                    {
                        id: 'active',
                        collapsed: true,
                        button: {props: {children: 'Active'}},
                        dropdown: {
                            item: {text: 'Active', active: true, action: () => {}},
                        },
                    },
                ]}
            />
        </React.Fragment>
    );
};
