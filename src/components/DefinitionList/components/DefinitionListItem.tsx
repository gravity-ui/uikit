import React from 'react';

import {b} from '../constants';
import type {DefinitionListItemProps} from '../types';
import {getTitle, isUnbreakableOver} from '../utils';

import {Definition} from './Definition';
import {useDefinitionListAttributes} from './DefinitionListContext';
import {Term} from './Term';

export function DefinitionListItem({name, children, copyText, note}: DefinitionListItemProps) {
    const {direction, keyStyle, valueStyle} = useDefinitionListAttributes();
    return (
        <div className={b('item')}>
            <dt className={b('term-container')} style={keyStyle}>
                <Term direction={direction} name={name} note={note} />
            </dt>
            <dd
                className={b('definition')}
                title={getTitle(children)}
                style={{
                    ...valueStyle,
                    lineBreak:
                        typeof children === 'string' && isUnbreakableOver(20)(children)
                            ? 'anywhere'
                            : undefined,
                }}
            >
                <Definition copyText={copyText}>{children}</Definition>
            </dd>
        </div>
    );
}

DefinitionListItem.displayName = 'DefinitionListItem';
