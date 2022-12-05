import React from 'react';
import {block} from '../../utils/cn';

import {SocialShareData} from '../models';
import {LayoutDirection, ShareSocialNetwork} from '../constants';
import {ShareListItem} from '../ShareListItem/ShareListItem';
import {Icon} from '../../Icon';
import {SVGIconData} from '../../Icon/types';
import {Button} from '../../Button';
import {Mail, Link} from '../../icons';
import {CopyToClipboard, CopyToClipboardStatus} from '../../CopyToClipboard';
import {isOfType} from '../../utils/isOfType';
import {getShareUrlWithParams} from '../utils';

import i18n from '../i18n';

import './ShareList.scss';

const b = block('share-list');
const isShareListItemComponent = isOfType(ShareListItem);
export interface ShareListDefaultProps {
    /** social networks list */
    socialNets: ShareSocialNetwork[];
    /** should show copy button */
    withCopyLink: boolean;
    /** should show send via email button */
    withSendViaEmail: boolean;
}

export interface ShareListProps extends SocialShareData, Partial<ShareListDefaultProps> {
    /** control css class */
    className?: string;
    /** elements location direction */
    direction?: LayoutDirection;
    /** custom copy link button title */
    copyTitle?: string | React.ReactNode;
    /** custom send via mail button title */
    emailTitle?: string | React.ReactNode;
    /** custom copy link button icon */
    copyIcon?: SVGIconData;
    /** custom send via mail button icon */
    emailIcon?: SVGIconData;
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
        withSendViaEmail: false,
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
        const {socialNets, withCopyLink, withSendViaEmail, className, direction, children} =
            this.props;
        const hasNets = Array.isArray(socialNets) && socialNets.length > 0;
        const extensions = React.Children.toArray(children).filter((child) =>
            isShareListItemComponent(child),
        );

        return (
            <div className={b({layout: direction}, className)}>
                <div className={b('socials-container', {direction})}>
                    {hasNets && this.renderSocialShareLinks()}
                    {Boolean(extensions?.length) && extensions}
                    {withSendViaEmail && this.renderSendViaEmail()}
                </div>
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
        const {url, copyIcon, copyTitle, renderCopy} = this.props;
        const {copied} = this.state;

        const label =
            copyTitle || (copied ? i18n('label_copy-link-copied') : i18n('label_copy-link'));

        return (
            <div className={b('copy-link')}>
                {renderCopy ? (
                    renderCopy({
                        url,
                        title: label,
                        icon: copyIcon || Link,
                    })
                ) : (
                    <CopyToClipboard text={this.props.url} timeout={1500}>
                        {(status) => (
                            <Button
                                ref={this.copyLinkRef}
                                view="flat-secondary"
                                size="l"
                                disabled={status === CopyToClipboardStatus.Success}
                                width="max"
                            >
                                <Icon data={copyIcon || Link} size={16} />
                                {label}
                            </Button>
                        )}
                    </CopyToClipboard>
                )}
            </div>
        );
    }

    private renderSendViaEmail() {
        const {direction, emailIcon, emailTitle} = this.props;

        const label = emailTitle || i18n('label_email-send_via_email');

        return (
            <div className={b('social')}>
                <Button
                    view="flat"
                    size="l"
                    href={this.getShareLink()}
                    target="_blank"
                    className={b(null, 'className')}
                    extraProps={{'aria-label': i18n('label_share', {name})}}
                >
                    <Icon data={emailIcon || Mail} size={24} className={b('icon')} />
                    {direction === 'column' ? label : undefined}
                </Button>
            </div>
        );
    }

    private copyLinkRef = (element: unknown) => {
        this.copyLink = element as HTMLButtonElement;
    };

    private getShareLink = () => {
        const {url, title, text} = this.props;

        return getShareUrlWithParams('mailto:', {subject: title, body: `${text}\n${url}`});
    };
}
