import type {MountFixture, PlaywrightFixture} from './types';

export const mountFixture: PlaywrightFixture<MountFixture> = async ({mount: baseMount}, use) => {
    const mount: MountFixture = async (component, options) => {
        return await baseMount(
            <div
                style={{
                    padding: 20,
                    // When we set width we didn't expect that paddings for better screenshots would be included
                    boxSizing: options?.width ? 'content-box' : undefined,
                    width: options?.width ? options.width : 'fit-content',
                    height: 'fit-content',
                    ...options?.rootStyle,
                }}
                className="playwright-wrapper-test"
            >
                {/* Do not scale buttons while clicking. Floating UI might position its elements differently in every test run. */}
                <style>{'.g-button, .g-button::after { transform: scale(1) !important; }'}</style>
                {component}
            </div>,
            options,
        );
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(mount);
};
