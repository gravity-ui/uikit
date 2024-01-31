import React from 'react';

import {Envelope, Xmark} from '@gravity-ui/icons';

import {Avatar} from '../Avatar';
import type {AvatarProps} from '../Avatar';
import {Icon} from '../Icon';
import {block} from '../utils/cn';

import i18n from './i18n';
import type {UserLabelProps} from './types';

import './UserLabel.scss';

const COMMON_AVATAR_PROPS: Partial<AvatarProps> = {
    size: 's',
};

const b = block('user-label');

export const UserLabel = React.forwardRef<HTMLDivElement, UserLabelProps>(
    (
        {
            type = 'person',
            avatar,
            children,
            view = 'outlined',
            onClick,
            onClose,
            className,
            style,
            qa,
        },
        ref,
    ) => {
        const clickable = Boolean(onClick);
        const closeable = Boolean(onClose);
        const MainComponent = clickable ? 'button' : 'div';

        let avatarView: React.ReactNode = null;

        switch (type) {
            case 'email':
                avatarView = <Avatar icon={Envelope} {...COMMON_AVATAR_PROPS} />;
                break;
            case 'empty':
                avatarView = null;
                break;
            case 'person':
            default:
                if (!avatar && typeof children === 'string') {
                    avatarView = <Avatar text={children} {...COMMON_AVATAR_PROPS} />;
                } else if (typeof avatar === 'string') {
                    avatarView = <Avatar imgUrl={avatar} {...COMMON_AVATAR_PROPS} />;
                } else if (React.isValidElement(avatar)) {
                    avatarView = avatar;
                } else if (avatar) {
                    avatarView = <Avatar {...avatar} {...COMMON_AVATAR_PROPS} />;
                }
                break;
        }

        return (
            <div
                className={b(
                    {
                        view,
                        empty: !avatarView,
                        clickable,
                        closeable,
                    },
                    className,
                )}
                style={style}
                data-qa={qa}
                ref={ref}
            >
                <MainComponent
                    className={b('main')}
                    type={clickable ? 'button' : undefined}
                    onClick={onClick}
                >
                    {avatarView ? <div className={b('avatar')}>{avatarView}</div> : null}
                    <div className={b('text')}>{children}</div>
                </MainComponent>
                {onClose ? (
                    <button
                        className={b('close')}
                        type="button"
                        aria-label={i18n('label_remove-button')}
                        onClick={onClose}
                    >
                        <Icon className={b('close-icon')} data={Xmark} size={12} />
                    </button>
                ) : null}
            </div>
        );
    },
);

UserLabel.displayName = 'UserLabel';
