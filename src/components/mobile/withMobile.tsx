import * as React from 'react';

import {getComponentName} from '../utils/getComponentName';

import {MobileContext} from './MobileContext';
import type {MobileContextProps} from './MobileContext';

export interface WithMobileProps extends MobileContextProps {}

export function withMobile<T extends WithMobileProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Omit<T, keyof WithMobileProps>> {
    const componentName = getComponentName(WrappedComponent);

    return class WithMobileComponent extends React.Component<Omit<T, keyof WithMobileProps>> {
        static displayName = `withMobile(${componentName})`;
        static contextType = MobileContext;
        declare context: React.ContextType<typeof MobileContext>;

        render() {
            return (
                <WrappedComponent
                    {...(this.props as T)}
                    mobile={this.context.mobile}
                    platform={this.context.platform}
                    useHistory={this.context.useHistory}
                    useLocation={this.context.useLocation}
                />
            );
        }
    };
}
