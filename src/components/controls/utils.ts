import type {BaseInputControlProps, InputControlState} from './types';

export const CONTROL_ERROR_MESSAGE_QA = 'control-error-message-qa';
export const CONTROL_ERROR_ICON_QA = 'control-error-icon-qa';

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
    validationStateProp: BaseInputControlProps['validationState'],
): InputControlState | undefined => {
    return validationStateProp === 'invalid' ? 'error' : undefined;
};

export const errorPropsMapper = (
    errorProps: Pick<
        BaseInputControlProps,
        'error' | 'errorMessage' | 'errorPlacement' | 'validationState'
    >,
) => {
    const {
        error: errorProp,
        errorMessage: errorMessageProp,
        errorPlacement,
        validationState: validationStateProp,
    } = errorProps;

    let errorMessage: BaseInputControlProps['errorMessage'];
    if (typeof errorProp === 'string') {
        errorMessage = errorProp;
    }
    if (errorMessageProp) {
        errorMessage = errorMessageProp;
    }

    let validationState: BaseInputControlProps['validationState'];
    if (validationStateProp === 'invalid' || Boolean(errorProp)) {
        validationState = 'invalid';
    }

    return {errorMessage, errorPlacement, validationState};
};
