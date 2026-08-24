const didWarn = new Map<string, boolean>();

export function warnOnce(msg: string) {
    if (process.env.NODE_ENV !== 'production') {
        if (!msg || didWarn.has(msg)) {
            return;
        }

        console.error(msg);
        didWarn.set(msg, true);
    }
}
