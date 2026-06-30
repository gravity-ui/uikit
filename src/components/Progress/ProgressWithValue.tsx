import type {CnMods} from '../utils/cn';

import {ProgressInnerText} from './ProgressInnerText';
import {progressBlock} from './constants';
import type {ProgressWithValueProps} from './types';
import {getOffset, getTheme} from './utils';

export function ProgressWithValue(props: ProgressWithValueProps) {
    const {value, loading, text} = props;
    const offset = getOffset(value);
    const {theme, color} = getTheme(props);

    const modifiers: CnMods = {
        loading,
    };

    if (typeof color === 'undefined') {
        modifiers.theme = theme || 'default';
    }

    if (Number.isFinite(value)) {
        return (
            <div
                className={progressBlock('item', modifiers)}
                style={{
                    transform: `translateX(calc(var(--g-flow-direction) * ${offset}%))`,
                    backgroundColor: color,
                }}
            >
                <ProgressInnerText offset={offset} text={text} />
            </div>
        );
    }

    return null;
}
