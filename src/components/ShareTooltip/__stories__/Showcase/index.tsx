import React from 'react';

import {block} from '../../../utils/cn';

import {ShareTooltip, ShareSocialNetwork, ShareList} from '../../../ShareTooltip';

import {LayoutDirection} from '../../constants';
import {LinkedIn, Cloud, ShareArrowUp} from './icons';
import {SocialShareData} from 'src/components/ShareTooltip/models';

import './ShareTooltip.scss';

const b = block('share-tooltip-demo');

export function ShareTooltipDemo() {
    const url =
        'https://preview.yandexcloud.dev/uikit/?path=/story/components-sharetooltip--default';
    const title = 'Check out this new awesome sharing component';
    const text = 'Content sharing is not supported in all social networks';
    const socialNets = [
        ShareSocialNetwork.Telegram,
        ShareSocialNetwork.Facebook,
        ShareSocialNetwork.Twitter,
        ShareSocialNetwork.VK,
    ];

    const ShareTitle = <div>Поделиться</div>;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flexDirection: 'column',
            }}
        >
            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Copy only</span>
                <ShareTooltip url={url} title={title} text={text} />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Socials only</span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    withCopyLink={false}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Custom Social</span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    withCopyLink={false}
                    openByHover={false}
                >
                    <ShareList.Item
                        icon={LinkedIn}
                        url="https://www-linkedin.com/"
                        label="LinkedIn"
                        getShareLink={(params: SocialShareData) => params.url}
                    />
                </ShareTooltip>
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Socials with copy</span>
                <ShareTooltip url={url} title={title} text={text} socialNets={socialNets} />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Socials with copy (only URL)</span>
                <ShareTooltip url={url} socialNets={socialNets} />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Socials with copy (open by click)</span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    openByHover={false}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Using Web Share API (for mobile)</span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    useWebShareApi={true}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Layout with direction = &quot;column&quot;</span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    direction={LayoutDirection.Column}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>With alternative Icon</span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    customIcon={ShareArrowUp}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>With alternative Icon and Title on the right</span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    customIcon={ShareArrowUp}
                    buttonTitle={ShareTitle}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>
                    With alternative Icon and Title on the right and custom style
                </span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    customIcon={ShareArrowUp}
                    buttonTitle={ShareTitle}
                    switcherClassName={b('custom-switcher')}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Custom share link</span>
                <ShareList.Item type={ShareSocialNetwork.Telegram} url={url} icon={Cloud} />
            </div>
        </div>
    );
}
