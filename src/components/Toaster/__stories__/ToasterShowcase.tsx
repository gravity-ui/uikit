import React from 'react';
import {block} from '../../utils/cn';
import {Alarm, Info, Success} from '../../icons';
import {ToasterComponent, ToastProps, useToaster} from '..';
import {Icon} from '../../Icon';
import {Button, ButtonView} from '../../Button';

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

interface ToasterDemoState {
    lastToastName: string;
}

interface Props {
    createSameName: boolean;
    showCloseIcon: boolean;
    setTimeout: boolean;
    allowAutoHiding: boolean;
    setContent: boolean;
    setActions: boolean;
    action1View: ButtonView;
    action2View: ButtonView;
}

const customTimeout = 3000;

export const ToasterDemo = ({
    createSameName,
    showCloseIcon,
    setTimeout,
    allowAutoHiding,
    setContent,
    setActions,
    action1View,
    action2View,
}: Props) => {
    const toaster = useToaster();
    const [{lastToastName}, setState] = React.useState<ToasterDemoState>({
        lastToastName: '',
    });

    function getToastName(type: string) {
        if (createSameName) {
            return type;
        }

        return `${type}${Math.floor(Math.random() * 100000)}`;
    }

    function getToastProps(extra: {
        name: string;
        title?: string;
        type?: ToastProps['type'];
        className?: string;
        content?: React.ReactNode;
    }): ToastProps {
        let content: React.ReactNode = null;

        if (extra.content) {
            content = extra.content;
        } else if (setContent) {
            content = CONTENT;
        }

        let timeout = allowAutoHiding ? 5000 : false;

        if (setTimeout) {
            timeout = customTimeout;
        }

        return {
            content,
            name: getToastName(extra.name),
            className: extra.className,
            title: extra.title,
            type: extra.type,
            isClosable: showCloseIcon,
            autoHiding: timeout,
            actions: setActions
                ? ACTIONS.map((action, index) => ({
                      ...action,
                      view: index === 0 ? action1View : action2View,
                  }))
                : undefined,
        };
    }

    const createDefaultToast = () => {
        const toastProps = getToastProps({
            name: 'default',
            title: 'Default toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createInfoToast = () => {
        const toastProps = getToastProps({
            name: 'info',
            type: 'info',
            title: 'Info toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createSuccessToast = () => {
        const toastProps = getToastProps({
            name: 'success',
            type: 'success',
            title: 'Success toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createWarningToast = () => {
        const toastProps = getToastProps({
            name: 'warning',
            type: 'warning',
            title: 'Warning toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createErrorToast = () => {
        const toastProps = getToastProps({
            name: 'error',
            type: 'error',
            title: 'Error toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createCustomToast = () => {
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

        const toastProps = getToastProps({
            content,
            name: 'custom',
            className: b('mobile-promotion'),
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createFastUpdatableToast = () => {
        const toastProps = getToastProps({
            name: 'updatable',
            title: 'Updatable Toast',
        });

        toaster.add(toastProps);
        setState((state) => ({...state, lastToastName: toastProps.name}));

        let content = '';
        const updateInterval = 50;
        const update = (i: number) => {
            content += `This is another portion of updated data ${i}\n`;
            toaster.update(toastProps.name, {
                content: <div style={{whiteSpace: 'pre'}}>{content}</div>,
            });
            if (i < 10) {
                window.setTimeout(() => update(i + 1), updateInterval);
            }
        };
        window.setTimeout(() => update(0), updateInterval);
    };

    const overrideLastToast = () => {
        toaster.update(lastToastName, {
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

    const removeAllToasts = () => {
        toaster.removeAll();
        setState((state) => ({...state, lastToastName: ''}));
    };

    const btnStyle = {marginLeft: 20};

    const defaultToastBtn = (
        <Button view="outlined" size="l" onClick={createDefaultToast} style={btnStyle}>
            Create default toast
        </Button>
    );

    const infoToastBtn = (
        <Button view="outlined" size="l" onClick={createInfoToast} style={btnStyle}>
            <Icon className={b('icon', {info: true})} data={Info} />
            Create info toast
        </Button>
    );

    const successToastBtn = (
        <Button view="outlined" size="l" onClick={createSuccessToast} style={btnStyle}>
            <Icon className={b('icon', {success: true})} data={Success} />
            Create success toast
        </Button>
    );

    const warningToastBtn = (
        <Button view="outlined" size="l" onClick={createWarningToast} style={btnStyle}>
            <Icon className={b('icon', {warning: true})} data={Alarm} />
            Create warning toast
        </Button>
    );

    const errorToastBtn = (
        <Button view="outlined" size="l" onClick={createErrorToast} style={btnStyle}>
            <Icon className={b('icon', {error: true})} data={Alarm} />
            Create error toast
        </Button>
    );

    const customToastBtn = (
        <Button view="outlined" size="l" onClick={createCustomToast} style={btnStyle}>
            Create custom toast
        </Button>
    );

    const fastUpdatableToastBtn = (
        <Button size="l" onClick={createFastUpdatableToast} style={btnStyle}>
            Create fast updatable toast
        </Button>
    );

    const overrideToastBtn = (
        <Button size="l" onClick={overrideLastToast} disabled={!lastToastName} style={btnStyle}>
            Override last toast
        </Button>
    );

    const clearBtn = (
        <Button view="outlined-danger" size="l" onClick={removeAllToasts} style={btnStyle}>
            Remove all toasts
        </Button>
    );

    const component = React.useMemo(() => <ToasterComponent />, []);

    return (
        <>
            <p>{defaultToastBtn}</p>
            <p>{infoToastBtn}</p>
            <p>{successToastBtn}</p>
            <p>{warningToastBtn}</p>
            <p>{errorToastBtn}</p>
            <p>{customToastBtn}</p>
            <p>{fastUpdatableToastBtn}</p>
            <p>{overrideToastBtn}</p>
            <p>{clearBtn}</p>

            {component}
        </>
    );
};
