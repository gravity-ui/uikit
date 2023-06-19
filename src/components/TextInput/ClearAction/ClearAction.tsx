import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {block} from '../../utils/cn';
import i18n from '../i18n';
import type {TextInputSize} from '../types';

const b = block('text-input');
const ICON_SIZE = 16;

type ClearActionProps = {
    size: TextInputSize;
    className?: string;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
};

export const ClearAction = (props: ClearActionProps) => {
    const {size, className, onClick} = props;

    // remove using of Button component after https://github.com/gravity-ui/uikit/issues/645
    return (
        <Button
            size={size}
            className={b('clear', className)}
            onClick={onClick}
            extraProps={{'aria-label': i18n('label_clear-button')}}
        >
            <Icon data={Xmark} size={ICON_SIZE} />
        </Button>
    );
};
