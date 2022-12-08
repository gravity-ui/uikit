import React from 'react';
import {block} from '../../utils/cn';

import {SharOptionsData} from '../models';
import {LayoutDirection, ShareOptions} from '../constants';
import {ShareListItem} from '../ShareListItem/ShareListItem';
import {Icon} from '../../Icon';
import {SVGIconData} from '../../Icon/types';
import {Button} from '../../Button';
import {Link} from '../../icons';
import {CopyToClipboard, CopyToClipboardStatus} from '../../CopyToClipboard';
import {isOfType} from '../../utils/isOfType';

import i18n from '../i18n';

import './ShareList.scss';

const b = block('share-list');
const isShareListItemComponent = isOfType(ShareListItem);
export interface ShareListDefaultProps {
    /** share options list */
    shareOptions: ShareOptions[];
    /** should show copy button */
    withCopyLink: boolean;
}

export interface ShareListProps extends SharOptionsData, Partial<ShareListDefaultProps> {
    /** control css class */
    className?: string;
    /** elements location direction */
    direction?: LayoutDirection;
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
    /** you can extend available share options with custom ones using ShareListProps.Item */
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
        shareOptions: [],
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
        const {shareOptions, withCopyLink, className, direction, children} = this.props;
        const hasShareOptions = Array.isArray(shareOptions) && shareOptions.length > 0;
        const extensions = React.Children.toArray(children).filter((child) =>
            isShareListItemComponent(child),
        );

        return (
            <div className={b({layout: direction}, className)}>
                <div className={b('options-container')}>
                    {hasShareOptions && this.renderShareOptionsLinks()}
                    {Boolean(extensions?.length) && extensions}
                </div>
                {hasShareOptions && withCopyLink && <div className={b('separator')} />}
                {withCopyLink && this.renderCopyLink()}
            </div>
        );
    }

    private renderShareOptionsLinks() {
        const {url, title, text, shareOptions, direction} = this.props;
        return (
            <div className={b('option')}>
                {shareOptions.map((type) => (
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

    private copyLinkRef = (element: unknown) => {
        this.copyLink = element as HTMLButtonElement;
    };
}
