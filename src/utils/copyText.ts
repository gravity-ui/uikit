export function copyText(text: string) {
    if (navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }

    return Promise.reject(new Error('Native copy is not available'));
}
