type UseRadioGroupContextPropsStable = {
    /** Input name */
    name: string;
    disabled: boolean;
    ref: (node: HTMLInputElement) => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

type UseRadioGroupContextPropsValue = {
    currentValue: string | null;
};

export type UseRadioGroupContextProps = {
    /** Props that likely won't be changed */
    stable: UseRadioGroupContextPropsStable;
    /** Context for currently selected value */
    value: UseRadioGroupContextPropsValue;
};
