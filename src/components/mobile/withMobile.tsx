import React, {ContextType} from 'react';
import {Subtract} from 'utility-types';
import {MobileContext, MobileContextProps} from './MobileContext';

export interface WithMobileProps extends MobileContextProps {}

export function withMobile<T extends WithMobileProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Subtract<T, WithMobileProps>> {
    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    return class WithMobileComponent extends React.Component<Subtract<T, WithMobileProps>> {
        static displayName = `withMobile(${componentName})`;
        static contextType = MobileContext;
        context!: ContextType<typeof MobileContext>;

        render() {
            return (
                <WrappedComponent
                    {...(this.props as T)}
                    mobile={this.context.mobile}
                    platform={this.context.platform}
                    useHistory={this.context.useHistory}
                    useLocation={this.context.useLocation}
                    setMobile={this.context.setMobile}
                    setPlatform={this.context.setPlatform}
                />
            );
        }
    };
}
