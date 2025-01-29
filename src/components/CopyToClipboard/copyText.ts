export function copyText(text: string) {
    if (navigator?.clipboard?.writeText) {
        try {
            return navigator.clipboard.writeText(text);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return Promise.reject(new Error('Native copy is not available'));
}
