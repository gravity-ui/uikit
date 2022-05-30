import React from 'react';
import {block} from '../../utils/cn';
import {Alarm, Info, Success} from '../../icons';
import {useMobile} from '../../mobile';
import {Toaster, ToastProps} from '..';
import {Icon} from '../../Icon';
import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';

import './ToasterShowcase.scss';

const b = block('toaster-story');

const CONTENT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, atque!';

const ACTIONS = [
    {
        label: 'Action 1',
        onClick: () => console.log('from actions 1'),
    },
    {
        label: 'Action 2',
        onClick: () => console.log('from actions 2'),
    },
];

interface ToasterDemoProps {
    mobile: boolean;
}

interface ToasterDemoState {
    createSameName: boolean;
    showCloseIcon: boolean;
    setTimeout: boolean;
    timeout: number;
    allowAutoHiding: boolean;
    setContent: boolean;
    setActions: boolean;
    lastToastName: string;
}

class Demo extends React.PureComponent<ToasterDemoProps, ToasterDemoState> {
    toaster = new Toaster({mobile: this.props.mobile});

    state: ToasterDemoState = {
        createSameName: false,
        showCloseIcon: true,
        setTimeout: false,
        timeout: 3000,
        allowAutoHiding: true,
        setContent: false,
        setActions: false,
        lastToastName: '',
    };

    componentDidUpdate(prevProps: ToasterDemoProps) {
        if (prevProps.mobile !== this.props.mobile) {
            this.toaster = new Toaster({mobile: this.props.mobile});
        }
    }

    render() {
        const {
            lastToastName,
            createSameName,
            showCloseIcon,
            setTimeout,
            allowAutoHiding,
            setContent,
            setActions,
        } = this.state;

        const btnStyle = {marginLeft: 20};
        const timeoutContainerStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 250,
        };
        const checkboxesContainerStyle = {margin: 20};

        const namesCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({createSameName: !createSameName})}
                checked={createSameName}
                content="Same names"
            />
        );

        const closeIconCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({showCloseIcon: !showCloseIcon})}
                checked={showCloseIcon}
                content="Show close icon"
            />
        );

        const timeoutCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({setTimeout: !setTimeout})}
                checked={setTimeout}
                content="Set custom timeout"
            />
        );

        const autoHidingCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({allowAutoHiding: !allowAutoHiding})}
                checked={allowAutoHiding}
                content="Allow auto hiding"
            />
        );

        const contentCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({setContent: !setContent})}
                checked={setContent}
                content="Add content"
            />
        );

        const actionsCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({setActions: !setActions})}
                checked={setActions}
                content="Add action"
            />
        );

        const defaultToastBtn = (
            <Button view="outlined" size="l" onClick={this.createDefaultToast} style={btnStyle}>
                Create default toast
            </Button>
        );

        const infoToastBtn = (
            <Button view="outlined" size="l" onClick={this.createInfoToast} style={btnStyle}>
                <Icon className={b('icon', {info: true})} data={Info} />
                Create info toast
            </Button>
        );

        const successToastBtn = (
            <Button view="outlined" size="l" onClick={this.createSuccessToast} style={btnStyle}>
                <Icon className={b('icon', {success: true})} data={Success} />
                Create success toast
            </Button>
        );

        const warningToastBtn = (
            <Button view="outlined" size="l" onClick={this.createWarningToast} style={btnStyle}>
                <Icon className={b('icon', {warning: true})} data={Alarm} />
                Create warning toast
            </Button>
        );

        const errorToastBtn = (
            <Button view="outlined" size="l" onClick={this.createErrorToast} style={btnStyle}>
                <Icon className={b('icon', {error: true})} data={Alarm} />
                Create error toast
            </Button>
        );

        const customToastBtn = (
            <Button view="outlined" size="l" onClick={this.createCustomToast} style={btnStyle}>
                Create custom toast
            </Button>
        );

        const overrideToastBtn = (
            <Button
                size="l"
                onClick={this.overrideLastToast}
                disabled={!lastToastName}
                style={btnStyle}
            >
                Override last toast
            </Button>
        );

        const clearBtn = (
            <Button view="outlined-danger" size="l" onClick={this.removeAllToasts} style={btnStyle}>
                Remove all toasts
            </Button>
        );

        return (
            <div>
                <div style={checkboxesContainerStyle}>
                    <p>{namesCheckbox}</p>
                    <p>{closeIconCheckbox}</p>
                    <p style={timeoutContainerStyle}>{timeoutCheckbox}</p>
                    <p>{autoHidingCheckbox}</p>
                    <p>{contentCheckbox}</p>
                    <p>{actionsCheckbox}</p>
                </div>
                <p>{defaultToastBtn}</p>
                <p>{infoToastBtn}</p>
                <p>{successToastBtn}</p>
                <p>{warningToastBtn}</p>
                <p>{errorToastBtn}</p>
                <p>{customToastBtn}</p>
                <p>{overrideToastBtn}</p>
                <p>{clearBtn}</p>
            </div>
        );
    }

    private getToastName(type: string) {
        const {createSameName} = this.state;

        if (createSameName) {
            return type;
        }

        return `${type}${Math.floor(Math.random() * 100000)}`;
    }

    private getToastProps(extra: {
        name: string;
        title?: string;
        type?: ToastProps['type'];
        className?: string;
        content?: React.ReactNode;
    }): ToastProps {
        const {showCloseIcon, setTimeout, timeout, allowAutoHiding, setContent, setActions} =
            this.state;

        let content: React.ReactNode = null;

        if (extra.content) {
            content = extra.content;
        } else if (setContent) {
            content = CONTENT;
        }

        return {
            content,
            name: this.getToastName(extra.name),
            className: extra.className,
            title: extra.title,
            type: extra.type,
            isClosable: showCloseIcon,
            timeout: setTimeout ? Number(timeout) : undefined,
            allowAutoHiding: allowAutoHiding,
            actions: setActions ? ACTIONS : undefined,
        };
    }

    private createDefaultToast = () => {
        const toastProps = this.getToastProps({
            name: 'default',
            title: 'Default toast',
        });

        this.toaster.createToast(toastProps);

        this.setState({lastToastName: toastProps.name});
    };

    private createInfoToast = () => {
        const toastProps = this.getToastProps({
            name: 'info',
            type: 'info',
            title: 'Info toast',
        });

        this.toaster.createToast(toastProps);

        this.setState({lastToastName: toastProps.name});
    };

    private createSuccessToast = () => {
        const toastProps = this.getToastProps({
            name: 'success',
            type: 'success',
            title: 'Success toast',
        });

        this.toaster.createToast(toastProps);

        this.setState({lastToastName: toastProps.name});
    };

    private createWarningToast = () => {
        const toastProps = this.getToastProps({
            name: 'warning',
            type: 'warning',
            title: 'Warning toast',
        });

        this.toaster.createToast(toastProps);

        this.setState({lastToastName: toastProps.name});
    };

    private createErrorToast = () => {
        const toastProps = this.getToastProps({
            name: 'error',
            type: 'error',
            title: 'Error toast',
        });

        this.toaster.createToast(toastProps);

        this.setState({lastToastName: toastProps.name});
    };

    private createCustomToast = () => {
        const content = (
            <div style={{display: 'flex'}}>
                <div style={{maxWidth: '86px', maxHeight: '86px', marginRight: '16px'}}>
                    <Icon size={86} data={Success} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minWidth: '320px',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '280px',
                            marginBottom: '8px',
                            fontWeight: 500,
                            fontSize: '17px',
                            lineHeight: '24px',
                        }}
                    >
                        Keep track of alerts in Yandex Cloud mobile app
                    </div>
                    <div style={{color: 'rgba(0, 0, 0, 0.7)'}}>
                        Try to view alerts in mobile app.
                    </div>
                    <div style={{color: 'rgba(0, 0, 0, 0.7)'}}>
                        You may set up push-notifications to prevent missing.
                    </div>
                    <div style={{marginTop: '16px', color: 'rgba(0, 0, 0, 0.3)'}}>
                        Point the camera at the QR-code.
                    </div>
                </div>
            </div>
        );

        const toastProps = this.getToastProps({
            content,
            name: 'custom',
            className: b('mobile-promotion'),
        });

        this.toaster.createToast(toastProps);

        this.setState({lastToastName: toastProps.name});
    };

    private overrideLastToast = () => {
        const {lastToastName} = this.state;

        this.toaster.overrideToast(lastToastName, {
            title: 'Here is information not about payments at all...',
            actions: [
                {
                    label: 'Action 1',
                    onClick: () => console.log('from actions 1'),
                },
            ],
            content: (
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, neque.</p>
            ),
        });
    };

    private removeAllToasts = () => {
        this.toaster._toasts = [];
        this.toaster._render();
        this.setState({lastToastName: ''});
    };
}

export const ToasterDemo = () => {
    const [mobile] = useMobile();
    return <Demo mobile={mobile} />;
};
