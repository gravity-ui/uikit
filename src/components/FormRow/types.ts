import type {ReactNode, HTMLAttributes, PropsWithChildren} from 'react';

export interface FormRowProps {
    className?: string;
    /** Field label */
    fieldName?: ReactNode;
    /** Slot for inserting `<HelpPopover/>` next to label text */
    fieldHelpPopover?: ReactNode;
    /** Id of field to correctly associate it label */
    fieldId?: string;
    /** Display star next to required field */
    fieldRequired?: boolean;
    /** Field component itself. `<FormRow.FieldDescription/>` could be used here
     * next to field component itself */
    children?: ReactNode;
}

export type FormRowFieldDescriptionProps = PropsWithChildren<{}> &
    Pick<HTMLAttributes<HTMLParagraphElement>, 'id' | 'className'>;
