import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../Button';
import {Card} from '../Card';
import {Icon} from '../Icon';
import {colorText} from '../Text';
import {Flex, spacing} from '../layout';

import {AlertActions} from './AlertActions';
import {AlertIcon} from './AlertIcon';
import {AlertTitle} from './AlertTitle';
import {DEFAULT_ICON_SIZE, bAlert} from './constants';
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
    } = props;

    const icon = props.icon || <Alert.Icon theme={theme} view={view} />;
    const title =
        typeof props.title === 'string' ? <Alert.Title text={props.title} /> : props.title;
    const actions = Array.isArray(props.actions) ? (
        <Alert.Actions items={props.actions} parentLayout={layout} />
    ) : (
        props.actions
    );

    return (
        <Card
            style={style}
            className={bAlert({corners}, spacing({py: 4, px: 5}, className))}
            theme={theme}
            view={view}
        >
            <Flex gap="3" alignItems={align}>
                {icon}
                <Flex direction={layout === 'vertical' ? 'column' : 'row'} gap="5" grow>
                    <Flex gap="2" grow className={bAlert('text-content')}>
                        <Flex direction="column" gap="1" grow justifyContent={align}>
                            {title}
                            {message}
                        </Flex>
                    </Flex>
                    {actions}
                </Flex>
                {onClose && (
                    <Button view="flat" onClick={onClose}>
                        <Icon
                            data={Xmark}
                            size={DEFAULT_ICON_SIZE}
                            className={colorText({color: 'secondary'})}
                        />
                    </Button>
                )}
            </Flex>
        </Card>
    );
};

Alert.Icon = AlertIcon;
Alert.Title = AlertTitle;
Alert.Actions = AlertActions;
