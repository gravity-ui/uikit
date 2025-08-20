import {fireEvent, render, screen, waitFor} from '../../../../test-utils/utils';
import {CopyToClipboard} from '../CopyToClipboard';
import type {CopyToClipboardContent} from '../types';

describe('CopyToClipboard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: jest.fn().mockResolvedValue(undefined),
            },
            configurable: true,
        });
        Object.defineProperty(document, 'execCommand', {
            value: jest.fn().mockReturnValue(true),
            configurable: true,
        });
    });

    afterEach(() => {
        Object.defineProperty(navigator, 'clipboard', {
            value: undefined,
            configurable: true,
        });
        Object.defineProperty(document, 'execCommand', {
            value: undefined,
            configurable: true,
        });
    });

    test('content must be a valid react element', () => {
        const onCopy = jest.fn();
        expect(() =>
            render(
                <CopyToClipboard text="Text to copy" onCopy={onCopy}>
                    {(() => 123) as any as CopyToClipboardContent}
                </CopyToClipboard>,
            ),
        ).toThrow('Content must be a valid react element');
    });

    test('copies string text to clipboard', async () => {
        const onCopy = jest.fn();
        const text = 'Text to copy';
        render(
            <CopyToClipboard text={text} onCopy={onCopy}>
                <button>Copy</button>
            </CopyToClipboard>,
        );

        fireEvent.click(screen.getByText('Copy'));

        await waitFor(() => {
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
        });
        await waitFor(() => {
            expect(onCopy).toHaveBeenCalledWith(text, true);
        });
    });

    test('copies function text to clipboard', async () => {
        const onCopy = jest.fn();
        const text = 'Dynamic text';
        const getText = jest.fn().mockReturnValue(text);
        render(
            <CopyToClipboard text={getText} onCopy={onCopy}>
                <button>Copy</button>
            </CopyToClipboard>,
        );

        fireEvent.click(screen.getByText('Copy'));

        await waitFor(() => {
            expect(getText).toHaveBeenCalled();
        });
        await waitFor(() => {
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
        });
        await waitFor(() => {
            expect(onCopy).toHaveBeenCalledWith(text, true);
        });
    });

    test('handles navigator.clipboard.writeText failure', async () => {
        const onCopy = jest.fn();
        const error = new Error('Copy failed');
        (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(error);

        render(
            <CopyToClipboard text="text" onCopy={onCopy}>
                <button>Copy</button>
            </CopyToClipboard>,
        );

        fireEvent.click(screen.getByText('Copy'));

        await waitFor(() => {
            expect(onCopy).toHaveBeenCalledWith('text', false);
        });
    });

    test('should handle copy via fallback', async () => {
        const onCopy = jest.fn();
        Object.defineProperty(navigator, 'clipboard', {
            value: undefined,
            configurable: true,
        });

        render(
            <CopyToClipboard text="text" onCopy={onCopy}>
                <button>Copy</button>
            </CopyToClipboard>,
        );

        fireEvent.click(screen.getByText('Copy'));

        await waitFor(() => {
            expect(onCopy).toHaveBeenCalledWith('text', true);
        });
    });
});
