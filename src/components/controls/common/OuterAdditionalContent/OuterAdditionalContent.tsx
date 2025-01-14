import type * as React from 'react';

import {block} from '../../../utils/cn';
import {CONTROL_ERROR_MESSAGE_QA} from '../../utils';

import './OuterAdditionalContent.scss';

const b = block('outer-additional-content');

interface OuterAdditionalContentProps {
    note?: React.ReactNode;
    errorMessage?: React.ReactNode;
    noteId?: string;
    errorMessageId?: string;
}

export const OuterAdditionalContent = ({
    errorMessage,
    note,
    noteId,
    errorMessageId,
}: OuterAdditionalContentProps) => {
    return errorMessage || note ? (
        <div className={b()}>
            {errorMessage && (
                <div className={b('error')} id={errorMessageId} data-qa={CONTROL_ERROR_MESSAGE_QA}>
                    {errorMessage}
                </div>
            )}
            {note && (
                <div className={b('note')} id={noteId}>
                    {note}
                </div>
            )}
        </div>
    ) : null;
};
