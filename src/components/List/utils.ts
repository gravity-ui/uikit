export function getElementId(id?: string, activeItem?: number) {
    if (typeof id !== 'string' || typeof activeItem !== 'number') {
        return undefined;
    }

    return `${id}-item-${activeItem}`;
}
