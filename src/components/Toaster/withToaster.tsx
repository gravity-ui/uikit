import type * as React from 'react';

import {getComponentName} from '../utils/getComponentName';

import {useToaster} from './hooks/useToaster';

export function withToaster<T>() {
    return function (WrappedComponent: React.ComponentType<T>) {
        function WithToaster(props: T) {
            const toaster = useToaster();

            return <WrappedComponent {...props} toaster={toaster} />;
        }

        WithToaster.displayName = `WithToaster(${getComponentName(WrappedComponent)})`;

        return WithToaster;
    };
}
