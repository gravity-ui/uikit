import type * as React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {block} from '../../utils/cn';
import i18n from '../i18n';

import './ButtonClose.scss';

const b = block('dialog-btn-close');

export interface ButtonCloseProps {
    onClose: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        opts: {isOutsideClick: boolean},
    ) => void;
}

export function ButtonClose({onClose}: ButtonCloseProps) {
    const {t} = i18n.useTranslation();
    return (
        <div className={b()}>
            <Button
                view="flat"
                size="l"
                className={b('btn')}
                onClick={(event) => onClose(event, {isOutsideClick: false})}
                aria-label={t('close')}
            >
                <Icon data={Xmark} size={20} />
            </Button>
        </div>
    );
}
