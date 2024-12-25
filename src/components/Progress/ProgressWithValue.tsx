import {ProgressInnerText} from './ProgressInnerText';
import {progressBlock} from './constants';
import type {ProgressWithValueProps} from './types';
import {getOffset, getTheme} from './utils';

export function ProgressWithValue(props: ProgressWithValueProps) {
    const {value, loading, text} = props;
    const offset = getOffset(value);

    if (!Number.isFinite(value)) {
        return null;
    }

    return (
        <div
            className={progressBlock('item', {theme: getTheme(props), loading})}
            style={{transform: `translateX(calc(var(--g-flow-direction) * ${offset}%))`}}
        >
            <ProgressInnerText offset={offset} text={text} />
        </div>
    );
}
