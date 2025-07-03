import {b} from '../constants';
import type {DefinitionListItemProps} from '../types';
import {isUnbreakableOver} from '../utils';

import {DefinitionContent} from './DefinitionContent';
import {useDefinitionListAttributes} from './DefinitionListContext';
import {TermContent} from './TermContent';

export function DefinitionListItem({name, children, copyText, note, qa}: DefinitionListItemProps) {
    const {direction, keyStyle, valueStyle} = useDefinitionListAttributes();
    return (
        <div className={b('item')} data-qa={qa}>
            <dt className={b('term-container')} style={keyStyle}>
                <TermContent direction={direction} name={name} note={note} />
            </dt>
            <dd
                className={b('definition')}
                style={{
                    ...valueStyle,
                    lineBreak:
                        typeof children === 'string' && isUnbreakableOver(20)(children)
                            ? 'anywhere'
                            : undefined,
                }}
            >
                <DefinitionContent copyText={copyText}>{children}</DefinitionContent>
            </dd>
        </div>
    );
}

DefinitionListItem.displayName = 'DefinitionListItem';
