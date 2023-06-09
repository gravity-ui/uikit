import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../Button';
import {Card} from '../Card';
import {Icon} from '../Icon';
import {Flex, spacing} from '../layout';

import {AlertActions} from './AlertActions';
import {AlertIcon} from './AlertIcon';
import {AlertTitle} from './AlertTitle';
import {DEFAULT_ICONS_SIZE, bAlert} from './constants';
import type {AlertProps} from './types';

export const Alert = ({
    icon,
    theme = 'normal',
    view = 'filled',
    layout = 'vertical',
    title,
    message,
    className,
    actions,
    squared,
    style,
    onClose,
    contentCenter,
}: AlertProps) => {
    const _icon = icon || <Alert.Icon type={theme} view={view} />;
    const _actions = Array.isArray(actions) ? (
        <Alert.Actions items={actions} parentLayout={layout} />
    ) : (
        actions
    );

    return (
        <Card
            style={style}
            className={bAlert({squared}, spacing({py: 4, px: 5}, className))}
            theme={theme}
            view={view}
        >
            <Flex gap="3" alignItems={contentCenter && 'center'}>
                {_icon}
                <Flex direction={layout === 'vertical' ? 'column' : 'row'} gap="5" grow>
                    <Flex gap="2" grow className={bAlert('text-content')}>
                        <Flex
                            direction="column"
                            gap="1"
                            grow
                            justifyContent={contentCenter && 'center'}
                        >
                            {typeof title === 'string' ? <Alert.Title text={title} /> : title}
                            {message}
                        </Flex>

                        {onClose && (
                            <Button view="flat" onClick={onClose}>
                                <Icon data={Xmark} size={DEFAULT_ICONS_SIZE} />
                            </Button>
                        )}
                    </Flex>
                    {_actions}
                </Flex>
            </Flex>
        </Card>
    );
};

Alert.Icon = AlertIcon;
Alert.Title = AlertTitle;
Alert.Actions = AlertActions;
