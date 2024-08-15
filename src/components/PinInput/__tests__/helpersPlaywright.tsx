import React from 'react';

import type {PinInputProps} from '../PinInput';
import {PinInput} from '../PinInput';

export const TestPinInput = (props: Partial<Omit<PinInputProps, 'value' | 'onUpdate'>>) => {
    const [value, setValue] = React.useState<PinInputProps['value']>([]);

    return <PinInput autoFocus value={value} onUpdate={setValue} {...props} />;
};

export const TestPinInputWithNote = (props: Partial<Omit<PinInputProps, 'value' | 'onUpdate'>>) => {
    return <TestPinInput {...props} note={<div>Note</div>} />;
};

export const TestPinInputWithErrorMessage = (
    props: Partial<Omit<PinInputProps, 'value' | 'onUpdate'>>,
) => {
    return (
        <TestPinInput
            {...props}
            validationState={'invalid'}
            errorMessage={<div>Error message</div>}
        />
    );
};
