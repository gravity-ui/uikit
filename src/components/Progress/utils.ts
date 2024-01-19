import type {ProgressTheme, ProgressWithValueProps, Stack} from './types';

export function getOffset(value: number): number {
    return value < 100 ? value - 100 : 0;
}

export function getValueFromStack(stack: Stack[]): number {
    return stack.reduce((sum, {value}) => sum + value, 0);
}

export function getTheme(props: ProgressWithValueProps): ProgressTheme {
    const {theme, colorStops, colorStopsValue, value} = props;

    if (colorStops) {
        const matchingColorStopItem = colorStops.find((item, index) => {
            const currentValue = typeof colorStopsValue === 'number' ? colorStopsValue : value;
            const minValue = index > 1 ? colorStops[index - 1].stop : 0;
            const maxValue = index < colorStops.length - 1 ? item.stop : 100;

            return currentValue >= minValue && currentValue <= maxValue;
        });

        return matchingColorStopItem ? matchingColorStopItem.theme : (theme as ProgressTheme);
    }

    return theme as ProgressTheme;
}
