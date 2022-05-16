import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {Button} from '../../Button';
import {Stories, StoriesProps} from '../Stories';
import {StoriesItem} from '../types';

export default {
    title: 'Components/Stories',
    component: Stories,
} as Meta;

const items: StoriesItem[] = [
    {
        title: 'New navigation',
        description:
            'At the top of the panel is the service navigation for each service. ' +
            'Below are common navigation elements: a component for switching between accounts ' +
            'and organizations, settings, help center, search, notifications, favorites.',
        url: 'https://yandex.eu',
        media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-2.png',
        },
    },
    {
        title: 'New navigation (2)',
        description: 'A little more about the new navigation',
        media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
            type: 'video',
        },
    },
    {
        title: 'New navigation (3)',
        description: 'Switch to the new navigation right now',
        media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-4.png',
        },
    },
];

const DefaultTemplate: Story<StoriesProps> = (props: StoriesProps) => {
    const [visible, setVisible] = React.useState(props.open);

    React.useEffect(() => {
        setVisible(props.open);
    }, [props.open]);

    return (
        <React.Fragment>
            <div>
                <Button
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    Open
                </Button>
            </div>
            <Stories
                {...props}
                open={visible}
                onClose={() => {
                    setVisible(false);
                }}
            />
        </React.Fragment>
    );
};
export const Default = DefaultTemplate.bind({});
Default.args = {
    open: false,
    items,
};
Default.argTypes = {
    onPreviousClick: {action: 'onPreviousClick'},
    onNextClick: {action: 'onNextClick'},
};
