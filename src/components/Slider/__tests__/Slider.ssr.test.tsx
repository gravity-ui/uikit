/*
 * @jest-environment node
 */
import type * as RcSliderModule from 'rc-slider';

// The result is server markup, not a Testing Library render result.
/* eslint-disable testing-library/render-result-naming-convention */

describe('Slider: server rendering', () => {
    beforeEach(() => {
        // The shared Jest setup imports UIKit before the test can mock rc-slider.
        jest.resetModules();
    });

    afterEach(() => {
        jest.dontMock('rc-slider');
    });

    test.each([
        {name: 'the CommonJS exports object', wrapModule: true},
        {name: 'the component', wrapModule: false},
    ])('renders when the default import of rc-slider is $name', async ({wrapModule}) => {
        if (wrapModule) {
            // Strict ESM consumers receive module.exports as the CommonJS default import.
            jest.doMock('rc-slider', () => ({
                __esModule: true,
                default: jest.requireActual<typeof RcSliderModule>('rc-slider'),
            }));
        }

        const {renderToString} = await import('react-dom/server');
        const {Provider} = await import('../../theme/Provider');
        const {Slider} = await import('../Slider');

        const html = renderToString(
            <Provider theme="light">
                <Slider min={0} max={1} value={0} marks={0} tooltipDisplay="off" />
            </Provider>,
        );

        expect(html).toContain('role="slider"');
        expect(html).toContain('aria-valuemin="0"');
        expect(html).toContain('aria-valuemax="1"');
        expect(html).toContain('aria-valuenow="0"');
    });
});
