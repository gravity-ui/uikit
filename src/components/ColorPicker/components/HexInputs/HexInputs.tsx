import {EditableInput} from '@uiw/react-color';
import type {HsvaColor} from '@uiw/react-color';

import {Text} from '../../../Text';
import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {b} from '../../constants';

type HexInputsProps = {
    inputValue: string;
    hsva: HsvaColor;
    withAlpha: boolean;
    onInputChange: (value: string) => void;
    onInputBlur: () => void;
    onAlphaChange: (alpha: number) => void;
};

export const HexInputs = ({
    inputValue,
    hsva,
    withAlpha,
    onInputChange,
    onInputBlur,
    onAlphaChange,
}: HexInputsProps) => (
    <Flex>
        <EditableInput
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onBlur={onInputBlur}
            className={b('hex-input', {withAlpha})}
            renderInput={(props) => (
                <TextInput
                    value={String(props.value)}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    pin={withAlpha ? 'round-brick' : 'round-round'}
                />
            )}
        />
        {withAlpha && (
            <EditableInput
                className={b('input')}
                value={Math.round(hsva.a * 100)}
                style={{marginTop: 0}}
                onChange={(_, value) => {
                    const clampedValue = Math.max(0, Math.min(100, Number(value)));
                    onAlphaChange(clampedValue / 100);
                }}
                onBlur={(evn) => {
                    const v = Number(evn.target.value);
                    evn.target.value = String(Math.max(0, Math.min(100, v)));
                }}
                label={undefined}
                renderInput={(props) => (
                    <TextInput
                        onChange={props.onChange}
                        value={String(props.value)}
                        onBlur={props.onBlur}
                        pin="clear-round"
                        startContent={
                            <Text className={b('text')} color={'secondary'} variant={'caption-1'}>
                                A
                            </Text>
                        }
                    />
                )}
            />
        )}
    </Flex>
);
