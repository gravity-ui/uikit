import * as React from 'react';

import {useDefaultProps} from '../theme/useDefaultProps';

import {ProgressWithStack} from './ProgressWithStack';
import {ProgressWithValue} from './ProgressWithValue';
import {progressBlock} from './constants';
import type {ProgressProps} from './types';
import {isProgressWithStack} from './types';

import './Progress.scss';

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    function Progress(rawProps, ref) {
        const props = useDefaultProps('Progress', rawProps);
        const {text = '', theme = 'default', size = 'm', loading = false, className, qa} = props;
        const resolvedProps: ProgressProps = {...props, text, theme, size, loading};

        return (
            <div ref={ref} className={progressBlock({size}, className)} data-qa={qa}>
                <div className={progressBlock('text')}>{text}</div>
                {isProgressWithStack(resolvedProps) ? (
                    <ProgressWithStack {...resolvedProps} />
                ) : (
                    <ProgressWithValue {...resolvedProps} />
                )}
            </div>
        );
    },
);
