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
    const activeElement = document.activeElement as HTMLElement;

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
        document.execCommand('copy');
        document.body.removeChild(textarea);
    } catch {
        throw new Error('Failed to copy text with document.execCommand("copy")');
    } finally {
        // Restore focus to the previously focused element
        activeElement?.focus();
    }
}
