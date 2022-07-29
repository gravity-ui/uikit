import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {Button} from '../../Button';
import {ChangelogDialog, ChangelogDialogProps} from '../ChangelogDialog';
import {ChangelogItem} from '../types';

export default {
    title: 'Components/ChangelogDialog',
    component: ChangelogDialog,
    argTypes: {
        onStoryClick: {
            action: 'onStoryClick'
        }
    }
} as Meta;

const items: ChangelogItem[] = [
    {
        date: '03 Jul 2022',
        isNew: true,
        title: 'New navigation',
        image: {
            src: 'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png',
            alt: 'New navigation',
            ratio: 240 / 516,
        },
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
        storyId: 'someStoryId1',
    },
    {
        date: '23 Jun 2022',
        isNew: true,
        title: 'New components',
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
    },
    {
        date: '15 Jun 2022',
        title: 'Dark theme is now available',
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
    },
    {
        date: '12 Jun 2022',
        title: 'Minor fixes',
        image: {
            src: 'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png',
            ratio: 240 / 516,
        },
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
        storyId: 'someStoryId2',
    },
    {
        date: '10 Jun 2022',
        title: 'New features',
        image: {
            src: 'broken-url',
            ratio: 240 / 516,
        },
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
        storyId: 'someStoryId3',
    },
    {
        date: '10 May 2022',
        title: 'Fix basis components behavior',
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
    },
];

const DefaultTemplate: Story<ChangelogDialogProps> = (props: ChangelogDialogProps) => {
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
            <ChangelogDialog
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
    fullListLink: 'https://github.com/yandex-cloud/uikit',
    onStoryClick: (storyId) => {
        console.log(storyId);
    },
};
