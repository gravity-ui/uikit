import * as React from 'react';

import {ArrowUpArrowDown} from '@gravity-ui/icons';
import chroma from 'chroma-js';

import {Button, Card, ClipboardButton, Icon, TextInput} from '../../../components';
import {cn} from '../../../components/utils/cn';
import {useUniqId} from '../../../hooks';

import './PaletteGenerator.scss';

export interface BrandingConfiguratorProps {
    theme: string;
}

const b = cn('palette-generator');
const colorsMap = {
    50: {a: 0.1, c: -1},
    100: {a: 0.15, c: -1},
    150: {a: 0.2, c: -1},
    200: {a: 0.3, c: -1},
    250: {a: 0.4, c: -1},
    300: {a: 0.5, c: -1},
    350: {a: 0.6, c: -1},
    400: {a: 0.7, c: -1},
    450: {a: 0.8, c: -1},
    500: {a: 0.9, c: -1},
    550: {a: 1, c: 1},
    600: {a: 0.9, c: 1},
    650: {a: 0.8, c: 1},
    700: {a: 0.7, c: 1},
    750: {a: 0.6, c: 1},
    800: {a: 0.5, c: 1},
    850: {a: 0.4, c: 1},
    900: {a: 0.3, c: 1},
    950: {a: 0.2, c: 1},
    1000: {a: 0.15, c: 1},
};

const lowContrastBaseByTheme: Record<string, string> = {
    light: 'rgba(255, 255, 255, 1)',
    'light-hc': 'rgba(255, 255, 255, 1)',
    dark: 'rgba(45, 44, 51, 1)',
    'dark-hc': 'rgba(34, 35, 38, 1)',
};
const highContrastBaseByTheme: Record<string, string> = {
    light: lowContrastBaseByTheme['dark'],
    'light-hc': lowContrastBaseByTheme['dark-hc'],
    dark: lowContrastBaseByTheme['light'],
    'dark-hc': lowContrastBaseByTheme['light-hc'],
};

export function PaletteGenerator({theme}: BrandingConfiguratorProps) {
    const [name, setName] = React.useState('color');
    const colorTextRef = React.useRef<HTMLInputElement>(null);
    const [color, setColor] = React.useState(chroma.random().hex());
    const [lowContrastBase, setLowContrastBase] = React.useState(lowContrastBaseByTheme[theme]);
    const [highContrastBase, setHighContrastBase] = React.useState(highContrastBaseByTheme[theme]);
    const palette = React.useMemo(() => {
        return Object.entries(colorsMap).reduce(
            (res, [key, {a, c}]) => {
                const i = Number(key);
                const solidColor = chroma
                    .mix(color, c > 0 ? highContrastBase : lowContrastBase, 1 - a, 'rgb')
                    .css();
                const alphaColor = i > 500 ? '' : chroma(color).alpha(a).css();

                res[key] = [solidColor, alphaColor];

                return res;
            },
            {} as Record<string, [string, string]>,
        );
    }, [color, lowContrastBase, highContrastBase]);

    const resultText = React.useMemo(() => {
        return `
@mixin g-colors-private-${name}-${theme} {
    ${Object.keys(palette)
        .filter((key) => palette[key][1])
        .map((key) => `--g-color-private-${name}-${key}: ${palette[key][1]};`)
        .join('\n    ')}

    ${Object.keys(palette)
        .map((key) => `--g-color-private-${name}-${key}-solid: ${palette[key][0]};`)
        .join('\n    ')}
}
        `.trim();
    }, [name, palette, theme]);

    const handleSwapContrastClick = React.useCallback(() => {
        setLowContrastBase(highContrastBase);
        setHighContrastBase(lowContrastBase);
    }, [lowContrastBase, highContrastBase]);

    const handleColorTextUpdate = React.useCallback((value: string) => {
        if (chroma.valid(value)) {
            setColor(value);
        }
    }, []);

    React.useEffect(() => {
        setLowContrastBase(lowContrastBaseByTheme[theme]);
        setHighContrastBase(highContrastBaseByTheme[theme]);
    }, [theme]);

    React.useEffect(() => {
        if (colorTextRef.current) {
            colorTextRef.current.value = color;
        }
    }, [color]);

    const colorNameId = useUniqId();
    const mainColorValueId = useUniqId();
    const lowContrastColorValueId = useUniqId();
    const highContrastColorValueId = useUniqId();

    return (
        <div className={b()}>
            <div className={b('title')}>Parameters</div>
            <div className={b('parameters')}>
                <div className={b('parameters-name')} id={colorNameId}>
                    Name
                </div>
                <div className={b('parameters-control')}>
                    <TextInput
                        value={name}
                        onUpdate={setName}
                        controlProps={{'aria-labelledby': colorNameId}}
                    />
                </div>
                <div className={b('parameters-name')} id={mainColorValueId}>
                    Main Color
                </div>
                <div className={b('parameters-control')}>
                    <div className={b('color-picker-wrapper')}>
                        <label
                            className={b('color-picker')}
                            style={{backgroundColor: color}}
                            aria-labelledby={mainColorValueId}
                        >
                            <input
                                type="color"
                                className={b('color-picker-input')}
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </label>
                        <TextInput
                            controlRef={colorTextRef}
                            defaultValue={color}
                            onUpdate={handleColorTextUpdate}
                            controlProps={{
                                'aria-labelledby': mainColorValueId,
                            }}
                        />
                    </div>
                </div>
                <div className={b('parameters-name')} id={lowContrastColorValueId}>
                    Low Contrast Base
                </div>
                <div className={b('parameters-control')}>
                    <label
                        className={b('color-picker')}
                        style={{backgroundColor: lowContrastBase}}
                        aria-labelledby={lowContrastColorValueId}
                    >
                        <input
                            type="color"
                            className={b('color-picker-input')}
                            value={lowContrastBase}
                            onChange={(e) => setLowContrastBase(e.target.value)}
                        />
                    </label>
                </div>
                <div className={b('parameters-name')} />
                <div className={b('parameters-control')}>
                    <Button
                        view="outlined"
                        size="l"
                        onClick={handleSwapContrastClick}
                        aria-label="Switch colors"
                    >
                        <Icon data={ArrowUpArrowDown} size={18} />
                    </Button>
                </div>
                <div className={b('parameters-name')} id={highContrastColorValueId}>
                    High Contrast Base
                </div>
                <div className={b('parameters-control')}>
                    <label
                        className={b('color-picker')}
                        style={{backgroundColor: highContrastBase}}
                        aria-labelledby={highContrastColorValueId}
                    >
                        <input
                            type="color"
                            className={b('color-picker-input')}
                            value={highContrastBase}
                            onChange={(e) => setHighContrastBase(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className={b('title')}>Palette</div>
            <div className={b('palette')}>
                <div className={b('palette-grid')}>
                    {Object.entries(palette).map(([i, colors]) => {
                        return (
                            <React.Fragment key={i}>
                                <div className={b('palette-item-number')}>{i}</div>
                                <div
                                    className={b('palette-item-color')}
                                    style={{backgroundColor: lowContrastBase}}
                                >
                                    <div
                                        className={b('palette-item-color-inner')}
                                        style={{backgroundColor: colors[0]}}
                                    />
                                </div>
                                <div
                                    className={b('palette-item-color')}
                                    style={{backgroundColor: lowContrastBase}}
                                >
                                    <div
                                        className={b('palette-item-color-inner')}
                                        style={{backgroundColor: colors[1] || highContrastBase}}
                                    />
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <div className={b('title')}>Result Code</div>
            <div className={b('result')}>
                <Card view="filled" theme="normal" className={b('result-card')}>
                    <div className={b('result-text')}>{resultText}</div>
                    <ClipboardButton text={resultText} size="xs" className={b('result-copy')} />
                </Card>
            </div>
        </div>
    );
}
