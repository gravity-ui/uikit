import {Xmark} from '@gravity-ui/icons';

import {Button} from '../Button';
import {Card} from '../Card';
import {Icon} from '../Icon';
import {colorText} from '../Text';
import {Flex, spacing} from '../layout';

import {AlertAction} from './AlertAction';
import {AlertActions} from './AlertActions';
import {AlertContextProvider} from './AlertContextProvider';
import {AlertIcon} from './AlertIcon';
import {AlertTitle} from './AlertTitle';
import {DEFAULT_ICON_SIZE, bAlert} from './constants';
import i18n from './i18n';
import type {AlertProps} from './types';

export const Alert = (props: AlertProps) => {
    const {
        theme = 'normal',
        view = 'filled',
        layout = 'vertical',
        message,
        className,
        corners,
        style,
        onClose,
        align,
        qa,
    } = props;

    const commonProps = {
        style,
        className: bAlert({corners}, spacing({py: 4, px: 5}, className)),
        qa,
    };

    const {t} = i18n.useTranslation();

    const content = (
        <Flex gap="3" alignItems={align}>
            {typeof props.icon === 'undefined' ? (
                <Alert.Icon theme={theme} view={view} />
            ) : (
                props.icon // ability to pass `null` as `icon` prop value
            )}
            <Flex direction={layout === 'vertical' ? 'column' : 'row'} gap="5" grow>
                <Flex gap="2" grow className={bAlert('text-content')}>
                    <Flex direction="column" gap="1" grow justifyContent={align}>
                        {typeof props.title === 'string' ? (
                            <Alert.Title text={props.title} />
                        ) : (
                            props.title
                        )}
                        {message}
                    </Flex>
                </Flex>
                {Array.isArray(props.actions) ? (
                    <Alert.Actions items={props.actions} />
                ) : (
                    props.actions
                )}
            </Flex>
            {onClose && (
                <Button
                    view="flat"
                    className={bAlert('close-btn')}
                    onClick={onClose}
                    aria-label={t('label_close')}
                >
                    <Icon
                        data={Xmark}
                        size={DEFAULT_ICON_SIZE}
                        className={colorText({color: 'secondary'})}
                    />
                </Button>
            )}
        </Flex>
    );

    return (
        <AlertContextProvider layout={layout} view={view}>
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
