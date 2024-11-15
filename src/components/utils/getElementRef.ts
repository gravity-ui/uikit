// Access the element's ref using a method that doesn't produce a warning.
export function getElementRef(element: React.ReactElement) {
    if (process.env.NODE_ENV !== 'production') {
        // Before React 19, there is an access check for ReactElement's props.ref in dev builds.
        const getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
        if (getter && 'isReactWarning' in getter && getter.isReactWarning) {
            return (element as any).ref;
        }
    }
    return element.props.ref ?? (element as any).ref;
}
