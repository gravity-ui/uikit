import React from 'react';

import {HelpMark} from '../../HelpMark';
import {b} from '../constants';
import i18n from '../i18n';
import type {
    DefinitionListDirection,
    DefinitionListItemNote,
    DefinitionListItemProps,
} from '../types';
import {getTitle} from '../utils';

interface NoteElementsProps {
    note?: DefinitionListItemNote;
}

function NoteElement({note}: NoteElementsProps) {
    if (!note) {
        return null;
    }
    const popoverClassName = b('item-note-tooltip');
    if (typeof note === 'string') {
        return (
            <HelpMark
                className={popoverClassName}
                placement={['bottom', 'top']}
                buttonProps={{
                    'aria-label': i18n('label_note'),
                }}
            >
                {note}
            </HelpMark>
        );
    }

    if (typeof note === 'object') {
        const {buttonProps, ...rest} = note;

        return (
            <HelpMark
                className={popoverClassName}
                placement={['bottom', 'top']}
                buttonProps={{
                    'aria-label': i18n('label_note'),
                    ...buttonProps,
                }}
                {...rest}
            />
        );
    }
    return null;
}

interface TermProps extends Pick<DefinitionListItemProps, 'note' | 'name'> {
    direction?: DefinitionListDirection;
}

export function Term({note, name, direction}: TermProps) {
    const noteElement = note ? (
        <React.Fragment>
            &nbsp;
            <NoteElement note={note} />
        </React.Fragment>
    ) : null;
    return (
        <React.Fragment>
            <div className={b('term-wrapper')}>
                <span title={getTitle(name)}>{name}</span>
                {noteElement}
            </div>
            {direction === 'horizontal' && <div className={b('dots')} />}
        </React.Fragment>
    );
}
