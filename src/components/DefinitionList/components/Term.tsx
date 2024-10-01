import React from 'react';

import {HelpMark} from '../../HelpMark';
import i18n from '../i18n';
import type {DefinitionListDirection, DefinitionListItem, DefinitionListItemNote} from '../types';
import {b, getTitle} from '../utils';

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
                content={note}
                placement={['bottom', 'top']}
                buttonProps={{
                    'aria-label': i18n('label_note'),
                }}
            />
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

interface TermProps
    extends Pick<DefinitionListItem, 'note' | 'name' | 'nameTitle' | 'multilineName'> {
    direction?: DefinitionListDirection;
}

export function Term({note, name, nameTitle, multilineName, direction}: TermProps) {
    const noteElement = (
        <React.Fragment>
            &nbsp;
            <NoteElement note={note} />
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <div className={b('term-wrapper')}>
                <span title={getTitle(nameTitle, name)}>{name}</span>
                {multilineName && noteElement}
            </div>
            {!multilineName && noteElement}
            {direction === 'horizontal' && (
                <div className={b('dots', {'with-note': Boolean(note)})} />
            )}
        </React.Fragment>
    );
}
