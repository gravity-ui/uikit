export function getComponentName<T>(Component: React.ComponentType<T>) {
    return Component.displayName || Component.name || 'Component';
}
