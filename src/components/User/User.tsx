import React from 'react';

import {Avatar} from '../Avatar';
import {block} from '../utils/cn';

import type {UserProps} from './types';

import './User.scss';

const b = block('user');

export const UserQa = {
    NAME: 'user-name',
    DESCRIPTION: 'user-description',
};
export const User = React.forwardRef<HTMLDivElement, UserProps>(
    (
        {
            avatar,
            name,
            description,
            size,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            className,
            style,
            qa,
        },
        ref,
    ) => {
        const showDescription = Boolean(size !== 'xs' && description);

        return (
            <div
                className={b({size}, className)}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                style={style}
                data-qa={qa}
                ref={ref}
            >
                {avatar ? (
                    <div className={b('avatar')}>
                        {React.isValidElement(avatar) ? avatar : <Avatar {...avatar} size={size} />}
                    </div>
                ) : null}
                {name || showDescription ? (
                    <div className={b('info')}>
                        {name ? (
                            <span data-qa={UserQa.NAME} className={b('name')}>
                                {name}
                            </span>
                        ) : null}
                        {showDescription ? (
                            <span data-qa={UserQa.DESCRIPTION} className={b('description')}>
                                {description}
                            </span>
                        ) : null}
                    </div>
                ) : null}
            </div>
        );
    },
);

User.displayName = 'User';
