import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {useVirtualElement} from '../../../hooks';
import {Button} from '../../Button';
import {Text} from '../../Text';
import {Popup} from '../Popup';
import type {PopupPlacement} from '../types';

const meta: Meta<typeof Popup> = {
    title: 'Components/Overlays/Popup',
    component: Popup,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-hidden-focus',
                        enabled: false,
                        selector: '[data-floating-ui-focus-guard]',
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Popup>;

export const Default: Story = {
    render: function PopupStory(props) {
        const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <Popup
                    {...props}
                    open={open}
                    anchorElement={anchor}
                    onOpenChange={(isOpen) => setOpen(isOpen)}
                >
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
                    <Button ref={setAnchor} onClick={() => setOpen(!open)}>
                        {open ? 'Hide' : 'Show'}
                    </Button>
                </div>
            </React.Fragment>
        );
    },
};

export const Placement: Story = {
    render: function PopupStory(props) {
        const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);
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
                ref={setAnchor}
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
                        {...props}
                        open={open}
                        anchorElement={anchor}
                        placement={placement}
                    >
                        <div style={contentStyle}>{placement}</div>
                    </Popup>
                ))}
            </div>
        );
    },
    parameters: {
        layout: 'centered',
    },
};

export const Position: Story = {
    render: function PopupStory(props) {
        const [left, setLeft] = React.useState(0);
        const [top, setTop] = React.useState(0);
        const {anchor, setContextElement} = useVirtualElement({left, top});

        const [open, setOpen] = React.useState(false);

        const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
            setLeft(event.clientX);
            setTop(event.clientY);
        };

        React.useEffect(() => {
            window.dispatchEvent(new CustomEvent('scroll'));
        }, [left, top]);

        return (
            <div>
                <div
                    style={{
                        width: 400,
                        height: 400,
                        position: 'relative',
                        overflow: 'hidden',
                        border: '2px dashed black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => {
                        setOpen(true);
                    }}
                    onMouseLeave={() => {
                        setOpen(false);
                    }}
                >
                    <div ref={setContextElement} />
                    <Text color="complementary">Move cursor here</Text>
                    <Popup {...props} open={open} anchorRef={{current: anchor}}>
                        <div style={{padding: 10}}>Popup content</div>
                    </Popup>
                </div>
            </div>
        );
    },
    args: {
        disablePortal: true,
    },
    parameters: {
        layout: 'centered',
    },
};
