import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button, ButtonSize} from '../../../Button';
import {Icon} from '../../../Icon';
import {blockNew} from '../../../utils/cn';
import type {TextInputSize} from '../../types';

import i18n from './i18n';

import './ClearButton.scss';

const b = blockNew('clear-button');
const ICON_SIZE = 16;

type Props = {
    size: ButtonSize;
    className?: string;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
};

export const mapTextInputSizeToButtonSize = (textInputSize: TextInputSize): ButtonSize => {
    switch (textInputSize) {
        case 's': {
            return 'xs';
        }
        case 'm': {
            return 's';
        }
        case 'l': {
            return 'm';
        }
        case 'xl': {
            return 'l';
        }
        default: {
            throw new Error(`Unknown text input size "${textInputSize}"`);
        }
    }
};

export const ClearButton = (props: Props) => {
    const {size, className, onClick} = props;

    // remove using of Button component after https://github.com/gravity-ui/uikit/issues/645
    return (
        <Button
            size={size}
            className={b(null, className)}
            onClick={onClick}
            extraProps={{'aria-label': i18n('label_clear-button')}}
        >
            <Icon data={Xmark} size={ICON_SIZE} />
        </Button>
    );
};
