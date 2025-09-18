import * as React from 'react';

import {getComponentName} from '../utils/getComponentName';

import {MobileContext} from './MobileContext';
import type {MobileContextProps} from './MobileContext';

export type WithPlatformProps = {platform: MobileContextProps['platform']};

export function withPlatform<T extends WithPlatformProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Omit<T, keyof WithPlatformProps>> {
    const componentName = getComponentName(WrappedComponent);

    return class WithPlatformComponent extends React.Component<Omit<T, keyof WithPlatformProps>> {
        static displayName = `withPlatform(${componentName})`;
        static contextType = MobileContext;
        declare context: React.ContextType<typeof MobileContext>;

        render() {
            return <WrappedComponent {...(this.props as T)} platform={this.context.platform} />;
        }
    };
}
