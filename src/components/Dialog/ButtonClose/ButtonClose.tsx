import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {block} from '../../utils/cn';

import './ButtonClose.scss';

const b = block('dialog-btn-close');

export interface ButtonCloseProps {
    onClose: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        opts: {isOutsideClick: boolean},
    ) => void;
}

export function ButtonClose({onClose}: ButtonCloseProps) {
    return (
        <div className={b()}>
            <Button
                view="flat"
                size="l"
                className={b('btn')}
                onClick={(event) => onClose(event, {isOutsideClick: false})}
            >
                <Icon data={Xmark} size={20} />
            </Button>
        </div>
    );
}
