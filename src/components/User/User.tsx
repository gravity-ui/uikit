import React from 'react';

import {Avatar} from '../Avatar';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {COMPACT_SIZES, DEFAULT_SIZE, UserQa} from './constants';
import type {UserProps} from './types';

import './User.scss';

const b = block('user');

export const User = React.forwardRef<HTMLDivElement, UserProps>(
    (
        {avatar, name, description, size = DEFAULT_SIZE, className, style, qa, ...otherProps},
        ref,
    ) => {
        const showDescription = Boolean(description && !COMPACT_SIZES.has(size));

        const nameTitle = typeof name === 'string' ? name : undefined;
        const descriptionTitle = typeof description === 'string' ? description : undefined;

        return (
            <div
                {...filterDOMProps(otherProps, {labelable: true})}
                className={b({size}, className)}
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
