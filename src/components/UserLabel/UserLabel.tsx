import * as React from 'react';

import {Envelope, Xmark} from '@gravity-ui/icons';

import {Avatar} from '../Avatar';
import type {AvatarProps} from '../Avatar';
import {Icon} from '../Icon';
import {block} from '../utils/cn';

import {BORDER_COLOR, COMPACT_SIZES, DEFAULT_USER_LABEL_SIZE, ICON_SIZES} from './constants';
import i18n from './i18n';
import type {UserLabelProps} from './types';

import './UserLabel.scss';

const b = block('user-label');

export const UserLabel = React.forwardRef<HTMLDivElement, UserLabelProps>(
    (
        {
            type = 'person',
            view = 'outlined',
            size = DEFAULT_USER_LABEL_SIZE,
            avatar,
            text,
            description,
            onClick,
            onCloseClick,
            className,
            style,
            qa,
        },
        ref,
    ) => {
        const clickable = Boolean(onClick);
        const closeable = Boolean(onCloseClick);

        const MainComponent = clickable ? 'button' : 'div';

        let avatarView: React.ReactNode = null;
        let avatarProps: AvatarProps | undefined;

        if (typeof avatar === 'string') {
            avatarProps = {imgUrl: avatar};
        } else if (avatar && !React.isValidElement(avatar)) {
            if (
                ('imgUrl' in avatar && avatar.imgUrl) ||
                ('icon' in avatar && avatar.icon) ||
                ('text' in avatar && avatar.text)
            ) {
                avatarProps = avatar as AvatarProps;
            } else if (typeof text === 'string') {
                avatarProps = {text, borderColor: BORDER_COLOR, ...avatar};
            }
        } else if (!avatar && typeof text === 'string') {
            avatarProps = {text, borderColor: BORDER_COLOR};
        }

        switch (type) {
            case 'email':
                avatarView = <Avatar icon={Envelope} {...avatarProps} size={size} />;
                break;
            case 'empty':
                avatarView = null;
                break;
            case 'person':
            default:
                if (React.isValidElement(avatar)) {
                    avatarView = avatar;
                } else if (avatarProps) {
                    avatarView = <Avatar {...avatarProps} size={size} />;
                }
                break;
        }

        const showDescription = Boolean(description && !COMPACT_SIZES.has(size));

        const {t} = i18n.useTranslation();

        return (
            <div
                className={b(
                    {
                        view,
                        size,
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
                    <div className={b('info')}>
                        <span className={b('text')}>{text}</span>
                        {showDescription ? (
                            <span className={b('description')}>{description}</span>
                        ) : null}
                    </div>
                </MainComponent>
                {onCloseClick ? (
                    <button
                        className={b('close')}
                        type="button"
                        aria-label={t('label_remove-button')}
                        onClick={onCloseClick}
                    >
                        <Icon className={b('close-icon')} data={Xmark} size={ICON_SIZES[size]} />
                    </button>
                ) : null}
            </div>
        );
    },
);

UserLabel.displayName = 'UserLabel';
