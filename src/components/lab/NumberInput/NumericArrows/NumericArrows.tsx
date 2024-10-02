import React from 'react';

import {ChevronDown, ChevronUp} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {Icon} from '../../../Icon';
import type {InputControlSize} from '../../../controls/types';
import {Flex} from '../../../layout';
import {block} from '../../../utils/cn';
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
    onUpClick: React.MouseEventHandler<HTMLButtonElement>;
    onDownClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function NumericArrows({
    className,
    size,
    disabled,
    onUpClick,
    onDownClick,
    ...restProps
}: NumericArrowsProps) {
    const commonBtnProps: Partial<ButtonProps> = {
        size: 's',
        pin: 'brick-brick',
        view: 'flat-secondary',
        disabled,
        tabIndex: -1,
        width: 'max',
    };

    return (
        <Flex
            direction="column"
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
}
