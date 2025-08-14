import * as React from 'react';

import {EditableInputRGBA} from '@uiw/react-color';
import type {HsvaColor} from '@uiw/react-color';

import {Text} from '../../../Text';
import {TextInput} from '../../../controls';
import type {InputControlPin} from '../../../controls';
import {b} from '../../constants';

type RgbInputsProps = {
    hsva: HsvaColor;
    withAlpha: boolean;
    onChange: (color: any) => void;
};

type ChannelConfig = {
    label: string;
    pin: InputControlPin;
};

const createChannelInput = ({label, pin}: ChannelConfig) => ({
    renderInput: (props: any) => (
        <TextInput
            value={String(props.value)}
            onChange={props.onChange}
            className={b('input')}
            startContent={
                <Text className={b('text')} color="secondary" variant="caption-1">
                    {label}
                </Text>
            }
            pin={pin}
        />
    ),
    label: undefined,
});

export const RgbInputs = ({hsva, withAlpha, onChange}: RgbInputsProps) => {
    const channelProps = React.useMemo(
        () => ({
            rProps: createChannelInput({label: 'R', pin: 'round-brick'}),
            gProps: createChannelInput({label: 'G', pin: 'clear-clear'}),
            bProps: createChannelInput({
                label: 'B',
                pin: withAlpha ? 'brick-brick' : 'brick-round',
            }),
            aProps: withAlpha
                ? createChannelInput({label: 'A', pin: 'clear-round'})
                : (false as const),
        }),
        [withAlpha],
    );

    return <EditableInputRGBA hsva={hsva} {...channelProps} onChange={onChange} />;
};
