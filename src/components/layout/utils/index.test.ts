import type {Space} from '../types';

import {getClosestMediaPropsFactory, isMediaActiveFactory, makeCssMod} from './index';

describe('getClosestMediaPropsFactory', () => {
    test('should return predicted result if actual media query in props', () => {
        expect(getClosestMediaPropsFactory('l')({l: 'l', m: 'm', xl: 'xl'})).toEqual('l');
    });
    test('should return closest value if it has in props', () => {
        expect(getClosestMediaPropsFactory('l')({s: 's', m: 'm', xl: 'xl'})).toEqual('m');
    });
    test('should return `undefined` if no match', () => {
        expect(getClosestMediaPropsFactory('l')({xl: 'xl'})).toEqual(undefined);
    });
    test('should return `undefined` if no object passed', () => {
        expect(getClosestMediaPropsFactory('l')()).toEqual(undefined);
    });
    test('should return right value on age cases', () => {
        expect(getClosestMediaPropsFactory('3xl')({s: 's'})).toEqual('s');
        expect(getClosestMediaPropsFactory('3xl')()).toEqual(undefined);
        expect(getClosestMediaPropsFactory('3xl')({'3xl': '3xl'})).toEqual('3xl');
        expect(getClosestMediaPropsFactory('3xl')({'2xl': '2xl'})).toEqual('2xl');
    });
});

describe('isMediaActiveFactory', () => {
    test('should detect mobile-first medias', () => {
        expect(isMediaActiveFactory('l')('l')).toBeTruthy();
        expect(isMediaActiveFactory('l')('m')).toBeTruthy();
        expect(isMediaActiveFactory('3xl')('2xl')).toBeTruthy();
    });
    test('should detect wrong queries', () => {
        expect(isMediaActiveFactory('s')('m')).toBeFalsy();
        expect(isMediaActiveFactory('s')('l')).toBeFalsy();
        expect(isMediaActiveFactory('2xl')('3xl')).toBeFalsy();
    });
});

describe('makeCssMod', () => {
    test.each<[Space, string]>([
        ['0', '0'],
        [0, '0'],
        ['1', '1'],
        [0.5, 'half'],
        ['0.5', 'half'],
        [1, '1'],
        [10, '10'],
        ['10', '10'],
    ])('should return expected result if passed %s', (value, result) => {
        expect(makeCssMod(value)).toEqual(result);
    });
});
