import * as React from 'react';

import {Button} from '../Button';
import {Icon} from '../Icon';
import type {IconData} from '../Icon';
import {block} from '../utils/cn';

import i18n from './i18n';
import type {RenderFallbackContentProps} from './types';

const b = block('suggest');

interface DefaultFallbackProps {
    title: string;
    description: React.ReactNode;
    icon?: IconData;
    actionText?: string;
    onAction?: () => void;
}

const DefaultFallback = ({
    title,
    description,
    icon,
    actionText,
    onAction,
}: DefaultFallbackProps) => {
    return (
        <div className={b('fallback-content')}>
            {icon ? (
                <div className={b('fallback-icon')}>
                    <Icon data={icon} size={48} />
                </div>
            ) : null}
            <div className={b('fallback-title')}>{title}</div>
            {description ? <div className={b('fallback-description')}>{description}</div> : null}
            {actionText && onAction ? (
                <div className={b('fallback-actions')}>
                    <Button size="m" view="action" onClick={onAction}>
                        {actionText}
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

interface DefaultEmptyContentProps extends RenderFallbackContentProps {
    icon?: IconData;
}

export const DefaultEmptyContent = ({value, icon}: DefaultEmptyContentProps) => {
    return (
        <DefaultFallback
            title={i18n('items_not_found_title')}
            description={i18n('items_not_found', {value})}
            icon={icon}
        />
    );
};

interface DefaultErrorContentProps extends RenderFallbackContentProps {
    onRetry: () => void;
    icon?: IconData;
}

export const DefaultErrorContent = ({error, onRetry, icon}: DefaultErrorContentProps) => {
    return (
        <DefaultFallback
            title={i18n('fetch_error_title')}
            description={error?.message || i18n('fetch_error_description')}
            icon={icon}
            actionText={i18n('retry')}
            onAction={onRetry}
        />
    );
};
