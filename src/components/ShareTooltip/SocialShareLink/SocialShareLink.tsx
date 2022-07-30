import React from 'react';

import {block} from '../../utils/cn';
import {SocialShareData} from '../models';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {LayoutDirections, SocialNetwork} from '../constants';
import {SVGIconData} from '../../Icon/types';
import * as icons from '../../icons/social';

import './SocialShareLink.scss';

const b = block('social-share-link');

export interface SocialShareLinkProps extends SocialShareData {
    type?: SocialNetwork;
    icon?: SVGIconData;
    label?: string;
    className?: string;
    direction?: LayoutDirections;
    shareLink?: string;
}

export class SocialShareLink extends React.PureComponent<SocialShareLinkProps> {
    render() {
        const {type, shareLink, direction, className, label} = this.props;
        const icon = this.props.icon || (type && icons[type]);
        const url = shareLink ?? (type && this.getShareLink(type));

        const typeModifier = type?.toLowerCase();

        if (!url) {
            return null;
        }

        if (direction === 'column') {
            const title = label || (type && SocialNetwork[type]);

            return (
                <Button
                    view="flat"
                    size="l"
                    href={url}
                    target="_blank"
                    width="max"
                    className={b(null, className)}
                >
                    {icon && (
                        <Icon data={icon} size={16} className={b('icon', {type: typeModifier})} />
                    )}
                    {title && <span className={b(null, className)}>{title}</span>}
                </Button>
            );
        }
        return (
            <Button view="flat" size="l" href={url} target="_blank" className={b(null, className)}>
                {icon && <Icon data={icon} size={24} className={b('icon', {type: typeModifier})} />}
            </Button>
        );
    }

    private getShareLink(type: SocialNetwork) {
        const {url, title, text} = this.props;

        // https://github.com/bradvin/social-share-urls
        switch (type) {
            case SocialNetwork.Telegram:
                return this.getShareUrlWithParams('https://t.me/share/url', {url, text: title});
            case SocialNetwork.Facebook:
                return this.getShareUrlWithParams('https://facebook.com/sharer.php', {u: url});
            case SocialNetwork.Twitter:
                return this.getShareUrlWithParams('https://twitter.com/intent/tweet', {
                    url,
                    text: title,
                });
            case SocialNetwork.VK:
                return this.getShareUrlWithParams('https://vk.com/share.php', {
                    url,
                    title,
                    comment: text,
                });
            default:
                throw new Error(`Unknown share type: ${type}`);
        }
    }

    private getShareUrlWithParams(url: string, params: Record<string, string | undefined> = {}) {
        const result = new URL(url);

        Object.entries(params).forEach(([name, value]) => {
            if (value) {
                result.searchParams.set(name, value);
            }
        });

        return result.toString();
    }
}
