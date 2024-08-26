export type FormRowDirection = 'row' | 'column';

export interface FormRowProps {
    className?: string;
    /** Field label */
    label?: React.ReactNode;
    /** Slot for inserting `<HelpPopover/>` next to label text */
    labelHelpPopover?: React.ReactNode;
    /** Id of field to correctly associate it label */
    fieldId?: string;
    /** Display star next to required field */
    required?: boolean;
    /** Field component itself. `<FormRow.FieldDescription/>` could be used here
     * next to field component itself */
    children?: React.ReactNode;
    /** Direction in which the elements are placed */
    direction?: FormRowDirection;
}

export type FormRowFieldDescriptionProps = React.PropsWithChildren<{}> &
    Pick<React.HTMLAttributes<HTMLParagraphElement>, 'id' | 'className'>;
