import React from 'react';

import {ChevronDown, ChevronUp} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import {block} from '../../../utils/cn';
import type {InputControlSize} from '../../types';
import i18n from '../i18n';
import {CONTROL_BUTTONS_QA, DECREMENT_BUTTON_QA, INCREMENT_BUTTON_QA} from '../utils';

import './NumericArrows.scss';

const b = block('numeric-arrows');

interface NumericArrowsProps extends React.HTMLAttributes<'div'> {
    className?: string;
    size: InputControlSize;
    disabled?: boolean;
    min?: number;
    max?: number;
    onUpClick: VoidFunction;
    onDownClick: VoidFunction;
}

export const NumericArrows = React.forwardRef<HTMLDivElement, NumericArrowsProps>(
    function NumericArrows({className, size, disabled, onUpClick, onDownClick, ...restProps}, ref) {
        const commonBtnProps: Partial<ButtonProps> = {
            size: 's',
            pin: 'brick-brick',
            view: 'flat-secondary',
            disabled,
            tabIndex: -1,
            width: 'max',
        };

        return (
            // It is used to focus the control input if non-interaction element is provided.
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <Flex
                direction="column"
                ref={ref}
                className={b({size}, className)}
                qa={CONTROL_BUTTONS_QA}
                {...restProps}
            >
                <Button
                    className={b('arrow-btn')}
                    qa={INCREMENT_BUTTON_QA}
                    {...commonBtnProps}
                    onClick={onUpClick}
                    extraProps={{'aria-label': i18n('label_increment')}}
                >
                    <Icon data={ChevronUp} size={12} />
                </Button>
                <span className={b('separator')} />
                <Button
                    className={b('arrow-btn')}
                    qa={DECREMENT_BUTTON_QA}
                    {...commonBtnProps}
                    onClick={onDownClick}
                    extraProps={{'aria-label': i18n('label_decrement')}}
                >
                    <Icon data={ChevronDown} size={12} />
                </Button>
            </Flex>
        );
    },
);
