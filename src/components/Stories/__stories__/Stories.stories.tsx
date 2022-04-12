import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {Button} from '../../Button';
import {Stories, StoriesProps} from '../Stories';
import {Story as MyStory} from '../types';

export default {
    title: 'Components/Stories',
    component: Stories,
} as Meta;

const stories: MyStory[] = [
    {
        title: 'Новая навигация',
        description:
            'Сверху в панели находится сервисная навигация для каждого сервиса. ' +
            'Снизу - общие элементы навигации: компонент для переключения между ' +
            'аккаунтами и организациями, настройки, центр помощи, поиск, уведомления, избранное.',
        url: 'https://ya.ru',
        media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-1.png',
        },
    },
    {
        title: 'Новая навигация (2)',
        description: 'Еще немного про новую навигацию',
        media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
            type: 'video',
        },
    },
    {
        title: 'Новая навигация (3)',
        description: 'Переключайтесь на новую навигацию прямо сейчас',
    },
];

const DefaultTemplate: Story<StoriesProps> = (props: StoriesProps, context) => {
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
                lang={context.globals.lang}
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
    width: 960,
    height: 480,
    stories,
    onPreviousClick: (index) => {
        console.log('goto previous with index=%d', index);
    },
    onNextClick: (index) => {
        console.log('goto next with index=%d', index);
    },
};
