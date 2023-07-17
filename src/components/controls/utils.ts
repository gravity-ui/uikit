import type {BaseInputControlProps, InputControlState} from './types';

export const prepareAutoComplete = (
    autoComplete: BaseInputControlProps['autoComplete'],
): string | undefined => {
    if (typeof autoComplete === 'boolean') {
        return autoComplete ? 'on' : 'off';
    } else {
        return autoComplete;
    }
};

export const getInputControlState = (
    validationStateProp: 'invalid' | undefined,
): InputControlState | undefined => {
    return validationStateProp === 'invalid' ? 'error' : undefined;
};

export const errorPropsMapper = (
    errorProps: Pick<
        BaseInputControlProps,
        'error' | 'errorMessage' | 'errorPlacement' | 'validationState'
    >,
) => {
    const {error, errorMessage, errorPlacement, validationState} = errorProps;

    let errorMessageProp: typeof errorMessage;
    if (typeof error === 'string') {
        errorMessageProp = error;
    }
    if (errorMessage || errorMessage === '') {
        errorMessageProp = errorMessage;
    }

    let validationStateProp: typeof validationState;
    if (
        validationState === 'invalid' ||
        Boolean(error) ||
        errorMessageProp ||
        errorMessageProp === ''
    ) {
        validationStateProp = 'invalid';
    }

    return {errorMessageProp, errorPlacementProp: errorPlacement, validationStateProp};
};
