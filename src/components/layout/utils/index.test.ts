import {getClosestMediaPropsFactory, isMediaActiveFactory} from './index';

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
        expect(getClosestMediaPropsFactory('xxxl')({s: 's'})).toEqual('s');
        expect(getClosestMediaPropsFactory('xxxl')()).toEqual(undefined);
        expect(getClosestMediaPropsFactory('xxxl')({xxxl: 'xxxl'})).toEqual('xxxl');
    });
});

describe('isMediaActiveFactory', () => {
    test('should detect mobile-first medias', () => {
        expect(isMediaActiveFactory('l')('l')).toBeTruthy();
        expect(isMediaActiveFactory('l')('m')).toBeTruthy();
    });
    test('should detect wrong queries', () => {
        expect(isMediaActiveFactory('s')('m')).toBeFalsy();
        expect(isMediaActiveFactory('s')('l')).toBeFalsy();
    });
});
