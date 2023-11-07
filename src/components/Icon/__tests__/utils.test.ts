import {prepareStringData} from '../utils';

describe('Icon utils', () => {
    it('should remove width and height only inside svg tag', () => {
        const data =
            '<svg width="100" viewBox="0 0 200 200" height=200>\n<rect x="50" y="50" width="100" height="100" fill="red" />\n</svg>';
        expect(prepareStringData(data)).toEqual(
            '<svg viewBox="0 0 200 200">\n<rect x="50" y="50" width="100" height="100" fill="red" />\n</svg>',
        );
    });
});
