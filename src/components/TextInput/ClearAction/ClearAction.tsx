import React from 'react';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {CrossIcon} from '../../icons/CrossIcon';
import {block} from '../../utils/cn';
import type {TextInputSize} from '../types';
import i18n from '../i18n';

const b = block('text-input');
const ICON_SIZE = 10;

type ClearActionProps = {
    size: TextInputSize;
    className?: string;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
};

export const ClearAction = (props: ClearActionProps) => {
    const {size, className, onClick} = props;

    return (
        <Button
            size={size}
            className={b('clear', className)}
            onClick={onClick}
            extraProps={{'aria-label': i18n('label_clear-button')}}
        >
            <Icon data={CrossIcon} size={ICON_SIZE} />
        </Button>
    );
};
