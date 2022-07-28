import React from 'react';
import {block} from '../../utils/cn';

import {SocialShareData} from '../models';
import {LayoutDirections, SocialNetwork} from '../constants';
import {SocialShareLink} from '../SocialShareLink/SocialShareLink';
import {Icon} from '../../Icon';
import {Button} from '../../Button';
import {Link} from '../../icons';

import i18n from '../i18n';
import {copyToClipboard} from '../../utils/copy-to-clipboard';

import './ShareList.scss';

const b = block('share-list');

export interface ShareListDefaultProps {
    /** список социальных сетей */
    socialNets: SocialNetwork[];
    /** настройка отображения кнопки копирования ссылки */
    withCopyLink: boolean;
}

export interface ShareListProps extends SocialShareData, Partial<ShareListDefaultProps> {
    /** css класс для контрола */
    className?: string;
    /** направление расположения элементов */
    direction?: LayoutDirections;
}

type ShareListInnerProps = Omit<ShareListProps, keyof ShareListDefaultProps> &
    Required<Pick<ShareListProps, keyof ShareListDefaultProps>>;

interface ShareListState {
    copied: boolean;
}

export class ShareList extends React.PureComponent<ShareListInnerProps, ShareListState> {
    // eslint-disable-next-line react/sort-comp
    static defaultProps: ShareListDefaultProps = {
        socialNets: [],
        withCopyLink: false,
    };

    state: ShareListState = {
        copied: false,
    };

    private timeoutId: number | null = null;
    private copyLink: HTMLButtonElement | null = null;

    componentDidMount() {
        if (this.props.withCopyLink && this.copyLink) {
            this.copyLink.style.width = `${this.copyLink.scrollWidth}px`;
        }
    }

    render() {
        const {socialNets, withCopyLink, className, direction} = this.props;
        const hasNets = Array.isArray(socialNets) && socialNets.length > 0;

        return (
            <div className={b({layout: direction}, className)}>
                {hasNets && this.renderSocialShareLinks()}
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
            <Button
                ref={this.copyLinkRef}
                className={b('copy-link')}
                view="flat-secondary"
                size="l"
                onClick={this.handleCopyClick}
                disabled={copied}
                width="max"
            >
                <Icon data={Link} size={16} />
                <span className={b('copy-label')}>{label}</span>
            </Button>
        );
    }

    private handleCopyClick = async () => {
        await copyToClipboard(this.props.url);

        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }

        this.setState({copied: true}, () => {
            this.timeoutId = window.setTimeout(() => this.setState({copied: false}), 1500);
        });
    };

    private copyLinkRef = (element: unknown) => {
        this.copyLink = element as HTMLButtonElement;
    };
}
