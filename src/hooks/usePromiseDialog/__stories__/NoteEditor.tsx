import React from 'react';

import {Button, Dialog, TextInput} from '../../../components';

export type NoteEditorProps = {
    onSave: (value: string) => void;
    onValidateAndSave: (note: string) => void;
    onCancel: () => void;
};

export const NoteEditor = ({onSave, onValidateAndSave, onCancel}: NoteEditorProps) => {
    const [note, setNote] = React.useState('');

    const handleApply = React.useCallback(() => {
        onSave(note);
    }, [note, onSave]);

    const handleValidateAndApply = React.useCallback(() => {
        onValidateAndSave(note);
    }, [note, onValidateAndSave]);

    return (
        <React.Fragment>
            <Dialog.Header caption="Add note" />
            <Dialog.Body>
                <TextInput value={note} onUpdate={setNote} />
            </Dialog.Body>
            <Dialog.Footer
                textButtonApply="Save"
                textButtonCancel="Cancel"
                onClickButtonApply={handleApply}
                onClickButtonCancel={onCancel}
                renderButtons={(buttonApply, buttonCancel) => (
                    <React.Fragment>
                        {buttonCancel}
                        {buttonApply}
                        <Button view="action" size="l" onClick={handleValidateAndApply}>
                            Validate and Save
                        </Button>
                    </React.Fragment>
                )}
            />
        </React.Fragment>
    );
};
