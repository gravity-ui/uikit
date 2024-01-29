const didWarn = new Map<string, boolean>();

export function warnOnce(msg: string) {
    if (!msg || didWarn.has(msg)) {
        return;
    }

    // eslint-disable-next-line no-console
    console.error(msg);
    didWarn.set(msg, true);
}
