import type {BaseInputProps} from '../utility-types';

export type TextInputProps = BaseInputProps<HTMLInputElement> & {
    controlProps?: React.InputHTMLAttributes<HTMLInputElement>;
    label?: string;
    /**
     * User`s node rendered before label and input
     */
    leftContent?: React.ReactNode;
    /**
     * User`s node rendered after input and clear button
     */
    rightContent?: React.ReactNode;
};
