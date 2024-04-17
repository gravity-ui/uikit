const didWarn = new Map<string, boolean>();

export function warnOnce(msg: string) {
    if (!msg || didWarn.has(msg) || process.env.NODE_ENV === 'production') {
        return;
    }

    // eslint-disable-next-line no-console
    console.error(msg);
    didWarn.set(msg, true);
}
