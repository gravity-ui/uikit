import React from 'react';

import {block} from '../utils/cn';

import {AvatarIcon} from './AvatarIcon';
import {AvatarImage} from './AvatarImage';
import {AvatarText} from './AvatarText';
import type {AvatarProps} from './types/main';

import './Avatar.scss';

const b = block('avatar');

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const {
        size = 'm',
        theme = 'normal',
        view = 'filled',
        backgroundColor,
        borderColor,
        title,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        className,
        style: styleProp,
        qa,
    } = props;

    const style = React.useMemo(
        () => ({backgroundColor, color: borderColor, ...styleProp}),
        [backgroundColor, borderColor, styleProp],
    );

    const renderContent = () => {
        if ('imgUrl' in props && props.imgUrl) {
            return (
                <AvatarImage
                    className={b('image')}
                    imgUrl={props.imgUrl}
                    fallbackImgUrl={props.fallbackImgUrl}
                    sizes={props.sizes}
                    srcSet={props.srcSet}
                    alt={props.alt || title}
                    loading={props.loading}
                    size={size}
                />
            );
        }

        if ('icon' in props && props.icon) {
            return (
                <AvatarIcon
                    className={b('icon')}
                    icon={props.icon}
                    color={props.color}
                    size={size}
                />
            );
        }

        if ('text' in props && props.text) {
            return (
                <AvatarText
                    className={b('text')}
                    text={props.text}
                    color={props.color}
                    size={size}
                />
            );
        }

        return null;
    };

    return (
        <div
            className={b({size, theme, view, 'with-border': Boolean(borderColor)}, className)}
            title={title}
            role="img"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            style={style}
            data-qa={qa}
            ref={ref}
        >
            {renderContent()}
        </div>
    );
});

Avatar.displayName = 'Avatar';
