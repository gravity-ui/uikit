/*
 * @jest-environment node
 */
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';

const projectRoot = resolve(__dirname, '../../../..');

describe('Slider: server rendering of published builds', () => {
    beforeAll(() => {
        // Always rebuild so changes to the source cannot be hidden by stale artifacts.
        execFileSync('npm', ['run', 'build'], {
            cwd: projectRoot,
            stdio: 'inherit',
            timeout: 120_000,
        });
    }, 120_000);

    test.each([
        {format: 'ESM', load: "await import('@gravity-ui/uikit')"},
        {format: 'CommonJS', load: "require('@gravity-ui/uikit')"},
    ])('renders the $format build with an external CommonJS rc-slider', ({load}) => {
        // Jest transforms imports to CommonJS; a separate Node process preserves real interop.
        const html = execFileSync(
            process.execPath,
            [
                '--input-type=module',
                '--eval',
                `
                    import {createRequire, registerHooks} from 'node:module';
                    import {createElement} from 'react';
                    import {renderToString} from 'react-dom/server';

                    registerHooks({
                        load(url, context, nextLoad) {
                            if (url.endsWith('.css')) {
                                return {format: 'commonjs', source: '', shortCircuit: true};
                            }
                            if (url.endsWith('.json')) {
                                return nextLoad(url, {
                                    ...context,
                                    importAttributes: {type: 'json'},
                                });
                            }
                            return nextLoad(url, context);
                        },
                    });

                    const require = createRequire(import.meta.url);
                    const {Provider, Slider} = ${load};
                    const html = renderToString(
                        createElement(Provider, {theme: 'light'},
                            createElement(Slider, {
                                min: 0,
                                max: 1,
                                value: 0,
                                marks: 0,
                                tooltipDisplay: 'off',
                            }),
                        ),
                    );
                    process.stdout.write(html);
                `,
            ],
            {cwd: projectRoot, encoding: 'utf8', timeout: 10_000},
        );

        expect(html).toContain('role="slider"');
        expect(html).toContain('aria-valuemin="0"');
        expect(html).toContain('aria-valuemax="1"');
        expect(html).toContain('aria-valuenow="0"');
    });
});
