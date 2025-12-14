/**
 * Copies text to the browser's clipboard.
 * Uses the modern `navigator.clipboard` API, with a fallback to `document.execCommand` when unavailable.
 *
 * @param {string} text Text to copy to the clipboard
 * @returns {Promise<void>} Promise that resolves on successful copy or rejects on error
 * @throws {Error} Throws an error if neither `navigator.clipboard` nor `document` is available
 *
 * @example
 * ```typescript
 * // Copy simple text
 * copyText('Hello, World!')
 *   .then(() => console.log('Text copied'))
 *   .catch(error => console.error('Copy error:', error));
 *
 * // Using with async/await
 * try {
 *   await copyText('Text to copy');
 *   console.log('Successfully copied');
 * } catch (error) {
 *   console.error('Failed to copy:', error);
 * }
 * ```
 */
export function copyText(text: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        try {
            return navigator.clipboard.writeText(text);
        } catch (error) {
            return typeof document === 'undefined' ? Promise.reject(error) : copyTextFallback(text);
        }
    }

    if (typeof document !== 'undefined') {
        return copyTextFallback(text);
    }

    return Promise.reject(new Error('Neither navigator.clipboard nor document is available'));
}

async function copyTextFallback(text: string) {
    const activeElement = document.activeElement;

    try {
        const textarea = document.createElement('textarea');
        // Make invisible for screen readers
        textarea.setAttribute('aria-hidden', 'true');
        // Reset possible styles for textarea
        textarea.style.all = 'unset';
        textarea.style.position = 'absolute';
        textarea.style.left = '1000%';
        // Preserve spaces and line breaks
        textarea.style.whiteSpace = 'pre';
        // Do not inherit user-select (it may be `none`)
        textarea.style.userSelect = 'text';
        textarea.value = text;
        document.body.append(textarea);
        textarea.select();
        const success = document.execCommand('copy');

        if (!success) {
            throw new Error('Failed to copy text with document.execCommand("copy")');
        }

        document.body.removeChild(textarea);
    } finally {
        // Restore focus to the previously focused element
        if (
            activeElement &&
            'focus' in activeElement &&
            typeof activeElement.focus === 'function'
        ) {
            activeElement.focus();
        }
    }
}
