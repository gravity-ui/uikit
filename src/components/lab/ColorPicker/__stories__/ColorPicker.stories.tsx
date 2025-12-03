import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {ColorPicker} from '../ColorPicker';

const meta: Meta<typeof ColorPicker> = {
    title: 'Lab/ColorPicker',
    component: ColorPicker,
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

const parameters = {
    a11y: {
        context: '#storybook-root',
        config: {
            rules: [
                {
                    id: 'color-contrast',
                    enabled: false,
                },
            ],
        },
    },
};
export const Default = {
    args: {
        value: '#000000',
        onUpdate: (color) => console.log('Color changed:', color),
    },
    parameters,
} satisfies Story;

export const Compact = {
    args: {
        value: '#000000',
        onUpdate: (color) => console.log('Color changed:', color),
        compact: true,
    },
    parameters,
} satisfies Story;

export const WithAlpha = {
    args: {
        value: '#000000FF',
        onUpdate: (color) => console.log('Color changed:', color),
        withAlpha: true,
    },
    parameters,
} satisfies Story;

export const Sizes = {
    render: function ColorPickerStory(props) {
        return (
            <React.Fragment>
                <div style={{padding: 20}}>
                    <ColorPicker
                        {...props}
                        size={'s'}
                        defaultValue="#ffbe5c"
                        onUpdate={(color) => console.log('Color changed:', color)}
                    />
                </div>
                <div style={{padding: 20}}>
                    <ColorPicker
                        {...props}
                        size={'m'}
                        defaultValue="#ffbe5c"
                        onUpdate={(color) => console.log('Color changed:', color)}
                    />
                </div>
                <div style={{padding: 20}}>
                    <ColorPicker
                        {...props}
                        size={'l'}
                        defaultValue="#ffbe5c"
                        onUpdate={(color) => console.log('Color changed:', color)}
                    />
                </div>
                <div style={{padding: 20}}>
                    <ColorPicker
                        {...props}
                        size={'xl'}
                        defaultValue="#ffbe5c"
                        onUpdate={(color) => console.log('Color changed:', color)}
                    />
                </div>
            </React.Fragment>
        );
    },
} satisfies Story;
