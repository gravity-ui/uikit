import type {UseFormResetHandlerParams} from '../useFormResetHandler/types';

export type RadioGroupContextProps = {
    /** Input name */
    name: string;
    currentValue: string | null;
    disabled: boolean;
    ref: (node: UseFormResetHandlerParams | null) => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};
