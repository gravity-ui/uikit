import * as React from 'react';

import {Avatar} from '../Avatar';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {COMPACT_SIZES, DEFAULT_USER_SIZE, UserQa} from './constants';
import type {UserProps} from './types';

import './User.scss';

const b = block('user');

export const User = React.forwardRef<HTMLDivElement, UserProps>((props, ref) => {
    const {avatar, name, description, size = DEFAULT_USER_SIZE, className, style, qa} = props;

    const nameTitle = typeof name === 'string' ? name : undefined;
    const descriptionTitle = typeof description === 'string' ? description : undefined;

    let avatarView: React.ReactNode = null;

    if (typeof avatar === 'string') {
        avatarView = <Avatar imgUrl={avatar} size={size} title={nameTitle} />;
    } else if (React.isValidElement(avatar)) {
        avatarView = avatar;
    } else if (avatar) {
        avatarView = <Avatar {...avatar} size={size} title={avatar.title || nameTitle} />;
    }

    const showDescription = Boolean(description && !COMPACT_SIZES.has(size));

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
                        <span className={b('name')} title={nameTitle} data-qa={UserQa.NAME}>
                            {name}
                        </span>
                    ) : null}
                    {showDescription ? (
                        <span
                            className={b('description')}
                            title={descriptionTitle}
                            data-qa={UserQa.DESCRIPTION}
                        >
                            {description}
                        </span>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
});

User.displayName = 'User';
