import React from 'react';

import {block} from '../../components/utils/cn';

import {ShareTooltip, SocialNetwork, SocialShareLink} from '../../components/ShareTooltip';

import {Cloud, ShareArrowUp} from './icons';
import {LayoutDirections} from '../../components/ShareTooltip/constants';

import './ShareTooltip.scss';

const b = block('share-tooltip-demo');

export function ShareTooltipDemo() {
    const url =
        'https://cloud-guide.yandex-team.ru/?selectedKind=Components&selectedStory=ShareTooltip';
    const title = 'Check out this new awesome sharing component';
    const text = 'Content sharing is not supported in all social networks';
    const socialNets = [
        SocialNetwork.Telegram,
        SocialNetwork.Facebook,
        SocialNetwork.Twitter,
        SocialNetwork.VK,
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
                    direction={LayoutDirections.column}
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
                <SocialShareLink type={SocialNetwork.Telegram} url={url} icon={Cloud} />
            </div>
        </div>
    );
}
