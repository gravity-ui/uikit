import type {ReactNode, HTMLAttributes, PropsWithChildren} from 'react';

export interface FormRowProps {
    className?: string;
    fieldName?: ReactNode;
    fieldHelpPopover?: ReactNode;
    fieldId?: string;
    fieldRequired?: boolean;
    children?: ReactNode;
}

export type FormRowFieldDescriptionProps = PropsWithChildren<{}> &
    Pick<HTMLAttributes<HTMLParagraphElement>, 'id' | 'className'>;
