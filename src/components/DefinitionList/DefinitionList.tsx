import React from 'react';

import {Definition} from './components/Definition';
import {Term} from './components/Term';
import type {DefinitionListProps} from './types';
import {b, getTitle, isUnbreakableOver} from './utils';

import './DefinitionList.scss';

export function DefinitionList({
    items,
    responsive,
    direction = 'horizontal',
    nameMaxWidth,
    contentMaxWidth,
    className,
    qa,
}: DefinitionListProps) {
    const keyStyle = nameMaxWidth ? {maxWidth: nameMaxWidth, width: nameMaxWidth} : {};

    const valueStyle =
        typeof contentMaxWidth === 'number'
            ? {width: contentMaxWidth, maxWidth: contentMaxWidth}
            : {};

    const normalizedItems = React.useMemo(() => {
        return items.map((value, index) => ({...value, key: index}));
    }, [items]);

    return (
        <div
            className={b({responsive, vertical: direction === 'vertical'}, className)}
            data-qa={qa}
        >
            <dl className={b('list')}>
                {normalizedItems.map((item) => {
                    const {
                        name,
                        key,
                        content,
                        contentTitle,
                        nameTitle,
                        copyText,
                        note,
                        multilineName,
                    } = item;

                    return (
                        <div key={key} className={b('item')}>
                            <dt
                                className={b('term-container', {multiline: multilineName})}
                                style={keyStyle}
                            >
                                <Term
                                    direction={direction}
                                    name={name}
                                    nameTitle={nameTitle}
                                    note={note}
                                    multilineName={multilineName}
                                />
                            </dt>
                            <dd
                                className={b('definition')}
                                title={getTitle(contentTitle, content)}
                                style={{
                                    ...valueStyle,
                                    lineBreak:
                                        typeof content === 'string' &&
                                        isUnbreakableOver(20)(content)
                                            ? 'anywhere'
                                            : undefined,
                                }}
                            >
                                <Definition copyText={copyText} content={content} />
                            </dd>
                        </div>
                    );
                })}
            </dl>
        </div>
    );
}
