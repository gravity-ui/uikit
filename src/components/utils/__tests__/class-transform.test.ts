import {formatClass, parseClass} from '../class-transform';
import type {ElementClass} from '../class-transform';

describe('class-transform', () => {
    function checkParseFormat(strClass: string, objClass: ElementClass) {
        expect(parseClass(strClass)).toEqual(objClass);
        expect(formatClass(objClass)).toEqual(strClass);
    }

    it('should parse and format block class', () => {
        checkParseFormat('block', {
            block: 'block',
        });
    });

    it('should parse and format block__element class', () => {
        checkParseFormat('block__element', {
            block: 'block',
            element: 'element',
        });
    });

    it('should parse and format block__element_mod class', () => {
        checkParseFormat('block__element_mod', {
            block: 'block',
            element: 'element',
            mod: {
                key: 'mod',
                value: true,
            },
        });
    });

    it('should parse and format block__element_mod_value class', () => {
        checkParseFormat('block__element_mod_value', {
            block: 'block',
            element: 'element',
            mod: {
                key: 'mod',
                value: 'value',
            },
        });
    });

    it('should parse and format block_mod class', () => {
        checkParseFormat('block_mod', {
            block: 'block',
            mod: {
                key: 'mod',
                value: true,
            },
        });
    });

    it('should parse and format block_mod_value class', () => {
        checkParseFormat('block_mod_value', {
            block: 'block',
            mod: {
                key: 'mod',
                value: 'value',
            },
        });
    });
});
