import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {Button} from '../../Button';
import {StoriesGroup, StoriesGroupProps} from '../../StoriesGroup/StoriesGroup';
import {StoriesGroupItem} from '../types';
import {StoriesGroupShowcase} from './StoriesGroupShowcase';

export default {
    title: 'Components/StoriesGroup',
    component: StoriesGroup,
} as Meta;

const GROUPS: StoriesGroupItem[] = [
    {
        items: [
            {
                title: 'New navigation 1',
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
                title: 'New navigation 1.1',
                description: 'A little more about the new navigation',
                media: {
                    url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
                    type: 'video',
                },
            },
        ],
    },
    {
        items: [
            {
                title: 'New navigation 2',
                description: 'Switch to the new navigation right now',
                media: {
                    url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-4.png',
                },
            },
        ],
    },
    {
        items: [
            {
                title: 'New navigation 3',
                description:
                    'The Quokka, or Short—tailed kangaroo (Latin Setonix brachyurus), is the only representative of the genus Setonix of the kangaroo family.',
                media: {
                    url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-4.png',
                },
            },
        ],
    },
];

const DefaultTemplate: Story<StoriesGroupProps> = (props) => {
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
            <StoriesGroup
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
    index: {groupIndex: 0, itemIndex: 0},
    open: false,
    groups: GROUPS,
};
Default.argTypes = {};

const ShowcaseTemplate: Story<StoriesGroupProps> = (props) => <StoriesGroupShowcase {...props} />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.args = {
    groups: GROUPS,
    disableOutsideClick: false,
};
Showcase.argTypes = {};
