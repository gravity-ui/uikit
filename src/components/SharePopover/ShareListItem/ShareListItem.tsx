import React from 'react';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import type {SVGIconData} from '../../Icon/types';
import {block} from '../../utils/cn';
import {LayoutDirection, ShareOptions} from '../constants';
import i18n from '../i18n';
import * as icons from '../icons';
import type {ShareOptionsData} from '../models';

import './ShareListItem.scss';

const b = block('share-list-item');

export interface ShareListItemProps extends ShareOptionsData {
    type?: ShareOptions;
    icon?: SVGIconData;
    label?: string;
    className?: string;
    direction?: LayoutDirection;

    getShareLink?: (params: ShareOptionsData) => string;
}

export class ShareListItem extends React.PureComponent<ShareListItemProps> {
    render() {
        const {type, direction, className, label, getShareLink, ...rest} = this.props;
        const icon = this.props.icon || (type && icons[type]);
        const url = getShareLink?.(rest) ?? (type && this.getShareLink(type));
        const typeModifier = type?.toLowerCase();
        const name = label || (type && ShareOptions[type]);

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

    private getShareLink(type: ShareOptions) {
        const {url, title, text} = this.props;

        // https://github.com/bradvin/social-share-urls
        switch (type) {
            case ShareOptions.Telegram:
                return this.getShareUrlWithParams('https://t.me/share/url', {url, text: title});
            case ShareOptions.Facebook:
                return this.getShareUrlWithParams('https://facebook.com/sharer.php', {u: url});
            case ShareOptions.Twitter:
                return this.getShareUrlWithParams('https://twitter.com/intent/tweet', {
                    url,
                    text: title,
                });
            case ShareOptions.VK:
                return this.getShareUrlWithParams('https://vk.com/share.php', {
                    url,
                    title,
                    comment: text,
                });
            case ShareOptions.LinkedIn:
                return this.getShareUrlWithParams(
                    'https://www.linkedin.com/sharing/share-offsite/',
                    {
                        url,
                    },
                );
            case ShareOptions.Mail:
                return this.getShareUrlWithParams('mailto:', {
                    subject: title,
                    body: text ? `${text}\n${url}` : url,
                });
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
