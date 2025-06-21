import * as React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../Button';
import {Card} from '../Card';
import {Icon} from '../Icon';
import {colorText} from '../Text';

import {AlertAction} from './AlertAction';
import {AlertActions} from './AlertActions';
import {AlertContextProvider} from './AlertContextProvider';
import {AlertIcon} from './AlertIcon';
import {AlertTitle} from './AlertTitle';
import {DEFAULT_ICON_SIZE, bAlert} from './constants';
import i18n from './i18n';
import type {AlertProps, AlertSize} from './types';

function alertSizeToIconSize(alertSize: AlertSize): number {
    switch (alertSize) {
        case 's':
            return 16;
        case 'm':
            return 18;
        case 'l':
        default:
            return 22;
    }
}

export const Alert = (props: AlertProps) => {
    const {
        theme = 'normal',
        view = 'filled',
        size = 'm',
        layout = 'vertical',
        closeButttonSize = 'm',
        actionsLayout = layout === 'vertical' ? 'horizontal' : 'vertical',
        message,
        className,
        corners,
        style,
        onClose,
        align = 'baseline',
        qa,
    } = props;

    const commonProps = {
        style,
        className: bAlert({corners, size, align: align}, className),
        qa,
    };

    const content = (
        <React.Fragment>
            {typeof props.icon === 'undefined' ? (
                <Alert.Icon theme={theme} view={view} size={alertSizeToIconSize(size)} />
            ) : (
                props.icon && ( // ability to pass `null` as `icon` prop value
                    <div className={bAlert('icon-wrapper')}>{props.icon}</div>
                )
            )}
            <div className={bAlert('main', {layout})}>
                <div className={bAlert('text-content')}>
                    {typeof props.title === 'string' ? (
                        <Alert.Title text={props.title} />
                    ) : (
                        props.title
                    )}
                    <div className={bAlert('message')}>{message}</div>
                </div>
                {Array.isArray(props.actions) ? (
                    <Alert.Actions items={props.actions} />
                ) : (
                    props.actions
                )}
            </div>
            {onClose && (
                <Button
                    view="flat"
                    className={bAlert('close-btn')}
                    onClick={onClose}
                    aria-label={i18n('label_close')}
                    size={closeButttonSize}
                >
                    <Icon
                        data={Xmark}
                        size={DEFAULT_ICON_SIZE}
                        className={colorText({color: 'secondary'})}
                    />
                </Button>
            )}
        </React.Fragment>
    );

    return (
        <AlertContextProvider layout={layout} view={view} size={size} actionsLayout={actionsLayout}>
            {theme === 'clear' ? (
                <div {...commonProps}>{content}</div>
            ) : (
                <Card {...commonProps} theme={theme} view={view}>
                    {content}
                </Card>
            )}
        </AlertContextProvider>
    );
};

Alert.Icon = AlertIcon;
Alert.Title = AlertTitle;
Alert.Actions = AlertActions;
Alert.Action = AlertAction;
