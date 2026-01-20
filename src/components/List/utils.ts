export function getElementId(id?: string, activeItem?: number) {
    if (!id || !activeItem) {
        return undefined;
    }

    return `${id}-item-${activeItem}`;
}
