import type {PaletteOption} from '../Palette';
import {getPaletteRows} from '../utils';

const A: PaletteOption = {content: '😎', value: 'ID-1'};
const B: PaletteOption = {content: '🥴', value: 'ID-2'};
const C: PaletteOption = {content: '😱', value: 'ID-3'};
const D: PaletteOption = {content: '🤗', value: 'ID-4'};

const options: PaletteOption[] = [A, B, C, D];

describe('Palette utils', () => {
    describe('getPaletteRows', () => {
        it('[A][B][C][D] when columns = 1', () => {
            expect(getPaletteRows(options, 1)).toEqual([[A], [B], [C], [D]]);
        });
        it('[[AB][CD]] when columns = 2', () => {
            expect(getPaletteRows(options, 2)).toEqual([
                [A, B],
                [C, D],
            ]);
        });
        it('[[ABC][D]] when columns = 3', () => {
            expect(getPaletteRows(options, 3)).toEqual([[A, B, C], [D]]);
        });
        it('[[ABCD]] when columns = 4', () => {
            expect(getPaletteRows(options, 4)).toEqual([[A, B, C, D]]);
        });
        it('error when columns <= 0', () => {
            let hasThrownError = false;
            try {
                getPaletteRows(options, 0);
            } catch {
                hasThrownError = true;
            }
            expect(hasThrownError).toEqual(true);
        });
        it('empty array when no options passed', () => {
            expect(getPaletteRows([], 1)).toEqual([]);
        });
    });
});
