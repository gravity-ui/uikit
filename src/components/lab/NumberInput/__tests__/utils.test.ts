import {
    clampToNearestStepValue,
    getNumericInputValidator,
    getParsedValue,
    getPossibleNumberSubstring,
} from '../utils';

describe('NumberInput utils', () => {
    describe('getNumericInputValidator', () => {
        describe('pattern', () => {
            test('correctly identifies numbers positiveOnly=true withoutFraction=true', () => {
                const {pattern} = getNumericInputValidator({
                    positiveOnly: true,
                    withoutFraction: true,
                });

                expect(RegExp(pattern).test('123')).toBeTruthy();
                expect(RegExp(pattern).test('+123')).toBeTruthy();
                expect(RegExp(pattern).test('-123')).toBeFalsy();
                expect(RegExp(pattern).test('123.45')).toBeFalsy();
                expect(RegExp(pattern).test('-123.45')).toBeFalsy();
                expect(RegExp(pattern).test('0')).toBeTruthy();
                expect(RegExp(pattern).test('123.0')).toBeFalsy();
                expect(RegExp(pattern).test('-123.0')).toBeFalsy();
            });
            test('correctly identifies numbers positiveOnly=true withoutFraction=false', () => {
                const {pattern} = getNumericInputValidator({
                    positiveOnly: true,
                    withoutFraction: false,
                });

                expect(RegExp(pattern).test('123')).toBeTruthy();
                expect(RegExp(pattern).test('+123')).toBeTruthy();
                expect(RegExp(pattern).test('-123')).toBeFalsy();
                expect(RegExp(pattern).test('123.45')).toBeTruthy();
                expect(RegExp(pattern).test('-123.45')).toBeFalsy();
                expect(RegExp(pattern).test('0')).toBeTruthy();
                expect(RegExp(pattern).test('123.0')).toBeTruthy();
                expect(RegExp(pattern).test('-123.0')).toBeFalsy();
            });
            test('correctly identifies numbers positiveOnly=false withoutFraction=true', () => {
                const {pattern} = getNumericInputValidator({
                    positiveOnly: false,
                    withoutFraction: true,
                });

                expect(RegExp(pattern).test('123')).toBeTruthy();
                expect(RegExp(pattern).test('+123')).toBeTruthy();
                expect(RegExp(pattern).test('-123')).toBeTruthy();
                expect(RegExp(pattern).test('123.45')).toBeFalsy();
                expect(RegExp(pattern).test('-123.45')).toBeFalsy();
                expect(RegExp(pattern).test('0')).toBeTruthy();
                expect(RegExp(pattern).test('123.0')).toBeFalsy();
                expect(RegExp(pattern).test('-123.0')).toBeFalsy();
            });
            test('correctly identifies numbers positiveOnly=false withoutFraction=false', () => {
                const {pattern} = getNumericInputValidator({
                    positiveOnly: false,
                    withoutFraction: false,
                });

                expect(RegExp(pattern).test('123')).toBeTruthy();
                expect(RegExp(pattern).test('+123')).toBeTruthy();
                expect(RegExp(pattern).test('-123')).toBeTruthy();
                expect(RegExp(pattern).test('123.45')).toBeTruthy();
                expect(RegExp(pattern).test('-123.45')).toBeTruthy();
                expect(RegExp(pattern).test('0')).toBeTruthy();
                expect(RegExp(pattern).test('123.0')).toBeTruthy();
                expect(RegExp(pattern).test('-123.0')).toBeTruthy();
            });
        });

        describe('validator', () => {
            test('validates numbers positiveOnly=true withoutFraction=true', () => {
                const {validator} = getNumericInputValidator({
                    positiveOnly: true,
                    withoutFraction: true,
                });

                expect(validator(123)).toBe(undefined);
                expect(validator(-123)).toBe('NEGATIVE_VALUE_IS_NOT_ALLOWED');
                expect(validator(123.45)).toBe('FRACTION_IS_NOT_ALLOWED');
                expect(validator(-123.45)).toBe('NEGATIVE_VALUE_IS_NOT_ALLOWED');
                expect(validator(0)).toBe(undefined);
                expect(validator(123.0)).toBe(undefined);
                expect(validator(-123.0)).toBe('NEGATIVE_VALUE_IS_NOT_ALLOWED');
                expect(validator(Number('abc.def'))).toBe('INCORRECT_NUMBER');
                expect(validator(undefined)).toBe(undefined);
            });
            test('validates numbers positiveOnly=true withoutFraction=false', () => {
                const {validator} = getNumericInputValidator({
                    positiveOnly: true,
                    withoutFraction: false,
                });

                expect(validator(123)).toBe(undefined);
                expect(validator(-123)).toBe('NEGATIVE_VALUE_IS_NOT_ALLOWED');
                expect(validator(123.45)).toBe(undefined);
                expect(validator(-123.45)).toBe('NEGATIVE_VALUE_IS_NOT_ALLOWED');
                expect(validator(0)).toBe(undefined);
                expect(validator(123.0)).toBe(undefined);
                expect(validator(-123.0)).toBe('NEGATIVE_VALUE_IS_NOT_ALLOWED');
            });
            test('validates numbers positiveOnly=false withoutFraction=true', () => {
                const {validator} = getNumericInputValidator({
                    positiveOnly: false,
                    withoutFraction: true,
                });

                expect(validator(123)).toBe(undefined);
                expect(validator(-123)).toBe(undefined);
                expect(validator(123.45)).toBe('FRACTION_IS_NOT_ALLOWED');
                expect(validator(-123.45)).toBe('FRACTION_IS_NOT_ALLOWED');
                expect(validator(0)).toBe(undefined);
                expect(validator(123.0)).toBe(undefined);
                expect(validator(-123.0)).toBe(undefined);
            });
            test('validates numbers positiveOnly=false withoutFraction=false', () => {
                const {validator} = getNumericInputValidator({
                    positiveOnly: false,
                    withoutFraction: false,
                });

                expect(validator(123)).toBe(undefined);
                expect(validator(-123)).toBe(undefined);
                expect(validator(123.45)).toBe(undefined);
                expect(validator(-123.45)).toBe(undefined);
                expect(validator(0)).toBe(undefined);
                expect(validator(123.0)).toBe(undefined);
                expect(validator(-123.0)).toBe(undefined);
            });
            test('validates with custom min/max', () => {
                const {validator} = getNumericInputValidator({
                    positiveOnly: false,
                    withoutFraction: false,
                    min: -100,
                    max: 100,
                });
                expect(validator(100)).toBe(undefined);
                expect(validator(-100)).toBe(undefined);
                expect(validator(101)).toBe('NUMBER_GREATER_THAN_MAX_ALLOWED');
                expect(validator(-101)).toBe('NUMBER_LESS_THAN_MIN_ALLOWED');
                expect(validator(10)).toBe(undefined);
                expect(validator(-10)).toBe(undefined);
            });
            test('validates with default min/max', () => {
                const {validator} = getNumericInputValidator({
                    positiveOnly: false,
                    withoutFraction: false,
                });

                expect(validator(100)).toBe(undefined);
                expect(validator(-100)).toBe(undefined);
                expect(validator(Number.MIN_SAFE_INTEGER)).toBe(undefined);
                expect(validator(Number.MAX_SAFE_INTEGER)).toBe(undefined);
                expect(validator(100000000000000000)).toBe('NUMBER_GREATER_THAN_MAX_ALLOWED');
                expect(validator(-100000000000000000)).toBe('NUMBER_LESS_THAN_MIN_ALLOWED');
                expect(validator(10)).toBe(undefined);
                expect(validator(-10)).toBe(undefined);
            });
        });
    });
    describe('getPossibleNumberSubstring', () => {
        describe('with allowDecimal', () => {
            test('removes starting unit from negative integer number string', () => {
                expect(getPossibleNumberSubstring('$$$123', true)).toBe('123');
            });
            test('removes trailing unit from negative integer number string', () => {
                expect(getPossibleNumberSubstring('123k', true)).toBe('123');
            });
            test('removes units from negative integer number string', () => {
                expect(getPossibleNumberSubstring('-$123k', true)).toBe('-123');
            });
            test('removes units from integer number string', () => {
                expect(getPossibleNumberSubstring('$123k', true)).toBe('123');
            });
            test('removes units from negative number string with fraction', () => {
                expect(getPossibleNumberSubstring('- $123 456,78k', true)).toBe('-123456.78');
            });
            test('removes units from number string with fraction without sign', () => {
                expect(getPossibleNumberSubstring('$123.45k', true)).toBe('123.45');
            });
            test('returns undefined on invalid string', () => {
                expect(getPossibleNumberSubstring('$abck', true)).toBe(undefined);
            });
            test('returns number from valid chars', () => {
                expect(getPossibleNumberSubstring('$123abc4.5k', true)).toBe('1234.5');
            });
            test('returns empty string on empty value', () => {
                expect(getPossibleNumberSubstring('', true)).toBe('');
            });
            test('leaves unmodified sign only value', () => {
                expect(getPossibleNumberSubstring('-', true)).toBe('-');
            });
            test('leaves unmodified uncompleted value', () => {
                expect(getPossibleNumberSubstring('123.', true)).toBe('123.');
            });
        });
        describe('without allowDecimal', () => {
            test('removes starting unit from negative integer number string', () => {
                expect(getPossibleNumberSubstring('$$$123', false)).toBe('123');
            });
            test('removes trailing unit from negative integer number string', () => {
                expect(getPossibleNumberSubstring('123k', false)).toBe('123');
            });
            test('removes units from negative integer number string', () => {
                expect(getPossibleNumberSubstring('-$123k', false)).toBe('-123');
            });
            test('removes units from integer number string', () => {
                expect(getPossibleNumberSubstring('$123k', false)).toBe('123');
            });
            test('removes units from negative number string with fraction', () => {
                expect(getPossibleNumberSubstring('- $123 456,78k', false)).toBe('-123456');
            });
            test('removes units from number string with fraction without sign', () => {
                expect(getPossibleNumberSubstring('$123.45k', false)).toBe('123');
            });
            test('returns number from valid chars', () => {
                expect(getPossibleNumberSubstring('$123abc.45k', false)).toBe('123');
            });
            test('returns undefined on invalid string', () => {
                expect(getPossibleNumberSubstring('$abck', false)).toBe(undefined);
            });
            test('returns number from valid chars', () => {
                expect(getPossibleNumberSubstring('$123abc4.5k', false)).toBe('1234');
            });
            test('returns empty string on empty value', () => {
                expect(getPossibleNumberSubstring('', false)).toBe('');
            });
            test('leaves unmodified sign only value', () => {
                expect(getPossibleNumberSubstring('-', false)).toBe('-');
            });
            test('leaves unmodified uncompleted value', () => {
                expect(getPossibleNumberSubstring('123.', false)).toBe('123');
            });
        });
    });
    describe('getParsedValue', () => {
        it('returns value itself', () => {
            expect(getParsedValue('-123.45')).toEqual({value: -123.45, valid: true});
        });
        it('returns undefined on sign-only value', () => {
            expect(getParsedValue('-')).toEqual({value: undefined, valid: false});
        });
        it('returns integer value for uncompleted double value', () => {
            expect(getParsedValue('123.')).toEqual({value: 123, valid: true});
        });
        it('returns zero on empty string', () => {
            expect(getParsedValue('')).toEqual({value: undefined, valid: true});
        });
        it('returns undefined for NaN value', () => {
            expect(getParsedValue('1ab2.5cdef')).toEqual({value: undefined, valid: false});
        });
    });
    describe('clampToNearestStepValue', () => {
        const allDirections = [undefined, 'up', 'down'] as const;

        it('clamps value to bigger divisible on step with min value without direction', () => {
            expect(clampToNearestStepValue({value: 10, step: 5, min: -3, max: undefined})).toBe(12);
        });
        it('clamps value to smaller divisible on step with min value without direction', () => {
            expect(clampToNearestStepValue({value: 10, step: 5, min: -2, max: undefined})).toBe(8);
        });
        it('clamps value to bigger divisible on step with min value and direction=down', () => {
            expect(
                clampToNearestStepValue({
                    value: 10,
                    step: 5,
                    min: -3,
                    max: undefined,
                    direction: 'down',
                }),
            ).toBe(12);
        });
        it('clamps value to smaller divisible on step with min value and direction=down', () => {
            expect(
                clampToNearestStepValue({
                    value: 10,
                    step: 5,
                    min: -3,
                    max: undefined,
                    direction: 'up',
                }),
            ).toBe(7);
        });
        allDirections.forEach((direction) =>
            it(`clamps to min if value smaller with direction=${direction}`, () => {
                expect(
                    clampToNearestStepValue({
                        value: -10,
                        step: 5,
                        min: -2,
                        max: undefined,
                        direction,
                    }),
                ).toBe(-2);
            }),
        );
        allDirections.forEach((direction) =>
            it(`clamps to max possible number if value greater than max with direction=${direction}`, () => {
                expect(
                    clampToNearestStepValue({value: 105, step: 5, min: -2, max: 100, direction}),
                ).toBe(98);
            }),
        );
        it('clamps to max if it is suitable', () => {
            expect(clampToNearestStepValue({value: 97, step: 5, min: -2, max: 98})).toBe(98);
        });
        it('clamps to min if it is suitable', () => {
            expect(clampToNearestStepValue({value: 97, step: 5, min: 96, max: 1000})).toBe(96);
        });
        it('leave value if it suitable', () => {
            expect(clampToNearestStepValue({value: 8, step: 5, min: -2, max: undefined})).toBe(8);
        });
        it('clamps to MAX_SAFE_INTEGER with big numbers if max is not defined', () => {
            expect(
                clampToNearestStepValue({
                    value: Number.MAX_SAFE_INTEGER + 2,
                    step: 1,
                    min: -1,
                    max: undefined,
                }),
            ).toBe(Number.MAX_SAFE_INTEGER);
        });
        it('clamps to MIN_SAFE_INTEGER with big numbers if min is not defined', () => {
            expect(
                clampToNearestStepValue({
                    value: Number.MIN_SAFE_INTEGER - 2,
                    step: 1,
                    min: undefined,
                    max: undefined,
                }),
            ).toBe(Number.MIN_SAFE_INTEGER);
        });
        it('uses zero as reference point if min is not defined', () => {
            expect(
                clampToNearestStepValue({
                    value: 11,
                    step: 4,
                    min: undefined,
                    max: undefined,
                }),
            ).toBe(12);
        });
        it('does not clamp decimal value', () => {
            expect(
                clampToNearestStepValue({value: 1.25, step: 8.25, min: -1, max: undefined}),
            ).toBe(1.25);
        });
    });
});
