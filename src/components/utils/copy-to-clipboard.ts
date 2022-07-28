export async function copyToClipboard(text: string) {
    if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        return;
    }

    // fallback for old browsers
    const textarea = document.createElement('textarea');
    textarea.setAttribute('style', 'position: absolute; left: 1000%');
    textarea.textContent = text;
    document.body.append(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
}
