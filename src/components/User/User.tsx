import React from 'react';
import {block} from '../utils/cn';
import {UserAvatar} from '../UserAvatar';
import './User.scss';

const b = block('user');

export interface UserProps {
    name?: string;
    description?: string;
    imgUrl?: string;
    className?: string;
}

export function User({name, description, imgUrl, className}: UserProps) {
    return (
        <div className={b(null, className)}>
            {imgUrl && <UserAvatar imgUrl={imgUrl} size="m" className={b('avatar')} />}
            {(name || description) && (
                <div className={b('info')}>
                    {name && <span className={b('name')}>{name}</span>}
                    {description && <span className={b('description')}>{description}</span>}
                </div>
            )}
        </div>
    );
}
