export function copyText(text: string) {
    if (navigator?.clipboard?.writeText) {
        return navigator.clipboard.writeText(text);
    }

    if (typeof document !== 'undefined') {
        const success = copyTextFallback(text);

        if (success) {
            return Promise.resolve();
        } else {
            return Promise.reject(
                new Error('Failed to copy text with document.execCommand("copy")'),
            );
        }
    }

    return Promise.reject(new Error('Neither navigator.clipboard nor document is available'));
}

function copyTextFallback(text: string) {
    const activeElement = document.activeElement as HTMLElement;
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
    document.body.removeChild(textarea);
    // Restore focus to the previously focused element
    activeElement?.focus();

    return success;
}
