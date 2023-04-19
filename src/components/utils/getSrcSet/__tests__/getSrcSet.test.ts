import {getSrcSet} from '../getSrcSet';

test('should concatenate `srcSet`', () => {
    expect(getSrcSet([['url', '1x'], ['url2', '2x'], 'url3'])).toBe('url 1x, url2 2x, url3');
});

// Test function typings:

// @ts-expect-error
getSrcSet([['url', '1x'], ['url2', '2w'], 'url3']);
