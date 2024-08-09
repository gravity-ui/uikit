import React from 'react';

import {ClipboardButton} from '../../ClipboardButton';
import type {DefinitionListProps, DefinitionListSingleItem} from '../types';
import {b} from '../utils';

interface DefinitionProps
    extends Pick<DefinitionListSingleItem, 'copyText' | 'content'>,
        Pick<DefinitionListProps, 'copyPosition'> {}

export function Definition({copyText, content, copyPosition}: DefinitionProps) {
    const iconInside = copyPosition === 'inside';
    const definitionContent = content ?? '—';

    return copyText ? (
        <div className={b('copy-container', {'icon-inside': iconInside})}>
            <span>{definitionContent}</span>
            <ClipboardButton
                size="s"
                text={copyText}
                className={b('copy-button')}
                view={iconInside ? 'raised' : 'flat-secondary'}
            />
        </div>
    ) : (
        definitionContent
    );
}
