import React from 'react';

import {Button} from '../../Button';
import {Popover} from '../Popover';
import type {PopoverProps} from '../types';

import {PopoverQA} from './constants';

const wrapProps = {
    width: '300px',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
} as const;

export const TestPopover = (props: PopoverProps) => {
    return (
        <div style={wrapProps}>
            <Popover {...props} qa={PopoverQA.popoverContent}>
                <Button qa={PopoverQA.trigger}>Trigger</Button>
            </Popover>
        </div>
    );
};

export const TestPopoverWithLinks = (props: PopoverProps) => {
    return (
        <div style={wrapProps}>
            <Popover
                {...props}
                links={[
                    {
                        title: 'link 1',
                        href: '#',
                        onClick: () => {},
                    },
                    {
                        title: 'link 2',
                        href: '#',
                        onClick: () => {},
                    },
                ]}
                qa={PopoverQA.popoverContent}
            >
                <Button qa={PopoverQA.trigger}>Trigger</Button>
            </Popover>
        </div>
    );
};

export const TestPopoverWithButtons = (props: PopoverProps) => {
    return (
        <div
            style={{
                ...wrapProps,
                width: '500px',
                height: '500px',
            }}
        >
            d{' '}
            <Popover
                {...props}
                tooltipActionButton={{
                    text: 'Action button',
                    onClick: () => {},
                }}
                tooltipCancelButton={{
                    text: 'Cancel button',
                    onClick: () => {},
                }}
                qa={PopoverQA.popoverContent}
            >
                <Button qa={PopoverQA.trigger}>Trigger</Button>
            </Popover>
        </div>
    );
};
