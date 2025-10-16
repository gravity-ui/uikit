import * as React from 'react';

import {HelpMark} from '../../HelpMark';
import {b} from '../constants';
import i18n from '../i18n';
import type {
    DefinitionListDirection,
    DefinitionListItemNote,
    DefinitionListItemProps,
} from '../types';

interface NoteElementsProps {
    note?: DefinitionListItemNote;
}

function NoteElement({note}: NoteElementsProps) {
    const {t} = i18n.useTranslation();
    if (!note) {
        return null;
    }
    if (typeof note === 'string') {
        return (
            <HelpMark
                className={b('note')}
                popoverProps={{placement: ['bottom', 'top']}}
                aria-label={t('label_note')}
            >
                {note}
            </HelpMark>
        );
    }

    if (typeof note === 'object') {
        return (
            <HelpMark
                {...note}
                className={b('note', note.className)}
                popoverProps={{placement: ['bottom', 'top'], ...note.popoverProps}}
                aria-label={t('label_note')}
            />
        );
    }
    return null;
}

interface TermProps extends Pick<DefinitionListItemProps, 'note' | 'name'> {
    direction?: DefinitionListDirection;
}

export function TermContent({note, name, direction}: TermProps) {
    const noteElement = note ? (
        <React.Fragment>
            &nbsp;
            <NoteElement note={note} />
        </React.Fragment>
    ) : null;
    return (
        <React.Fragment>
            <div className={b('term-wrapper')}>
                {name}
                {noteElement}
            </div>
            {direction === 'horizontal' && <div className={b('dots')} />}
        </React.Fragment>
    );
}
