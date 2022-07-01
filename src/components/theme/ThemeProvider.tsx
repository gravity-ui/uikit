import React, {PropsWithChildren} from 'react';

import {ThemeContext, ThemeContextProps} from './ThemeContext';
import {ThemeValueContext} from './ThemeValueContext';
import {DEFAULT_THEME} from './constants';
import {getDarkMediaMatch} from './getDarkMediaMatch';
import {getThemeValue} from './getThemeValue';
import {updateBodyClassName} from './updateBodyClassName';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: string;
}

type Props = PropsWithChildren<ThemeProviderExternalProps & ThemeProviderDefaultProps>;

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps> {}

interface ThemeProviderState extends ThemeContextProps {
    themeValue: string;
}

export class ThemeProvider extends React.Component<Props, ThemeProviderState> {
    state: ThemeProviderState = {
        theme: this.props.theme,
        themeValue: getThemeValue(this.props.theme),
        setTheme: (theme: string) => {
            this.setState({theme});
        },
    };

    componentDidMount() {
        if (typeof window === 'object') {
            this.mediaListener = (event) => {
                if (this.state.theme === 'system') {
                    const themeValue = event.matches ? 'dark' : 'light';
                    this.setState({themeValue}, () => updateBodyClassName(themeValue));
                }
            };
            getDarkMediaMatch().addListener(this.mediaListener);
        }

        updateBodyClassName(this.state.themeValue);
    }

    componentDidUpdate(prevProps: ThemeProviderProps, prevState: ThemeProviderState) {
        if (prevState.theme !== this.state.theme) {
            const themeValue = getThemeValue(this.state.theme);
            this.setState({themeValue});
            updateBodyClassName(themeValue);
        }

        if (prevProps.theme !== this.props.theme) {
            const themeValue = getThemeValue(this.props.theme);
            this.setState({theme: this.props.theme, themeValue});
            updateBodyClassName(themeValue);
        }
    }

    componentWillUnmount() {
        if (this.mediaListener) {
            getDarkMediaMatch().removeListener(this.mediaListener);
        }
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                <ThemeValueContext.Provider value={{themeValue: this.state.themeValue}}>
                    {this.props.children}
                </ThemeValueContext.Provider>
            </ThemeContext.Provider>
        );
    }
}
