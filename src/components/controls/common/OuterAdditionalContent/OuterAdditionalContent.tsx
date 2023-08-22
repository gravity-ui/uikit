import React from 'react';

import {block} from '../../../utils/cn';
import {getControlErrorTextId, getControlNoteId} from '../../utils';

import './OuterAdditionalContent.scss';

const b = block('outer-additional-content');

interface OuterAdditionalContentProps {
    isVisible?: boolean;
    note?: React.ReactNode;
    error?: React.ReactNode;
    controlId?: string;
}

export const OuterAdditionalContent = ({
    error,
    isVisible,
    note,
    controlId,
}: OuterAdditionalContentProps) => {
    return isVisible || note ? (
        <div className={b()}>
            {isVisible && (
                <div className={b('error')} id={getControlErrorTextId(controlId)}>
                    {error}
                </div>
            )}
            {note && (
                <div className={b('note')} id={getControlNoteId(controlId)}>
                    {note}
                </div>
            )}
        </div>
    ) : null;
};
