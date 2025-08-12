import * as React from 'react';

import type {HsvaColor, RgbaColor} from '@uiw/react-color';
import {
    Alpha,
    EditableInput,
    EditableInputRGBA,
    Hue,
    Saturation,
    hexToHsva,
    hsvaToHex,
    hsvaToHexa,
    hsvaToRgbString,
    hsvaToRgba,
    hsvaToRgbaString,
    rgbStringToHsva,
    rgbaStringToHsva,
} from '@uiw/react-color';

import {Button} from '../Button';
import {Card} from '../Card';
import {Popup} from '../Popup';
import {Select} from '../Select';
import {Text} from '../Text';
import {TextInput} from '../controls';
import {Flex} from '../layout';
import {block} from '../utils/cn';

import './ColorPicker.scss';
enum Modes {
    Hex = 'HEX',
    Rgb = 'RGB',
}

const b = block('color-picker');

const convertHsvaColorToHex = (hsva: HsvaColor, alpha: boolean): string => {
    return alpha ? hsvaToHexa(hsva) : hsvaToHex(hsva);
};

const convertSelectedModeColorToHsva = (value: string, mode: Modes, alpha: boolean) => {
    switch (mode) {
        case Modes.Hex: {
            return hexToHsva(value);
        }
        case Modes.Rgb: {
            return alpha ? rgbaStringToHsva(value) : rgbStringToHsva(value);
        }
    }
};

function formatRgbaString(hsvaResult: RgbaColor) {
    const {r, g, b, a} = hsvaResult;

    const roundedA = Math.round(a * 100) / 100;

    return `rgba(${r},${g},${b},${roundedA})`;
}

const getTextValueByMode = (hsva: HsvaColor, mode: Modes, alpha: boolean) => {
    switch (mode) {
        case Modes.Rgb: {
            return alpha ? formatRgbaString(hsvaToRgba(hsva)) : hsvaToRgbString(hsva);
        }
        case Modes.Hex: {
            return alpha ? hsvaToHexa(hsva) : hsvaToHex(hsva);
        }
    }
};
export const ColorPicker = ({
    withAlpha = true,
    mode = Modes.Hex,
}: {
    withAlpha: boolean;
    mode: Modes;
}) => {
    const [open, setOpen] = React.useState(false);
    const [hsva, setHsva] = React.useState<HsvaColor>({h: 0, s: 0, v: 68, a: 1});
    const [modeState, setModeState] = React.useState(mode);
    const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);
    const [inputValue, setInputValue] = React.useState<string>(
        convertHsvaColorToHex(hsva, withAlpha),
    );

    React.useEffect(() => {
        setInputValue(convertHsvaColorToHex(hsva, withAlpha));
    }, [hsva, modeState]);

    const applyInputValue = React.useCallback(() => {
        setHsva(convertSelectedModeColorToHsva(inputValue, modeState, withAlpha));
    }, [modeState, inputValue, withAlpha]);

    return (
        <React.Fragment>
            <Card view={'outlined'} ref={setAnchor} className={b('picker-wrapper')}>
                <Flex alignItems={'center'} gap={2}>
                    <Button
                        size={'s'}
                        className={b('underlay')}
                        style={{width: 20, height: 20}}
                        onClick={() => setOpen(true)}
                    >
                        <div
                            className={b('overlay')}
                            style={{
                                backgroundColor: hsvaToRgbaString(hsva),
                            }}
                        ></div>
                    </Button>

                    <div>{getTextValueByMode(hsva, Modes.Hex, false)}</div>
                </Flex>
            </Card>
            <Popup
                open={open}
                className={b('popup')}
                placement={'bottom-end'}
                anchorElement={anchor}
                onOpenChange={setOpen}
            >
                <Flex direction={'column'} gap={2}>
                    <Saturation
                        hsva={hsva}
                        onChange={(newColor) => {
                            setHsva({...hsva, ...newColor, a: hsva.a});
                        }}
                        className={b('saturation')}
                    />
                    <Hue
                        className={b('slider')}
                        hue={hsva.h}
                        onChange={(newHue) => {
                            setHsva({...hsva, ...newHue});
                        }}
                        pointerProps={{className: b('pointer')}}
                    />
                    {withAlpha && (
                        <Alpha
                            hsva={hsva}
                            onChange={(newAlpha) => {
                                setHsva({...hsva, ...newAlpha});
                            }}
                            className={b('slider')}
                            pointerProps={{className: b('pointer')}}
                        />
                    )}

                    <Flex gap={2}>
                        <Select
                            options={Object.values(Modes).map((val) => ({
                                content: val,
                                value: val,
                            }))}
                            multiple={false}
                            value={[modeState]}
                            onUpdate={(val) => {
                                setModeState(val[0] as Modes);
                            }}
                        />
                        {modeState === Modes.Hex && (
                            <Flex>
                                <EditableInput
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onBlur={applyInputValue}
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
                                            const percentValue =
                                                Number(value) > 100
                                                    ? 100
                                                    : Number(value) < 0
                                                      ? 0
                                                      : Number(value);

                                            const alphaValue = percentValue / 100;

                                            setHsva({...hsva, a: alphaValue});
                                        }}
                                        onBlur={(evn) => {
                                            const v = Number(evn.target.value);

                                            if (v > 100) {
                                                evn.target.value = '100';
                                            } else if (v < 0) {
                                                evn.target.value = '0';
                                            }
                                        }}
                                        label={undefined}
                                        renderInput={(props) => {
                                            return (
                                                <TextInput
                                                    onChange={props.onChange}
                                                    value={String(props.value)}
                                                    onBlur={props.onBlur}
                                                    pin="clear-round"
                                                    startContent={
                                                        <Text
                                                            className={b('text')}
                                                            color={'secondary'}
                                                            variant={'caption-1'}
                                                        >
                                                            A
                                                        </Text>
                                                    }
                                                />
                                            );
                                        }}
                                    />
                                )}
                            </Flex>
                        )}
                        {modeState === Modes.Rgb && (
                            <EditableInputRGBA
                                hsva={hsva}
                                aProps={
                                    withAlpha
                                        ? {
                                              renderInput: (props) => (
                                                  <TextInput
                                                      value={String(props.value)}
                                                      className={b('input')}
                                                      onChange={props.onChange}
                                                      startContent={
                                                          <Text
                                                              className={b('text')}
                                                              color={'secondary'}
                                                              variant={'caption-1'}
                                                          >
                                                              A
                                                          </Text>
                                                      }
                                                      pin={'clear-round'}
                                                  />
                                              ),
                                              label: undefined,
                                          }
                                        : false
                                }
                                rProps={{
                                    renderInput: (props) => (
                                        <TextInput
                                            value={String(props.value)}
                                            onChange={props.onChange}
                                            className={b('input')}
                                            startContent={
                                                <Text
                                                    className={b('text')}
                                                    color={'secondary'}
                                                    variant={'caption-1'}
                                                >
                                                    R
                                                </Text>
                                            }
                                            pin={'round-brick'}
                                        />
                                    ),
                                    label: undefined,
                                }}
                                gProps={{
                                    renderInput: (props) => (
                                        <TextInput
                                            value={String(props.value)}
                                            onChange={props.onChange}
                                            className={b('input')}
                                            startContent={
                                                <Text
                                                    className={b('text')}
                                                    color={'secondary'}
                                                    variant={'caption-1'}
                                                >
                                                    G
                                                </Text>
                                            }
                                            pin={'clear-clear'}
                                        />
                                    ),
                                    label: undefined,
                                }}
                                bProps={{
                                    renderInput: (props) => (
                                        <TextInput
                                            value={String(props.value)}
                                            onChange={props.onChange}
                                            className={b('input')}
                                            startContent={
                                                <Text
                                                    className={b('text')}
                                                    color={'secondary'}
                                                    variant={'caption-1'}
                                                >
                                                    B
                                                </Text>
                                            }
                                            pin={withAlpha ? 'brick-brick' : 'brick-round'}
                                        />
                                    ),
                                    label: undefined,
                                }}
                                onChange={(color) => {
                                    setHsva({...hsva, ...color.hsva});
                                }}
                            />
                        )}
                    </Flex>
                </Flex>
            </Popup>
        </React.Fragment>
    );
};
