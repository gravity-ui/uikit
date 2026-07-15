import * as React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../Button';
import {Card} from '../Card';
import {Icon} from '../Icon';
import {colorText} from '../Text';
import {useDefaultProps} from '../theme/useDefaultProps';

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

export const Alert = (rawProps: AlertProps) => {
    const props = useDefaultProps('Alert', rawProps);
    const {
        theme = 'normal',
        view = 'filled',
        size = 'm',
        layout = 'vertical',
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
    };

    const {t} = i18n.useTranslation();

    const content = (
        <React.Fragment>
            {typeof props.icon === 'undefined' ? (
                <Alert.Icon
                    theme={theme}
                    view={view}
                    align={align}
                    size={alertSizeToIconSize(size)}
                />
            ) : (
                props.icon && ( // ability to pass `null` as `icon` prop value
                    <div className={bAlert('icon-wrapper', {align})}>{props.icon}</div>
                )
            )}
            <div className={bAlert('main', {layout})}>
                <div>
                    {typeof props.title === 'string' ? (
                        <Alert.Title text={props.title} />
                    ) : (
                        props.title
                    )}
                    {message ? (
                        <div
                            className={bAlert('message', {'with-top-margin': Boolean(props.title)})}
                        >
                            {message}
                        </div>
                    ) : null}
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
                    aria-label={t('label_close')}
                    size={size}
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
                <div {...commonProps} data-qa={qa}>
                    {content}
                </div>
            ) : (
                <Card {...commonProps} qa={qa} theme={theme} view={view}>
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
