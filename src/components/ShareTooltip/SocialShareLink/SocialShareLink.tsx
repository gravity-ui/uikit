import React from 'react';
import block from 'bem-cn-lite';
import {stringify} from 'query-string';

import {SocialShareData} from '../models';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {LayoutDirections, SocialNetwork} from '../constants';
import {SVGIconData} from '../../Icon/types';
import * as icons from '../../icons/social';

import './SocialShareLink.scss';

const b = block('social-share-link');

export interface SocialShareLinkProps extends SocialShareData {
    type: SocialNetwork;
    icon?: SVGIconData;
    className?: string;
    direction?: LayoutDirections;
}

export class SocialShareLink extends React.PureComponent<SocialShareLinkProps> {
    render() {
        const {type, direction, icon = icons[type], className} = this.props;
        const url = this.getShareLink(type);
        if (direction === 'column') {
            return (
                <Button
                    view="flat"
                    size="l"
                    href={url}
                    target="_blank"
                    width="max"
                    className={b(null, className)}
                >
                    <Icon data={icon} size={16} className={b('icon', {type})} />
                    <span className={b(null, className)}>{SocialNetwork[type]}</span>
                </Button>
            );
        }
        return (
            <Button view="flat" size="l" href={url} target="_blank" className={b(null, className)}>
                <Icon data={icon} size={24} className={b('icon', {type})} />
            </Button>
        );
    }

    private getShareLink(type: SocialNetwork) {
        const {url, title, text} = this.props;

        // https://github.com/bradvin/social-share-urls
        switch (type) {
            case SocialNetwork.Telegram:
                return `https://t.me/share/url?${stringify({url, text: title})}`;
            case SocialNetwork.Facebook:
                return `https://facebook.com/sharer.php?${stringify({u: url})}`;
            case SocialNetwork.Twitter:
                return `https://twitter.com/intent/tweet?${stringify({url, text: title})}`;
            case SocialNetwork.VK:
                return `https://vk.com/share.php?${stringify({url, title, comment: text})}`;
            default:
                throw new Error(`Unknown share type: ${type}`);
        }
    }
}
