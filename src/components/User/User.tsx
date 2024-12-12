import React from 'react';

import {Avatar} from '../Avatar';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {COMPACT_SIZES, DEFAULT_USER_SIZE} from './constants';
import type {UserProps} from './types';

import './User.scss';

const b = block('user');

export const UserQa = {
    NAME: 'user-name',
    DESCRIPTION: 'user-description',
};

export const User = React.forwardRef<HTMLDivElement, UserProps>((props, ref) => {
    const {avatar, name, description, size = DEFAULT_USER_SIZE, className, style, qa} = props;

    let avatarView: React.ReactNode = null;

    if (typeof avatar === 'string') {
        avatarView = <Avatar imgUrl={avatar} size={size} />;
    } else if (React.isValidElement(avatar)) {
        avatarView = avatar;
    } else if (avatar) {
        avatarView = <Avatar {...avatar} size={size} />;
    }

    const showDescription = Boolean(description && !COMPACT_SIZES.includes(size));

    return (
        <div
            className={b({size}, className)}
            style={style}
            data-qa={qa}
            ref={ref}
            {...filterDOMProps(props, {labelable: true})}
        >
            {avatarView ? <div className={b('avatar')}>{avatarView}</div> : null}
            {name || showDescription ? (
                <div className={b('info')}>
                    {name ? (
                        <span className={b('name')} data-qa={UserQa.NAME}>
                            {name}
                        </span>
                    ) : null}
                    {showDescription ? (
                        <span className={b('description')} data-qa={UserQa.DESCRIPTION}>
                            {description}
                        </span>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
});

User.displayName = 'User';
