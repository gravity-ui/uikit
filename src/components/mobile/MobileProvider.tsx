import React from 'react';
import {MobileContext, MobileContextProps, History, Location} from './MobileContext';
import {Platform} from './constants';
import {useHistory, useLocation} from 'react-router-dom';

interface MobileProviderExternalProps {}

interface MobileProviderDefaultProps {
    mobile: boolean;
    platform: Platform;
    useHistory: () => History;
    useLocation: () => Location;
}

interface MobileProviderState extends MobileContextProps {}

export interface MobileProviderProps
    extends MobileProviderExternalProps,
        Partial<MobileProviderDefaultProps> {}

export class MobileProvider extends React.Component<
    MobileProviderExternalProps & MobileProviderDefaultProps,
    MobileProviderState
> {
    static defaultProps: MobileProviderDefaultProps = {
        mobile: false,
        platform: Platform.BROWSER,
        useHistory,
        useLocation,
    };

    state: MobileProviderState = {
        mobile: this.props.mobile,
        platform: this.props.platform,
        useHistory: this.props.useHistory,
        useLocation: this.props.useLocation,
        setMobile: (mobile: boolean, platform = Platform.BROWSER) =>
            this.setState({mobile, platform}),
        setPlatform: (platform: Platform) => this.setState({platform}),
    };

    render() {
        return (
            <MobileContext.Provider value={this.state}>
                {this.props.children}
            </MobileContext.Provider>
        );
    }
}
