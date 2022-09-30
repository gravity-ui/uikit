export function setRef<T>(
    ref: React.MutableRefObject<T | null> | React.RefCallback<T | null> | null | undefined,
    value: T | null,
) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}
