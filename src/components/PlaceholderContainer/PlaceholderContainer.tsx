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
    className = b(),
    title,
    description,
    image,
    renderContent,
    action,
    renderAction,
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
        if (typeof image === 'object' && 'url' in image) {
            return <img src={image.url} alt={image.alt || ''} />;
        }

        return image;
    };

    const renderActionFn = () => {
        if (renderAction) {
            return renderAction();
        }

        if (!action) {
            return null;
        }

        if (Array.isArray(action)) {
            if (!action.length) {
                return null;
            }

            return (
                <div className={b('actions')}>
                    {action.map((actionItem) => (
                        <PlaceholderContainerAction key={actionItem.text} {...actionItem} />
                    ))}
                </div>
            );
        }

        return (
            <div className={b('actions')}>
                <PlaceholderContainerAction {...action} />
            </div>
        );
    };

    const renderContentFn = () => {
        const content = renderContent ? (
            renderContent()
        ) : (
            <React.Fragment>
                {renderTitle()}
                {renderDescription()}
            </React.Fragment>
        );

        return (
            <div className={b('content', {size})}>
                {content}
                {renderActionFn()}
            </div>
        );
    };

    return (
        <div className={b({direction, align, size}, [className])}>
            <div className={b('body')}>
                <div className={b('image', {size})}>{renderImage()}</div>
                {renderContentFn()}
            </div>
        </div>
    );
};
