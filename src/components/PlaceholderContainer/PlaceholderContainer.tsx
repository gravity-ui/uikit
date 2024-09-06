import React from 'react';

import {Button} from '../Button';
import {block} from '../utils/cn';

import {componentClassName} from './constants';
import type {PlaceholderContainerActionProps, PlaceholderContainerProps} from './types';

import './PlaceholderContainer.scss';

const b = block(componentClassName);

const PlaceholderContainerAction = (props: PlaceholderContainerActionProps) => {
    return (
        <div className={b('action')}>
            <Button
                className={b('action-btn')}
                view={props.view || 'normal'}
                size={props.size || 'm'}
                loading={Boolean(props.loading)}
                disabled={Boolean(props.disabled)}
                href={props.href || ''}
                {...(props.onClick ? {onClick: props.onClick} : {})}
            >
                {props.text}
            </Button>
        </div>
    );
};

export const PlaceholderContainer = ({
    direction = 'row',
    align = 'center',
    size = 'l',
    className,
    title,
    description,
    image,
    content,
    actions,
}: PlaceholderContainerProps) => {
    const renderTitle = () => {
        if (!title) {
            return null;
        }

        return <div className={b('title')}>{title}</div>;
    };
    const renderDescription = () => {
        if (!description) {
            return null;
        }

        return <div className={b('description')}>{description}</div>;
    };

    const renderImage = (): NonNullable<React.ReactNode> => {
        if (typeof image === 'object' && 'src' in image) {
            return <img src={image.src} alt={image.alt || ''} />;
        }

        return image;
    };

    const renderAction = () => {
        if (!actions || !(React.isValidElement(actions) || Array.isArray(actions))) {
            return null;
        }

        if (React.isValidElement(actions)) {
            return <React.Fragment>{actions}</React.Fragment>;
        }

        return (
            <div className={b('actions')}>
                {(actions as PlaceholderContainerActionProps[]).map((actionItem) => (
                    <PlaceholderContainerAction key={actionItem.text} {...actionItem} />
                ))}
            </div>
        );
    };

    const renderContent = () => {
        const contentNode = content || (
            <React.Fragment>
                {renderTitle()}
                {renderDescription()}
            </React.Fragment>
        );

        return (
            <div className={b('content', {size})}>
                {contentNode}
                {renderAction()}
            </div>
        );
    };

    return (
        <div className={b({direction, align, size}, className || '')}>
            <div className={b('body')}>
                <div className={b('image', {size})}>{renderImage()}</div>
                {renderContent()}
            </div>
        </div>
    );
};
