export const INCREMENT_BUTTON_QA = 'increment-button-qa';
export const DECREMENT_BUTTON_QA = 'decrement-button-qa';
export const CONTROL_BUTTONS_QA = 'control-buttons-qa';

interface GetNumericInputValidatorParams {
    positiveOnly: boolean;
    withoutFraction: boolean;
    min?: number;
    max?: number;
}
type ErrorCode =
    | 'INCORRECT_NUMBER' // we weren't able to cast value to number
    | 'NEGATIVE_VALUE_IS_NOT_ALLOWED' // we were able to cast value to number, but the number is negative
    | 'FRACTION_IS_NOT_ALLOWED' // we were able to cast value to number, but the number has fraction
    | 'NUMBER_LESS_THAN_MIN_ALLOWED' // we were able to cast value to number, but it is less than min allowed
    | 'NUMBER_GREATER_THAN_MAX_ALLOWED'; // we were able to cast value to number, but it is greater than max allowed

type ValidatorFunction = (value: string) => undefined | ErrorCode; // undefined if value is correct

interface GetNumericInputValidatorReturnValue {
    pattern: string; // pattern to be used as HTML attribute
    validator: ValidatorFunction;
}

export function getNumericInputValidator({
    positiveOnly,
    withoutFraction,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
}: GetNumericInputValidatorParams): GetNumericInputValidatorReturnValue {
    const pattern = `^([${positiveOnly ? '' : '-'}+]?\\d+${withoutFraction ? '' : '(?:(?:\\.|,)?\\d+)?'})$`;

    function validator(value: string): undefined | ErrorCode {
        if (value === '') {
            return undefined;
        }

        const parsedValue = parseUnsafe(value);

        if (parsedValue === undefined) {
            return undefined;
        }

        if (Number.isNaN(parsedValue)) {
            return 'INCORRECT_NUMBER';
        }

        if (positiveOnly && parsedValue < 0) {
            return 'NEGATIVE_VALUE_IS_NOT_ALLOWED';
        }

        if (withoutFraction && !Number.isInteger(parsedValue)) {
            return 'FRACTION_IS_NOT_ALLOWED';
        }

        if (parsedValue < min) {
            return 'NUMBER_LESS_THAN_MIN_ALLOWED';
        }

        if (parsedValue > max) {
            return 'NUMBER_GREATER_THAN_MAX_ALLOWED';
        }

        return undefined;
    }

    return {pattern, validator};
}

/* For parsing paste with units as "- $123.45k"
 * Other strings with mixed numbers and letters/signs would be considered as invalid
 * -------------------------------(  $1 )-------($2 )( $3 ) ($4 )------ */
const pastedInputParsingRegex = /^([-+]?)(?:\D*)(\d*)(\.|,)?(\d*)(?:\D*)$/;

export function prepareStringValue(value: string): string {
    return value.replace(',', '.').replace(/\s/g, '');
}

export function parseUnsafe(value: string | undefined): number | undefined {
    if (value === undefined) {
        return undefined;
    }
    const preparedString = prepareStringValue(value);
    const possibleNumber = Number(preparedString);

    return possibleNumber;
}

export function format(value: number): string {
    return String(value);
}

export function getPossibleNumberSubstring(value: string) {
    const match = pastedInputParsingRegex.exec(prepareStringValue(value));
    if (!match) {
        return undefined;
    }
    return [...match].slice(1).filter(Boolean).join('');
}

export function getParsedValue(value: string | undefined) {
    const parsedValueOrNaN = parseUnsafe(value);

    const isNumberValue = parsedValueOrNaN !== undefined && !Number.isNaN(parsedValueOrNaN);
    const parsedValue = isNumberValue ? parsedValueOrNaN : 0;

    return {isNumberValue, parsedValue};
}
