import React from 'react';
import {block} from '../../utils/cn';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {CrossIcon} from '../../icons/CrossIcon';
import './ButtonClose.scss';

const b = block('dialog-btn-close');

export interface ButtonCloseProps {
    handleClose: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        opts: {isOutsideClick: boolean},
    ) => void;
}

export function ButtonClose({handleClose}: ButtonCloseProps) {
    return (
        <div className={b()}>
            <Button
                view="flat"
                size="l"
                className={b('btn')}
                onClick={(event) => handleClose(event, {isOutsideClick: false})}
            >
                <Icon data={CrossIcon} size={12} />
            </Button>
        </div>
    );
}
