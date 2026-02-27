export function getElementId(id?: string, activeItem?: number) {
    if (id === null || activeItem === null) {
        return undefined;
    }

    return `${id}-item-${activeItem}`;
}
