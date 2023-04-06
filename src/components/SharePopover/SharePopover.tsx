import React from 'react';

import {block} from '../utils/cn';
import {LayoutDirection} from './constants';
import {ShareList, ShareListProps, ShareListDefaultProps} from './ShareList/ShareList';
import {PopupPlacement} from '../Popup';
import {SVGIconData} from '../Icon/types';
import {Popover} from '../Popover';
import {Icon} from '../Icon';
import {Share} from '../icons';

import './SharePopover.scss';

const b = block('share-popover');

interface SharePopoverDefaultProps extends ShareListDefaultProps {
    /** Web Share API setting (share options can be specified for non supported api case) */
    useWebShareApi: boolean;
    /** popover opening direction */
    placement: PopupPlacement;
    /** should open popover with hover */
    openByHover: boolean;
    /** should close popover when cursor is outside */
    autoclosable: boolean;
    /** delay before popover will be hidden when cursor is otside */
    closeDelay: number;
    /** control-icon size */
    iconSize: number;
    /** elements location direction */
    direction: LayoutDirection;
}

export interface SharePopoverProps extends ShareListProps, Partial<SharePopoverDefaultProps> {
    /** icon control mixin */
    iconClass?: string;
    /** tooltip mixin */
    tooltipClassName?: string;
    /** sitcher mixin */
    switcherClassName?: string;
    /** custom icon */
    customIcon?: SVGIconData;
    /** icon title */
    buttonTitle?: string | React.ReactNode;
    /**
     * @deprecated use onClick instead
     * metrika traking registration handler
     * */
    handleMetrika?: () => void;
    /** custom copy link button title */
    onClick?: (event?: React.MouseEvent<HTMLSpanElement>) => void;
    /** custom copy link button title */
    copyTitle?: string | React.ReactNode;
    /** custom copy link button icon */
    copyIcon?: SVGIconData;
    /** custom copy button render */
    renderCopy?: ({
        url,
        title,
        icon,
    }: {
        url: string | undefined;
        title: string | React.ReactNode;
        icon: SVGIconData;
    }) => React.ReactElement;
}

type SharePopoverInnerProps = Omit<SharePopoverProps, keyof SharePopoverDefaultProps> &
    Required<Pick<SharePopoverProps, keyof SharePopoverDefaultProps>>;

export const sharePopoverDefaultProps: SharePopoverDefaultProps = {
    iconSize: 16,
    shareOptions: ShareList.defaultProps.shareOptions,
    withCopyLink: true,
    useWebShareApi: false,
    placement: ['bottom-end'],
    openByHover: true,
    autoclosable: true,
    closeDelay: 300,
    direction: LayoutDirection.Row,
};

export class SharePopover extends React.PureComponent<SharePopoverInnerProps> {
    static defaultProps = sharePopoverDefaultProps;

    render() {
        const {
            url,
            title,
            text,
            shareOptions,
            withCopyLink,
            useWebShareApi,
            placement,
            openByHover,
            autoclosable,
            closeDelay,
            iconSize,
            iconClass,
            tooltipClassName,
            switcherClassName,
            className,
            direction,
            customIcon,
            buttonTitle,
            copyTitle,
            copyIcon,
            renderCopy,
            children,
        } = this.props;

        const content = (
            <ShareList
                url={url}
                title={title}
                text={text}
                shareOptions={shareOptions}
                withCopyLink={withCopyLink}
                direction={direction}
                copyTitle={copyTitle}
                copyIcon={copyIcon}
                renderCopy={renderCopy}
            >
                {children}
            </ShareList>
        );

        return (
            <Popover
                placement={placement}
                hasArrow={false}
                openOnHover={openByHover && !useWebShareApi}
                autoclosable={autoclosable}
                delayClosing={closeDelay}
                content={content}
                className={b(null, className)}
                tooltipClassName={b('tooltip', tooltipClassName)}
                onClick={this.handleClick}
            >
                <div className={b('container', switcherClassName)}>
                    <div className={b('icon-container')}>
                        <Icon
                            data={customIcon ? customIcon : Share}
                            size={iconSize}
                            className={b('icon', iconClass)}
                        />
                    </div>

                    {Boolean(buttonTitle) && <div className={b('title')}>{buttonTitle}</div>}
                </div>
            </Popover>
        );
    }

    private handleClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        const {url, title, text, useWebShareApi, handleMetrika, onClick} = this.props;

        if (handleMetrika) {
            handleMetrika();
        }

        if (onClick) {
            onClick(event);
        }

        if (useWebShareApi && navigator && typeof navigator.share === 'function') {
            await navigator.share({url, title, text});
            event.preventDefault();
            return false;
        }
        return true;
    };
}
