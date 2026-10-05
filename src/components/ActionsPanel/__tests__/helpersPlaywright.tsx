import * as React from 'react';

import {Menu, MenuItem} from '../../Menu';
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
                                children: [
                                    'More',
                                    <Menu key="submenu" size="s">
                                        <MenuItem onClick={() => setResult('run')}>Run</MenuItem>
                                    </Menu>,
                                ],
                            },
                        },
                    },
                ]}
            />
        </React.Fragment>
    );
};

export const TestActionsPanelMenuItemProps = () => {
    const [result, setResult] = React.useState('idle');
    return (
        <React.Fragment>
            <span data-qa="menu-action-result">{result}</span>
            <ActionsPanel
                actions={[
                    {
                        id: 'selected',
                        collapsed: true,
                        button: {props: {children: 'Selected'}},
                        dropdown: {item: {children: 'Selected', selected: true}},
                    },
                    {
                        id: 'run',
                        collapsed: true,
                        button: {props: {children: 'Run'}},
                        dropdown: {item: {children: 'Run', onClick: () => setResult('run')}},
                    },
                ]}
            />
        </React.Fragment>
    );
};
