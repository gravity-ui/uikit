import type * as React from 'react';

import {cnPopover} from '../../Popover.classname';

export type ContentProps = {
    /** Tooltip's content */
    content?: React.ReactNode;
    /** Tooltip's html content to be rendered via `dangerouslySetInnerHTML` */
    htmlContent?: string;
    /** Tooltip's content className */
    className?: string;
    /** Apply secondary text styles for the content */
    secondary: boolean;
};

export const Content = ({secondary, htmlContent, content, className}: ContentProps) => {
    if (!htmlContent && !content) {
        return null;
    }

    if (htmlContent) {
        return (
            <div
                className={cnPopover('tooltip-content', {secondary}, className)}
                dangerouslySetInnerHTML={{
                    __html: htmlContent,
                }}
            />
        );
    }

    if (content) {
        return (
            <div className={cnPopover('tooltip-content', {secondary}, className)}>{content}</div>
        );
    }

    return null;
};
