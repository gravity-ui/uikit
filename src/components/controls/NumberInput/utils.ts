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
    return value
        .replace(',', '.')
        .replace(/\s/g, '')
        .replace(/[^\d.+-]/g, '');
}

export function parseUnsafe(value: string | undefined = ''): number {
    const preparedString = prepareStringValue(value);
    const possibleNumber = Number(preparedString);

    return possibleNumber;
}

export function format(value: number): string {
    return String(value);
}

export function getPossibleNumberSubstring(
    value: string,
    allowDecimal: boolean,
): string | undefined {
    const preparedString = prepareStringValue(value);
    const match = pastedInputParsingRegex.exec(preparedString);
    if (!match || (value.length > 0 && preparedString.length === 0)) {
        return undefined;
    }

    return [...match]
        .slice(
            1,
            allowDecimal ? undefined : 3, // leave full number or only sign and integer part
        )
        .filter(Boolean)
        .join('');
}

export function getParsedValue(value: string | undefined) {
    const parsedValueOrNaN = parseUnsafe(value);

    const isNumberValue = !Number.isNaN(parsedValueOrNaN);
    const parsedValue = isNumberValue ? parsedValueOrNaN : 0;

    return {isNumberValue, parsedValue};
}
export function getInternalVariables({
    min: externalMin,
    max: externalMax,
    step: externalStep,
    shiftMultiplier: externalShiftMultiplier,
    value: externalValue = '',
    allowDecimal,
}: {
    min: number;
    max: number;
    step: number;
    shiftMultiplier: number;
    value: string | undefined;
    allowDecimal: boolean;
}) {
    if (externalMin && externalMin < Number.MIN_SAFE_INTEGER) {
        console.log('min value sould not be less than Number.MIN_SAFE_INTEGER');
    }
    if (externalMax && externalMax > Number.MAX_SAFE_INTEGER) {
        console.log('min value sould not be greater than Number.MAX_SAFE_INTEGER');
    }

    if (externalMin && externalMax && externalMin > externalMax) {
        console.warn('min value sould not be greater than max value');
    }

    const min = externalMin
        ? Math.max(Math.min(externalMin, externalMax), Number.MIN_SAFE_INTEGER)
        : Number.MIN_SAFE_INTEGER;
    const max = externalMax
        ? Math.min(Math.max(externalMin, externalMax), Number.MAX_SAFE_INTEGER)
        : Number.MAX_SAFE_INTEGER;

    const {isNumberValue, parsedValue} = getParsedValue(externalValue);
    if (!isNumberValue) {
        console.warn('Non-numeric value passed');
    } else if (!allowDecimal && !Number.isInteger(parsedValue)) {
        console.warn('Decimal value passed with allowDecimal=false');
    }

    if (!allowDecimal && !Number.isInteger(externalStep)) {
        console.warn('Decimal step value passed with allowDecimal=false');
    }

    if (!allowDecimal && !Number.isInteger(externalShiftMultiplier)) {
        console.warn('Decimal shiftMultiplier value passed with allowDecimal=false');
    }

    const step = allowDecimal ? externalStep : Math.ceil(externalStep);
    const shiftMultiplier = allowDecimal
        ? externalShiftMultiplier
        : Math.ceil(externalShiftMultiplier);
    const value = allowDecimal ? parsedValue : Math.floor(parsedValue);
    return {min, max, step, shiftMultiplier, isNumberValue, value};
}

export function updateCursorPosition(
    inputRef: React.RefObject<HTMLInputElement>,
    eventRawValue: string | undefined = '',
    computedEventValue: string | undefined = '',
) {
    const currentSelectionEndPosition = inputRef.current?.selectionEnd ?? eventRawValue.length;
    if (eventRawValue !== computedEventValue) {
        const startingPossiblyChangedPart = eventRawValue.slice(0, currentSelectionEndPosition);
        const trailingUnchangedLength = eventRawValue.length - startingPossiblyChangedPart.length;

        const newStartingPart = computedEventValue.slice(
            0,
            computedEventValue.length - trailingUnchangedLength,
        );

        inputRef.current?.setRangeText(
            newStartingPart,
            0,
            startingPossiblyChangedPart.length,
            'end',
        );
    }
}
