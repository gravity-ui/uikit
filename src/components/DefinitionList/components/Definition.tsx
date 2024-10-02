import React from 'react';

import {ClipboardButton} from '../../ClipboardButton';
import type {DefinitionListItem} from '../types';
import {b} from '../utils';

interface DefinitionProps extends Pick<DefinitionListItem, 'copyText' | 'children'> {}

export function Definition({copyText, children}: DefinitionProps) {
    const definitionContent = children ?? '—';

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
