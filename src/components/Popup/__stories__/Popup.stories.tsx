import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {TextInput} from '../../controls';
import {useVirtualElementRef} from '../../utils/useVirtualElementRef';
import {Popup} from '../Popup';
import type {PopupPlacement, PopupProps} from '../Popup';

export default {
    title: 'Components/Popup',
    component: Popup,
} as Meta;

export const Default: StoryFn<PopupProps> = (props: PopupProps) => {
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Popup {...props} open={open} anchorRef={anchorRef} onClose={() => setOpen(false)}>
                <div style={{padding: 10}}>Popup content</div>
            </Popup>
            <div
                style={{
                    width: '100%',
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button ref={anchorRef} onClick={() => setOpen(!open)}>
                    {open ? 'Hide' : 'Show'}
                </Button>
            </div>
        </React.Fragment>
    );
};

export const Placement: StoryFn<PopupProps> = (args) => {
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(true);
    const contentStyle = {padding: 10};
    const placements: PopupPlacement = [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-end',
        'bottom',
        'bottom-start',
        'left-end',
        'left',
        'left-start',
    ];

    return (
        <div
            ref={anchorRef}
            style={{
                width: 300,
                height: 200,
                border: '2px dashed black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Button onClick={() => setOpen(!open)}>Toggle open</Button>
            {placements.map((placement) => (
                <Popup
                    key={placement}
                    {...args}
                    open={open}
                    anchorRef={anchorRef}
                    placement={placement}
                >
                    <div style={contentStyle}>{placement}</div>
                </Popup>
            ))}
        </div>
    );
};
Placement.parameters = {
    layout: 'centered',
};

export const Position: StoryFn<PopupProps> = (args) => {
    const [left, setLeft] = React.useState(100);
    const [top, setTop] = React.useState(100);
    const anchorRef = useVirtualElementRef({rect: {top, left}});
    return (
        <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label style={{display: 'flex', alignItems: 'center'}}>
                x:
                <TextInput
                    value={String(left)}
                    onUpdate={(value) => {
                        setLeft(Number(value));
                        window.dispatchEvent(new CustomEvent('scroll'));
                    }}
                    type="number"
                    style={{width: 100}}
                />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label style={{display: 'flex', alignItems: 'center'}}>
                y:
                <TextInput
                    value={String(top)}
                    onUpdate={(value) => {
                        setTop(Number(value));
                        window.dispatchEvent(new CustomEvent('scroll'));
                    }}
                    type="number"
                    style={{width: 100}}
                />
            </label>
            <Popup {...args} open anchorRef={anchorRef}>
                <div style={{padding: 10}}>Popup content</div>
            </Popup>
        </div>
    );
};
