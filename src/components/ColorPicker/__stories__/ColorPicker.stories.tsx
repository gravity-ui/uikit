import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {ColorPicker} from '../ColorPicker';
import type {ColorPickerProps} from '../types';
import {ColorPickerMode} from '../types';

export default {
    title: 'Lab/ColorPicker',
    component: ColorPicker,
    argTypes: {
        color: {
            control: 'text',
            description: 'The current color value',
        },
        withAlpha: {
            control: 'boolean',
            description: 'Whether to enable alpha channel',
        },
        mode: {
            control: 'select',
            options: Object.values(ColorPickerMode),
            description: 'The color format mode',
        },
        onChange: {
            action: 'changed',
            description: 'Callback function when color changes',
        },
    },
} as Meta<ColorPickerProps>;

const DefaultTemplate: StoryFn<ColorPickerProps> = (props) => {
    const [color, setColor] = React.useState(props.color || '#5282ff');

    return <ColorPicker {...props} color={color} onChange={setColor} />;
};

export const Default = DefaultTemplate.bind({});
Default.args = {
    color: '#5282ff',
    withAlpha: true,
    mode: ColorPickerMode.HEX,
};

export const WithoutAlpha = DefaultTemplate.bind({});
WithoutAlpha.args = {
    color: '#5282ff',
    withAlpha: false,
    mode: ColorPickerMode.HEX,
};

export const RGBMode = DefaultTemplate.bind({});
RGBMode.args = {
    color: '#ff5252',
    withAlpha: true,
    mode: ColorPickerMode.RGB,
};

export const AllModes: StoryFn<ColorPickerProps> = () => {
    const [hexColor, setHexColor] = React.useState('#5282ff');
    const [rgbColor, setRgbColor] = React.useState('#ff5252');
    const [hex2Color, setHex2Color] = React.useState('#30aa6e');

    return (
        <div style={{display: 'flex', gap: '20px', flexDirection: 'column'}}>
            <div>
                <h3>HEX Mode</h3>
                <ColorPicker
                    color={hexColor}
                    onChange={setHexColor}
                    mode={ColorPickerMode.HEX}
                    withAlpha={true}
                />
            </div>
            <div>
                <h3>RGB Mode</h3>
                <ColorPicker
                    color={rgbColor}
                    onChange={setRgbColor}
                    mode={ColorPickerMode.RGB}
                    withAlpha={true}
                />
            </div>
            <div>
                <h3>Compact mode</h3>
                <ColorPicker
                    color={hex2Color}
                    onChange={setHex2Color}
                    mode={ColorPickerMode.HEX}
                    withAlpha={true}
                    withValue={false}
                />
            </div>
        </div>
    );
};
