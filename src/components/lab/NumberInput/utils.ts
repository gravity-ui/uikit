export const INCREMENT_BUTTON_QA = 'increment-button-qa';
export const DECREMENT_BUTTON_QA = 'decrement-button-qa';
export const CONTROL_BUTTONS_QA = 'control-buttons-qa';

export interface GetNumericInputValidatorParams {
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

type ValidatorFunction = (value: number | undefined) => undefined | ErrorCode; // undefined if value is correct

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

    function validator(value: number | undefined): undefined | ErrorCode {
        if (value === undefined) {
            return undefined;
        }

        if (Number.isNaN(value)) {
            return 'INCORRECT_NUMBER';
        }

        if (positiveOnly && value < 0) {
            return 'NEGATIVE_VALUE_IS_NOT_ALLOWED';
        }

        if (withoutFraction && !Number.isInteger(value)) {
            return 'FRACTION_IS_NOT_ALLOWED';
        }

        if (value < min) {
            return 'NUMBER_LESS_THAN_MIN_ALLOWED';
        }

        if (value > max) {
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

export function getPossibleNumberSubstring(
    value: string,
    allowDecimal: boolean,
): string | undefined {
    const preparedString = prepareStringValue(value);
    const match = pastedInputParsingRegex.exec(preparedString);
    if (!match || (value.length > 0 && preparedString.length === 0)) {
        return undefined;
    }

    const possibleNumberString = [...match]
        .slice(
            1,
            allowDecimal ? undefined : 3, // leave full number or only sign and integer part
        )
        .filter(Boolean)
        .join('');

    return possibleNumberString;
}

export function getParsedValue(value: string | undefined) {
    if (value === undefined) {
        return {valid: true, value: undefined};
    }
    const parsedValueOrNaN = Number(value);

    const isValidValue = !Number.isNaN(parsedValueOrNaN);
    const parsedValue = isValidValue ? parsedValueOrNaN : undefined;

    return {valid: isValidValue, value: parsedValue};
}

function roundIfNecessary(value: number, allowDecimal: boolean) {
    return allowDecimal ? value : Math.floor(value);
}

interface VariablesProps {
    min: number | undefined;
    max: number | undefined;
    step: number;
    shiftMultiplier: number;
    value: number | undefined;
    defaultValue: number | undefined;
    allowDecimal: boolean;
}
export function getInternalVariables(props: VariablesProps): {
    min: number | undefined;
    max: number | undefined;
    step: number;
    shiftMultiplier: number;
    value: number;
    defaultValue: number;
} {
    warnAboutInvalidProps(props);

    const {
        min: externalMin,
        max: externalMax,
        step: externalStep,
        shiftMultiplier: externalShiftMultiplier,
        value: externalValue = 0,
        allowDecimal,
        defaultValue: externalDefaultValue = 0,
    } = props;

    const {min: rangedMin, max: rangedMax} =
        externalMin && externalMax && externalMin > externalMax
            ? {
                  min: externalMax,
                  max: externalMin,
              }
            : {min: externalMin, max: externalMax};

    const min = rangedMin && rangedMin >= Number.MIN_SAFE_INTEGER ? rangedMin : undefined;
    const max = rangedMax && rangedMax <= Number.MAX_SAFE_INTEGER ? rangedMax : undefined;

    const step = roundIfNecessary(Math.abs(externalStep), allowDecimal) || 1;
    const shiftMultiplier = roundIfNecessary(externalShiftMultiplier, allowDecimal) || 10;
    const value = roundIfNecessary(externalValue, allowDecimal);
    const defaultValue = roundIfNecessary(externalDefaultValue, allowDecimal);

    return {min, max, step, shiftMultiplier, value, defaultValue};
}

export function clampToNearestStepValue({
    value,
    step,
    min: originalMin,
    max = Number.MAX_SAFE_INTEGER,
}: {
    value: number;
    step: number;
    min: number | undefined;
    max: number | undefined;
}) {
    const base = originalMin || 0;
    const min = originalMin ?? Number.MIN_SAFE_INTEGER;
    const clampedValue = Math.max(min, Math.min(max, value));
    const stepDeviation = (clampedValue - base) % step;
    const amountOfStepsDiff = Math.floor((clampedValue - base) / step);
    if (stepDeviation !== 0) {
        const smallerPossibleValue = base + amountOfStepsDiff * step;
        const greaterPossibleValue = base + (amountOfStepsDiff + 1) * step;

        if (
            (greaterPossibleValue > max ||
                greaterPossibleValue - clampedValue > clampedValue - smallerPossibleValue) &&
            smallerPossibleValue >= min
        ) {
            return smallerPossibleValue;
        }
        if (greaterPossibleValue <= max) {
            return greaterPossibleValue;
        }
    }
    return clampedValue;
}

export function warnAboutInvalidProps({
    min,
    max,
    step,
    shiftMultiplier,
    value,
    defaultValue,
    allowDecimal,
}: VariablesProps) {
    if (min && min < Number.MIN_SAFE_INTEGER) {
        console.warn('min value sould not be less than Number.MIN_SAFE_INTEGER');
    }
    if (max && max > Number.MAX_SAFE_INTEGER) {
        console.warn('min value sould not be greater than Number.MAX_SAFE_INTEGER');
    }

    if (min && max && min > max) {
        console.warn('min value sould not be greater than max value');
    }

    if (!allowDecimal && value && !Number.isInteger(value)) {
        console.warn(value, 'Decimal value passed with allowDecimal=false');
    }

    if (!allowDecimal && defaultValue && !Number.isInteger(defaultValue)) {
        console.warn('Decimal defaultValue passed with allowDecimal=false');
    }

    if (step <= 0) {
        console.warn('Invalid step value passed');
    }

    if (!allowDecimal && !Number.isInteger(step)) {
        console.warn('Decimal step value passed with allowDecimal=false');
    }

    if (step && max && min && max - min < step) {
        console.warn('step value is greater than allowed range');
    }

    if (!allowDecimal && !Number.isInteger(shiftMultiplier)) {
        console.warn('Decimal shiftMultiplier value passed with allowDecimal=false');
    }
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
