import React from 'react';

import {block} from '../../../utils/cn';

import {Icon} from '../../../Icon';
import {Button} from '../../../Button';
import {ShareTooltip, ShareOptions, ShareList} from '../../../ShareTooltip';

import {LayoutDirection} from '../../constants';
import {Custom, Cloud, ShareArrowUp} from './icons';
import {SocialShareData} from 'src/components/ShareTooltip/models';

import './ShareTooltip.scss';

const b = block('share-tooltip-demo');

export function ShareTooltipDemo() {
    const url =
        'https://preview.yandexcloud.dev/uikit/?path=/story/components-sharetooltip--default';
    const title = 'Check out this new awesome sharing component';
    const text = 'Content sharing is not supported in all social networks';
    const socialNets = [
        ShareOptions.Telegram,
        ShareOptions.Facebook,
        ShareOptions.Twitter,
        ShareOptions.VK,
        ShareOptions.LinkedIn,
        ShareOptions.Mail,
    ];

    const ShareTitle = <div>Share</div>;

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
                        icon={Custom}
                        url="mailto:example@example.com"
                        label="Custom"
                        getShareLink={(params: SocialShareData) => params.url}
                    />
                </ShareTooltip>
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Custom Social and Copy Link</span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    withCopyLink={true}
                    openByHover={false}
                >
                    <ShareList.Item
                        icon={Custom}
                        url="mailto:example@example.com"
                        label="Custom"
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
                <ShareList.Item type={ShareOptions.Telegram} url={url} icon={Cloud} />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Custom copy button render</span>
                <ShareTooltip
                    url={url}
                    title={title}
                    text={text}
                    socialNets={socialNets}
                    openByHover={false}
                    copyTitle={ShareTitle}
                    copyIcon={Cloud}
                    renderCopy={({url: link, title: label, icon}) => (
                        <Button
                            view="flat-secondary"
                            size="l"
                            width="max"
                            onClick={() => alert(link)}
                        >
                            <Icon data={icon} size={16} />
                            {label}
                        </Button>
                    )}
                />
            </div>
        </div>
    );
}
