import React from 'react';

import {useDirection} from '@radix-ui/react-direction';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {CrossIcon} from '../../icons/CrossIcon';
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
    const dir = useDirection();
    return (
        <div className={b(dir === 'rtl' ? {rtl: true} : {ltr: true})}>
            <Button
                view="flat"
                size="l"
                className={b('btn')}
                onClick={(event) => onClose(event, {isOutsideClick: false})}
            >
                <Icon data={CrossIcon} size={12} />
            </Button>
        </div>
    );
}
