import * as React from 'react';

import {Avatar} from '../Avatar';
import {block} from '../utils/cn';

import {COMPACT_SIZES, DEFAULT_SIZE, UserQa} from './constants';
import type {UserProps} from './types';

import './User.scss';

const b = block('user');

export const User = React.forwardRef<HTMLDivElement, UserProps>(
    (
        {
            avatar,
            name,
            description,
            size = DEFAULT_SIZE,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            className,
            style,
            qa,
        },
        ref,
    ) => {
        const showDescription = Boolean(description && !COMPACT_SIZES.has(size));

        const nameTitle = typeof name === 'string' ? name : undefined;
        const descriptionTitle = typeof description === 'string' ? description : undefined;

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
                        {React.isValidElement(avatar) ? (
                            avatar
                        ) : (
                            <Avatar {...avatar} size={size} title={avatar.title || nameTitle} />
                        )}
                    </div>
                ) : null}
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
    },
);

User.displayName = 'User';
