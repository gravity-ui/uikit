import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {CircleCheck, CircleInfo, Thunderbolt, TriangleExclamation} from '@gravity-ui/icons';

import {ToasterComponent, useToaster} from '..';
import type {ToastAction, ToastProps} from '..';
import {toaster as singletonToaster} from '../../../toaster-singleton';
import {Button} from '../../Button';
import type {ButtonView} from '../../Button';
import {Icon} from '../../Icon';
import {cn} from '../../utils/cn';

import './ToasterShowcase.scss';

const b = cn('toaster-showcase');

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
    setTitle: boolean;
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
    setTitle,
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
        theme?: ToastProps['theme'];
        className?: string;
        content?: React.ReactNode;
        actions?: ToastAction[];
    }): ToastProps {
        let content: React.ReactNode = null;
        let title;

        if (extra.content) {
            content = extra.content;
        } else if (setContent) {
            content = CONTENT;
        }

        if (extra.title && setTitle) {
            title = extra.title;
        }

        let timeout = allowAutoHiding ? 5000 : false;

        if (setTimeout) {
            timeout = customTimeout;
        }

        return {
            content,
            name: getToastName(extra.name),
            className: extra.className,
            title,
            theme: extra.theme,
            isClosable: showCloseIcon,
            autoHiding: timeout,
            actions: setActions
                ? ACTIONS.map((action, index) => ({
                      ...action,
                      view: index === 0 ? action1View : action2View,
                  }))
                : extra.actions,
        };
    }

    const createNormalToast = () => {
        const toastProps = getToastProps({
            name: 'normal',
            title: 'Normal toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createInfoToast = () => {
        const toastProps = getToastProps({
            name: 'info',
            theme: 'info',
            title: 'Info toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createSuccessToast = () => {
        const toastProps = getToastProps({
            name: 'success',
            theme: 'success',
            title: 'Success toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createWarningToast = () => {
        const toastProps = getToastProps({
            name: 'warning',
            theme: 'warning',
            title: 'Warning toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createDangerToast = () => {
        const toastProps = getToastProps({
            name: 'danger',
            theme: 'danger',
            title: 'Danger toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createUtilityToast = () => {
        const toastProps = getToastProps({
            name: 'utility',
            theme: 'utility',
            title: 'Utility toast',
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createCustomToast = () => {
        const content = (
            <div style={{display: 'flex'}}>
                <div style={{maxWidth: '86px', maxHeight: '86px', marginInlineEnd: '16px'}}>
                    <Icon size={86} data={CircleCheck} />
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
                        Keep track of alerts
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

    const createToastLongContent = () => {
        const toastProps = getToastProps({
            name: 'overflow',
            theme: 'danger',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            content:
                'Excepturi cumque dicta, et a repellat culpa totam minus vero, error ducimus nesciunt? Dicta soluta earum sapiente explicabo commodi pariatur nulla eius?',
            actions: [
                {
                    label: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    onClick: () => {
                        console.log('Lorem ipsum dolor sit amet consectetur adipisicing elit.');
                    },
                },
            ],
        });

        toaster.add(toastProps);

        setState((state) => ({...state, lastToastName: toastProps.name}));
    };

    const createDynamicallyUpdatingToast = () => {
        const toastProps = getToastProps({
            name: 'UpdatingToast',
            title: 'Updating Toast',
            content: faker.lorem.sentences(),
        });

        toaster.add(toastProps);
        setState((state) => ({...state, lastToastName: toastProps.name}));

        const updateInterval = 75;
        const update = () => {
            if (!toaster.has(toastProps.name)) {
                return;
            }

            const content = faker.lorem.sentences();
            toaster.update(toastProps.name, {content});
            window.setTimeout(update, updateInterval);
        };
        window.setTimeout(update, updateInterval);
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

    const btnStyle = {marginInlineStart: 20};

    const normalToastBtn = (
        <Button view="outlined" size="l" onClick={createNormalToast} style={btnStyle}>
            Create normal toast
        </Button>
    );

    const infoToastBtn = (
        <Button view="outlined" size="l" onClick={createInfoToast} style={btnStyle}>
            <Icon className={b('icon', {info: true})} data={CircleInfo} />
            Create info toast
        </Button>
    );

    const successToastBtn = (
        <Button view="outlined" size="l" onClick={createSuccessToast} style={btnStyle}>
            <Icon className={b('icon', {success: true})} data={CircleCheck} />
            Create success toast
        </Button>
    );

    const warningToastBtn = (
        <Button view="outlined" size="l" onClick={createWarningToast} style={btnStyle}>
            <Icon className={b('icon', {warning: true})} data={TriangleExclamation} />
            Create warning toast
        </Button>
    );

    const dangerToastBtn = (
        <Button view="outlined" size="l" onClick={createDangerToast} style={btnStyle}>
            <Icon className={b('icon', {danger: true})} data={TriangleExclamation} />
            Create danger toast
        </Button>
    );

    const utilityToastBtn = (
        <Button view="outlined" size="l" onClick={createUtilityToast} style={btnStyle}>
            <Icon className={b('icon', {utility: true})} data={Thunderbolt} />
            Create utility toast
        </Button>
    );

    const customToastBtn = (
        <Button view="outlined" size="l" onClick={createCustomToast} style={btnStyle}>
            Create custom toast
        </Button>
    );

    const toastWithLongContent = (
        <Button view="outlined" size="l" onClick={createToastLongContent} style={btnStyle}>
            Create toast with long content
        </Button>
    );

    const dynamicallyUpdatingToast = (
        <Button size="l" onClick={createDynamicallyUpdatingToast} style={btnStyle}>
            Create dynamically updating toast
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

    const singletonToasterBtn = (
        <Button
            size="l"
            onClick={() => {
                singletonToaster.add({
                    title: 'Singleton Toast',
                    content: 'I am separate toast, which can be added outside of react!',
                    name: 'uniqueName' + Math.random().toString(),
                });
            }}
            style={btnStyle}
        >
            Add toast via Toaster API
        </Button>
    );

    const component = React.useMemo(() => <ToasterComponent />, []);

    return (
        <React.Fragment>
            <p>{normalToastBtn}</p>
            <p>{infoToastBtn}</p>
            <p>{successToastBtn}</p>
            <p>{warningToastBtn}</p>
            <p>{dangerToastBtn}</p>
            <p>{utilityToastBtn}</p>
            <p>{customToastBtn}</p>
            <p>{toastWithLongContent}</p>
            <p>{dynamicallyUpdatingToast}</p>
            <p>{overrideToastBtn}</p>
            <p>{singletonToasterBtn}</p>
            <p>{clearBtn}</p>

            {component}
        </React.Fragment>
    );
};
