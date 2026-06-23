import * as React from 'react';

import {filterDOMProps} from '../utils/filterDOMProps';

import {AvatarIcon} from './AvatarIcon';
import {AvatarImage} from './AvatarImage';
import {AvatarText} from './AvatarText';
import {DEFAULT_AVATAR_SIZE, bAvatar} from './constants';
import type {AvatarProps} from './types/main';

import './Avatar.scss';

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const {
        size = DEFAULT_AVATAR_SIZE,
        theme = 'normal',
        view = 'filled',
        shape = 'circle',
        backgroundColor,
        borderColor,
        title,
        className,
        style: styleProp,
        qa,
        children,
    } = props;

    const style = {backgroundColor, color: borderColor, ...styleProp};

    let content: React.ReactNode = null;

    if ('imgUrl' in props && props.imgUrl) {
        content = (
            <AvatarImage
                imgUrl={props.imgUrl}
                fallbackImgUrl={props.fallbackImgUrl}
                sizes={props.sizes}
                srcSet={props.srcSet}
                alt={props.alt || title}
                loading={props.loading}
                withImageBorder={props.withImageBorder}
                size={size}
            />
        );
    } else if ('icon' in props && props.icon) {
        content = <AvatarIcon icon={props.icon} color={props.color} size={size} />;
    } else if ('text' in props && props.text) {
        content = <AvatarText text={props.text} color={props.color} size={size} />;
    }

    return (
        <div
            className={bAvatar(
                {size, theme, view, shape, 'with-border': Boolean(borderColor)},
                className,
            )}
            title={title}
            role="img"
            style={style}
            data-qa={qa}
            ref={ref}
            {...filterDOMProps(props, {labelable: true})}
        >
            {content}
            {children}
        </div>
    );
});

Avatar.displayName = 'Avatar';
