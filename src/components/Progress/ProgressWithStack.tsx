import {ProgressInnerText} from './ProgressInnerText';
import {ProgressStackItem} from './ProgressStackItem';
import {progressBlock} from './constants';
import type {ProgressWithStackProps} from './types';
import {getOffset, getValueFromStack} from './utils';

export function ProgressWithStack(props: ProgressWithStackProps) {
    const {stack, stackClassName, value, text} = props;
    const offset = getOffset(value || getValueFromStack(stack));

    return (
        <div
            className={progressBlock('stack', stackClassName)}
            style={{transform: `translateX(calc(var(--g-flow-direction) * ${offset}%))`}}
        >
            <div className={progressBlock('item')} style={{width: `${-offset}%`}} />
            {stack.map((item, index) => (
                <ProgressStackItem key={index} item={item} />
            ))}
            <ProgressInnerText offset={offset} text={text} />
        </div>
    );
}
