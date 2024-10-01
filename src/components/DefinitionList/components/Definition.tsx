import React from 'react';

import {ClipboardButton} from '../../ClipboardButton';
import type {DefinitionListItem} from '../types';
import {b} from '../utils';

interface DefinitionProps extends Pick<DefinitionListItem, 'copyText' | 'content'> {}

export function Definition({copyText, content}: DefinitionProps) {
    const definitionContent = content ?? '—';

    return copyText ? (
        <div className={b('copy-container')}>
            <span>{definitionContent}</span>
            <ClipboardButton
                size="s"
                text={copyText}
                className={b('copy-button')}
                view={'flat-secondary'}
            />
        </div>
    ) : (
        definitionContent
    );
}
