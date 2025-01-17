export const INCREMENT_BUTTON_QA = 'increment-button-qa';
export const DECREMENT_BUTTON_QA = 'decrement-button-qa';
export const CONTROL_BUTTONS_QA = 'control-buttons-qa';

export function getInputPattern(withoutFraction: boolean, positiveOnly = false) {
    return `^([${positiveOnly ? '' : '\\-'}\\+]?\\d+${withoutFraction ? '' : '(?:(?:.|,)?\\d+)?'})+$`;
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

    const possibleNumberString = [
        match[1], // sign
        match[2], // integer part
        allowDecimal ? match[3] : undefined, // dot
        match[4], // fraction
    ]
        .filter(Boolean)
        .join('');

    return possibleNumberString;
}

export function getParsedValue(value: string | undefined): {valid: boolean; value: number | null} {
    if (value === undefined || value === '') {
        return {valid: true, value: null};
    }
    const parsedValueOrNaN = Number(value);

    const isValidValue = !Number.isNaN(parsedValueOrNaN);
    const parsedValue = isValidValue ? parsedValueOrNaN : null;

    return {valid: isValidValue, value: parsedValue};
}

function roundIfNecessary(value: number, allowDecimal: boolean) {
    return allowDecimal ? value : Math.floor(value);
}

interface VariablesProps {
    min: number | undefined;
    max: number | undefined;
    step: number | undefined;
    shiftMultiplier: number;
    value: number | null | undefined;
    defaultValue: number | null | undefined;
    allowDecimal: boolean;
}
export function getInternalState(props: VariablesProps): {
    min: number | undefined;
    max: number | undefined;
    step: number;
    shiftMultiplier: number;
    value: number | null | undefined;
    defaultValue: number | null | undefined;
} {
    const {
        min: externalMin,
        max: externalMax,
        step: externalStep = 1,
        shiftMultiplier: externalShiftMultiplier,
        value: externalValue,
        allowDecimal,
        defaultValue: externalDefaultValue,
    } = props;

    const {min: rangedMin, max: rangedMax} =
        externalMin && externalMax && externalMin > externalMax
            ? {
                  min: externalMax,
                  max: externalMin,
              }
            : {min: externalMin, max: externalMax};

    const min =
        rangedMin !== undefined && rangedMin >= Number.MIN_SAFE_INTEGER ? rangedMin : undefined;
    const max =
        rangedMax !== undefined && rangedMax <= Number.MAX_SAFE_INTEGER ? rangedMax : undefined;

    const step = roundIfNecessary(Math.abs(externalStep), allowDecimal) || 1;
    const shiftMultiplier = roundIfNecessary(externalShiftMultiplier, allowDecimal) || 10;
    const value = externalValue ? roundIfNecessary(externalValue, allowDecimal) : externalValue;
    const defaultValue = externalDefaultValue
        ? roundIfNecessary(externalDefaultValue, allowDecimal)
        : externalDefaultValue;

    return {min, max, step, shiftMultiplier, value, defaultValue};
}

export function clampToNearestStepValue({
    value,
    step,
    min: originalMin,
    max = Number.MAX_SAFE_INTEGER,
    direction,
}: {
    value: number;
    step: number;
    min: number | undefined;
    max: number | undefined;
    direction?: 'up' | 'down';
}) {
    const base = originalMin || 0;
    const min = originalMin ?? Number.MIN_SAFE_INTEGER;
    let clampedValue = toFixedNumber(value, step);

    if (clampedValue > max) {
        clampedValue = max;
    } else if (clampedValue < min) {
        clampedValue = min;
    }
    if (!Number.isInteger(value) || !Number.isInteger(step)) {
        // calculations with decimal values can bring inaccuracy with lots of zeros
        return clampedValue;
    }
    const amountOfStepsDiff = Math.floor((clampedValue - base) / step);
    const stepDeviation = clampedValue - base - step * amountOfStepsDiff;

    if (stepDeviation !== 0) {
        const smallerPossibleValue = base + amountOfStepsDiff * step;
        const greaterPossibleValue = base + (amountOfStepsDiff + 1) * step;

        const smallerValueIsPreferrable = direction
            ? direction === 'up'
            : greaterPossibleValue - clampedValue > clampedValue - smallerPossibleValue;

        if (
            (greaterPossibleValue > max || smallerValueIsPreferrable) &&
            smallerPossibleValue >= min
        ) {
            return smallerPossibleValue;
        }
        if (greaterPossibleValue <= max) {
            return greaterPossibleValue;
        }
    }

    return toFixedNumber(clampedValue, step);
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

// Useful when in input string '-1.' is typed and value={-1} prop passed.
// In this case we leave input string without replacing it by '-1'.
// Means that where is no need for replacing current input value with external value
export function areStringRepresentationOfNumbersEqual(v1: string, v2: string) {
    if (v1 === v2) {
        return true;
    }

    const {valid: v1Valid, value: v1Value} = getParsedValue(v1);
    const {valid: v2Valid, value: v2Value} = getParsedValue(v2);

    if (v1Valid && v2Valid) {
        return v1Value === v2Value;
    }

    const v1OnlyNumbers = v1.replace(/\D/g, '');
    const v2OnlyNumbers = v2.replace(/\D/g, '');

    if (v1OnlyNumbers.length === v2OnlyNumbers.length && v1OnlyNumbers.length === 0) {
        // exmpl, when just '-' typed and '' (equivalent for undefined) value passed
        return true;
    }
    return false;
}

function toFixedNumber(value: number, baseStep: number): number {
    const stepDecimalDigits = baseStep.toString().split('.')[1]?.length || 0;
    return parseFloat(value.toFixed(stepDecimalDigits));
}
