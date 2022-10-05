import React from 'react';
import {block} from '../../utils/cn';

import {SocialShareData} from '../models';
import {LayoutDirection, ShareSocialNetwork} from '../constants';
import {ShareListItem} from '../ShareListItem/ShareListItem';
import {Icon} from '../../Icon';
import {SVGIconData} from '../../Icon/types';
import {Button, ButtonView, ButtonSize, ButtonWidth} from '../../Button';
import {Link} from '../../icons';
import {CopyToClipboard, CopyToClipboardStatus} from '../../CopyToClipboard';
import {isOfType} from '../../utils/isOfType';

import i18n from '../i18n';

import './ShareList.scss';

const b = block('share-list');
const isShareListItemComponent = isOfType(ShareListItem);
export interface ShareListDefaultProps {
    /** social networks list */
    socialNets: ShareSocialNetwork[];
    /** should show copy button */
    withCopyLink: boolean;
}

export interface ShareListProps extends SocialShareData, Partial<ShareListDefaultProps> {
    /** control css class */
    className?: string;
    /** elements location direction */
    direction?: LayoutDirection;
    /** custom icon for copy link button */
    customCopyIcon?: SVGIconData;
    /** custom action for copy link button */
    customCopyAction?: (args: {url: string}) => void;
    /** copy button title */
    buttonCopyTitle?: string | React.ReactNode;
    /** you can extend available social nets with custom ones using ShareListProps.Item */
    children?:
        | React.ReactElement<ShareListItem, typeof ShareListItem>
        | React.ReactElement<ShareListItem, typeof ShareListItem>[];
}

type ShareListInnerProps = Omit<ShareListProps, keyof ShareListDefaultProps> &
    Required<Pick<ShareListProps, keyof ShareListDefaultProps>>;

interface ShareListState {
    copied: boolean;
}

export class ShareList extends React.PureComponent<ShareListInnerProps, ShareListState> {
    static defaultProps: ShareListDefaultProps = {
        socialNets: [],
        withCopyLink: false,
    };
    static Item = ShareListItem;

    state: ShareListState = {
        copied: false,
    };

    private copyLink: HTMLButtonElement | null = null;

    componentDidMount() {
        if (this.props.withCopyLink && this.copyLink) {
            this.copyLink.style.width = `${this.copyLink.scrollWidth}px`;
        }
    }

    render() {
        const {socialNets, withCopyLink, className, direction, children} = this.props;
        const hasNets = Array.isArray(socialNets) && socialNets.length > 0;
        const extensions = React.Children.toArray(children).filter((child) =>
            isShareListItemComponent(child),
        );

        return (
            <div className={b({layout: direction}, className)}>
                {hasNets && this.renderSocialShareLinks()}
                {Boolean(extensions?.length) && extensions}
                {hasNets && withCopyLink && <div className={b('separator')} />}
                {withCopyLink && this.renderCopyLink()}
            </div>
        );
    }

    private renderSocialShareLinks() {
        const {url, title, text, socialNets, direction} = this.props;
        return (
            <div className={b('social')}>
                {socialNets.map((type) => (
                    <ShareListItem
                        key={type}
                        type={type}
                        url={url}
                        title={title}
                        text={text}
                        className={b('link')}
                        direction={direction}
                    />
                ))}
            </div>
        );
    }

    private renderCopyLink() {
        const {url, customCopyIcon, buttonCopyTitle, customCopyAction} = this.props;
        const {copied} = this.state;

        const label =
            buttonCopyTitle || (copied ? i18n('label_copy-link-copied') : i18n('label_copy-link'));
        const buttonProps = {
            ref: this.copyLinkRef,
            className: b('copy-link'),
            view: 'flat-secondary' as ButtonView,
            size: 'l' as ButtonSize,
            width: 'max' as ButtonWidth,
        };

        return customCopyAction ? (
            <Button {...buttonProps} onClick={() => customCopyAction({url})}>
                <Icon data={customCopyIcon || Link} size={16} />
                {label}
            </Button>
        ) : (
            <CopyToClipboard text={this.props.url} timeout={1500}>
                {(status) => (
                    <Button {...buttonProps} disabled={status === CopyToClipboardStatus.Success}>
                        <Icon data={customCopyIcon || Link} size={16} />
                        {label}
                    </Button>
                )}
            </CopyToClipboard>
        );
    }

    private copyLinkRef = (element: unknown) => {
        this.copyLink = element as HTMLButtonElement;
    };
}
