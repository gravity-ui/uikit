import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {ColorPicker} from '../ColorPicker';

const meta: Meta<typeof ColorPicker> = {
    title: 'Lab/ColorPicker',
    component: ColorPicker,
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
    render: function ColorPickerStory(props) {
        const [value, setValue] = React.useState('#eeeeee');
        return (
            <div style={{padding: 20}}>
                <ColorPicker {...props} value={value} defaultValue="#ffbe5c" onUpdate={setValue} />
            </div>
        );
    },
};

export const Sizes: Story = {
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
};
