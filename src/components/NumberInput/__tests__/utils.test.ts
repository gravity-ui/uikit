import {clampToNearestStepValue, getParsedValue, getPossibleNumberSubstring} from '../utils';

describe('NumberInput utils', () => {
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
                expect(getPossibleNumberSubstring('- $123 456,78k', false)).toBe('-12345678');
            });
            test('removes units from number string with fraction without sign', () => {
                expect(getPossibleNumberSubstring('$123.45k', false)).toBe('12345');
            });
            test('returns number from valid chars', () => {
                expect(getPossibleNumberSubstring('$123abc.45k', false)).toBe('12345');
            });
            test('returns undefined on invalid string', () => {
                expect(getPossibleNumberSubstring('$abck', false)).toBe(undefined);
            });
            test('returns number from valid chars', () => {
                expect(getPossibleNumberSubstring('$123abc4.5k', false)).toBe('12345');
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
            expect(getParsedValue('-')).toEqual({value: null, valid: false});
        });
        it('returns integer value for uncompleted double value', () => {
            expect(getParsedValue('123.')).toEqual({value: 123, valid: true});
        });
        it('returns zero on empty string', () => {
            expect(getParsedValue('')).toEqual({value: null, valid: true});
        });
        it('returns undefined for NaN value', () => {
            expect(getParsedValue('1ab2.5cdef')).toEqual({value: null, valid: false});
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
