import React from 'react';

import {block} from '../../../utils/cn';

import {Icon} from '../../../Icon';
import {Button} from '../../../Button';
import {SharePopover, ShareOptions, ShareList} from '../../../SharePopover';

import {LayoutDirection} from '../../constants';
import {Custom, Cloud, ShareArrowUp} from './icons';
import {ShareOptionsData} from '../../models';

import './SharePopover.scss';

const b = block('share-popover-demo');

export function SharePopoverDemo() {
    const url = 'https://www.example.com';
    const title = 'Check out this new awesome sharing component';
    const text = 'Content sharing is not supported in all share options';
    const shareOptions = [
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
                <SharePopover url={url} title={title} text={text} />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Default share options only</span>
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
                    withCopyLink={false}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Custom share option</span>
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
                    withCopyLink={false}
                    openByHover={false}
                >
                    <ShareList.Item
                        icon={Custom}
                        url="mailto:example@example.com"
                        label="Custom"
                        getShareLink={(params: ShareOptionsData) => params.url}
                    />
                </SharePopover>
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Custom share option and Copy Link</span>
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
                    withCopyLink={true}
                    openByHover={false}
                >
                    <ShareList.Item
                        icon={Custom}
                        url="mailto:example@example.com"
                        label="Custom"
                        getShareLink={(params: ShareOptionsData) => params.url}
                    />
                </SharePopover>
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Default share options with copy</span>
                <SharePopover url={url} title={title} text={text} shareOptions={shareOptions} />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Share options with copy (only URL)</span>
                <SharePopover url={url} shareOptions={shareOptions} />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Share options with copy (open by click)</span>
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
                    openByHover={false}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Using Web Share API (for mobile)</span>
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
                    useWebShareApi={true}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>Layout with direction = &quot;column&quot;</span>
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
                    direction={LayoutDirection.Column}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>With alternative Icon</span>
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
                    customIcon={ShareArrowUp}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>With alternative Icon and Title on the right</span>
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
                    customIcon={ShareArrowUp}
                    buttonTitle={ShareTitle}
                />
            </div>

            <div style={{margin: 16, display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 8}}>
                    With alternative Icon and Title on the right and custom style
                </span>
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
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
                <SharePopover
                    url={url}
                    title={title}
                    text={text}
                    shareOptions={shareOptions}
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
