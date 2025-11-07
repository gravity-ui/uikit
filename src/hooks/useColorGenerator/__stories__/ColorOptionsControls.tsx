import * as React from 'react';

import {Button} from '../../../components/Button';
import {Card} from '../../../components/Card';
import {Select} from '../../../components/Select';
import {Slider} from '../../../components/Slider';
import {Text} from '../../../components/Text';
import {block} from '../../../components/utils/cn';
import type {ThemeColorSettings} from '../types';

const b = block('color-generator-stories');

interface ColorOptionsControlsProps {
    colorOptions: ThemeColorSettings;
    theme: 'light' | 'dark';
    onColorOptionsChange: (options: ThemeColorSettings) => void;
    onThemeChange: (theme: 'light' | 'dark') => void;
    onResetToDefaults: () => void;
}

interface RangeSliderProps {
    label: string;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    min?: number;
    max?: number;
    step?: number;
}

const RangeSlider = ({label, value, onChange, min = 0, max = 100, step = 1}: RangeSliderProps) => {
    return (
        <div className={b('range-slider-group')}>
            <Text variant="body-2" className={b('control-label')}>
                {label}: {value[0]} - {value[1]}
            </Text>
            <Slider
                value={value}
                onUpdate={onChange}
                min={min}
                max={max}
                step={step}
                size="m"
                tooltipDisplay="on"
                tooltipFormat={(val) => `${val}`}
                className={b('range-slider')}
            />
        </div>
    );
};

export const ColorOptionsControls = ({
    colorOptions,
    theme,
    onColorOptionsChange,
    onThemeChange,
    onResetToDefaults,
}: ColorOptionsControlsProps) => {
    const updateIntensity = React.useCallback(
        (
            intensity: keyof ThemeColorSettings,
            property: 'lightness' | 'saturation',
            value: [number, number],
        ) => {
            onColorOptionsChange({
                ...colorOptions,
                [intensity]: {
                    ...colorOptions[intensity],
                    [property]: value,
                },
            });
        },
        [colorOptions, onColorOptionsChange],
    );

    const themeOptions = [
        {value: 'light', content: 'Light Theme'},
        {value: 'dark', content: 'Dark Theme'},
    ];

    return (
        <Card>
            <div className={b('color-options-header')}>
                <Text variant="header-2">Color Options</Text>
                <div className={b('color-options-controls')}>
                    <Select
                        value={[theme]}
                        onUpdate={(value) => onThemeChange(value[0] as 'light' | 'dark')}
                        options={themeOptions}
                        size="s"
                        width="max"
                    />
                    <Button onClick={onResetToDefaults} size="s" view="outlined">
                        Reset to Defaults
                    </Button>
                </div>
            </div>

            <div className={b('color-options-grid')}>
                {(['light', 'medium', 'heavy'] as const).map((intensity) => (
                    <div key={intensity} className={b('intensity-group')}>
                        <Text variant="body-1" className={b('intensity-title')}>
                            {intensity.charAt(0).toUpperCase() + intensity.slice(1)} Intensity
                        </Text>

                        <RangeSlider
                            label="Lightness"
                            value={colorOptions[intensity].lightness}
                            onChange={(value) => updateIntensity(intensity, 'lightness', value)}
                            min={0}
                            max={100}
                            step={1}
                        />

                        <RangeSlider
                            label="Saturation"
                            value={colorOptions[intensity].saturation}
                            onChange={(value) => updateIntensity(intensity, 'saturation', value)}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </div>
                ))}
            </div>
        </Card>
    );
};
