import React from 'react';
import {block} from '../../utils/cn';

import {SocialShareData} from '../models';
import {LayoutDirection, SocialNetwork} from '../constants';
import {SocialShareLink} from '../SocialShareLink/SocialShareLink';
import {Icon} from '../../Icon';
import {Button} from '../../Button';
import {Link} from '../../icons';
import {CopyToClipboard, CopyToClipboardStatus} from '../../CopyToClipboard';
import {isOfType} from '../../utils/isOfType';

import i18n from '../i18n';

import './ShareList.scss';

const b = block('share-list');
const isSocialShareLinkComponent = isOfType(SocialShareLink);
export interface ShareListDefaultProps {
    /** social networks list */
    socialNets: SocialNetwork[];
    /** should show copy button */
    withCopyLink: boolean;
}

export interface ShareListProps extends SocialShareData, Partial<ShareListDefaultProps> {
    /** control css class */
    className?: string;
    /** elements location direction */
    direction?: LayoutDirection;
    /** you can extend available social nets with custom ones using ShareListProps.Item */
    children?:
        | React.ReactElement<SocialShareLink, typeof SocialShareLink>
        | React.ReactElement<SocialShareLink, typeof SocialShareLink>[];
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
    static Item = SocialShareLink;

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
            isSocialShareLinkComponent(child),
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
                    <SocialShareLink
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
        const {copied} = this.state;
        const label = copied ? i18n('label_copy-link-copied') : i18n('label_copy-link');

        return (
            <CopyToClipboard text={this.props.url} timeout={1500}>
                {(status) => (
                    <Button
                        ref={this.copyLinkRef}
                        className={b('copy-link')}
                        view="flat-secondary"
                        size="l"
                        disabled={status === CopyToClipboardStatus.Success}
                        width="max"
                    >
                        <Icon data={Link} size={16} />
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
