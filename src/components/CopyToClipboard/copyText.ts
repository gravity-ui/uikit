export async function copyText(text: string) {
    if (navigator?.clipboard?.writeText) {
        return navigator.clipboard.writeText(text);
    }

    if (document) {
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
    const input = document.createElement('input');
    // Make invisible for screen readers
    input.ariaHidden = 'true';
    // Reset possible styles for input
    input.style.all = 'unset';
    input.style.position = 'absolute';
    input.style.left = '1000%';
    // Preserve spaces and line breaks
    input.style.whiteSpace = 'pre';
    // Do not inherit user-select (it may be `none`)
    input.style.userSelect = 'text';
    input.value = text;
    document.body.append(input);

    // Select text without focusing input
    input.setSelectionRange(0, input.value.length);
    const success = document.execCommand('copy');
    document.body.removeChild(input);

    return success;
}
