import {sp, SpacingProps} from './spacing';

describe('spacing utility', () => {
    test.each<[SpacingProps, string]>([
        [{mr: 1, px: '0.5'}, 'yc-s__mr_1 yc-s__px_half'],
        [{mr: '2'}, 'yc-s__mr_2'],
        [{mr: 0, py: 0.5, p: 2}, 'yc-s__mr_0 yc-s__py_half yc-s__p_2'],
    ])('should return expected results than called with %s', (args, result) => {
        expect(sp(args)).toEqual(result);
    });
});
