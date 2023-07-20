import type {BaseInputControlProps, InputControlState} from './types';

export const CONTROL_QA = 'control-qa';
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
    const {error, errorMessage, errorPlacement, validationState} = errorProps;

    let errorMessageProp: BaseInputControlProps['errorMessage'];
    if (typeof error === 'string') {
        errorMessageProp = error;
    }
    if (errorMessage || errorMessage === '') {
        errorMessageProp = errorMessage;
    }

    let validationStateProp: BaseInputControlProps['validationState'];
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
