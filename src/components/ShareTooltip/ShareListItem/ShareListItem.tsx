import React from 'react';

import {block} from '../../utils/cn';
import {SocialShareData} from '../models';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {LayoutDirection, ShareSocialNetwork} from '../constants';
import {SVGIconData} from '../../Icon/types';
import * as icons from '../../icons/social';
import i18n from '../i18n';

import './ShareListItem.scss';

const b = block('share-list-item');

export interface ShareListItemProps extends SocialShareData {
    type?: ShareSocialNetwork;
    icon?: SVGIconData;
    label?: string;
    className?: string;
    direction?: LayoutDirection;

    getShareLink?: (params: SocialShareData) => string;
}

export class ShareListItem extends React.PureComponent<ShareListItemProps> {
    render() {
        const {type, direction, className, label, getShareLink, ...rest} = this.props;
        const icon = this.props.icon || (type && icons[type]);
        const url = getShareLink?.(rest) ?? (type && this.getShareLink(type));
        const typeModifier = type?.toLowerCase();
        const name = label || (type && ShareSocialNetwork[type]);

        if (!url) {
            return null;
        }

        if (direction === 'column') {
            return (
                <Button
                    view="flat"
                    size="l"
                    href={url}
                    target="_blank"
                    width="max"
                    className={b(null, className)}
                    extraProps={{'aria-label': i18n('label_share', {name})}}
                >
                    {icon && (
                        <Icon data={icon} size={16} className={b('icon', {type: typeModifier})} />
                    )}
                    {name && <span className={b(null, className)}>{name}</span>}
                </Button>
            );
        }
        return (
            <Button
                view="flat"
                size="l"
                href={url}
                target="_blank"
                className={b(null, className)}
                extraProps={{'aria-label': i18n('label_share', {name})}}
            >
                {icon && <Icon data={icon} size={24} className={b('icon', {type: typeModifier})} />}
            </Button>
        );
    }

    private getShareLink(type: ShareSocialNetwork) {
        const {url, title, text} = this.props;

        // https://github.com/bradvin/social-share-urls
        switch (type) {
            case ShareSocialNetwork.Telegram:
                return this.getShareUrlWithParams('https://t.me/share/url', {url, text: title});
            case ShareSocialNetwork.Facebook:
                return this.getShareUrlWithParams('https://facebook.com/sharer.php', {u: url});
            case ShareSocialNetwork.Twitter:
                return this.getShareUrlWithParams('https://twitter.com/intent/tweet', {
                    url,
                    text: title,
                });
            case ShareSocialNetwork.VK:
                return this.getShareUrlWithParams('https://vk.com/share.php', {
                    url,
                    title,
                    comment: text,
                });
            case ShareSocialNetwork.LinkedIn:
                return this.getShareUrlWithParams(
                    'https://www.linkedin.com/sharing/share-offsite/',
                    {
                        url,
                    },
                );
            default:
                console.error(`Unknown share type: ${type}`);

                return null;
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
