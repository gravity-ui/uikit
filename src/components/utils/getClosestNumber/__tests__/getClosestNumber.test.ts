import {getClosestNumber} from '../getClosestNumber';

test('should find appropriate number', () => {
    expect(getClosestNumber(1, [1, 2, 3, 50])).toBe(1);
    expect(getClosestNumber(20, [1, 2, 15, 30, 50])).toBe(30);
});
