import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {FaceRobot} from '@gravity-ui/icons';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryFn, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Avatar} from '../Avatar';

import {getAvatarSrcSet} from './utils/getAvatarSrcSet';

const meta: Meta<typeof Avatar> = {
    title: 'Components/Data Display/Avatar',
    component: Avatar,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                        selector: '.g-avatar__text',
                    },
                ],
            },
            options: {},
        },
    },
};

export default meta;

type Story = StoryObj<typeof Avatar>;
type StoryFunc = StoryFn<typeof Avatar>;

const imgUrl =
    'data:image/png;base64,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';

const randomAvatars = faker.helpers
    .uniqueArray(() => faker.number.int({min: 20, max: 500}), 30)
    .reduce(
        (sizes, num) => ({
            ...sizes,
            [num]: faker.image.urlLoremFlickr({
                category: 'cats',
                width: num,
                height: Math.round((num / 640) * 480),
            }),
        }),
        {},
    );

const imageProps = {
    imgUrl,
};

const iconProps = {
    backgroundColor: 'var(--g-color-base-brand)',
    icon: FaceRobot,
    color: 'var(--g-color-text-brand-contrast)',
};

const textProps = {
    backgroundColor: 'var(--g-color-base-generic-medium)',
    text: 'Charles Darwin',
    color: 'var(--g-color-text-primary)',
};

const BORDER_COLOR = 'var(--g-color-line-misc)';

export const Image: Story = {
    args: {
        imgUrl,
    },
};

export const ImageSrcSet: StoryFunc = (args) => {
    const [, setArgs] = useArgs();

    React.useEffect(() => {
        if (args.size) {
            setArgs({srcSet: getAvatarSrcSet(args.size, randomAvatars)});
        }
    }, [args.size, setArgs]);

    return <Avatar {...args} />;
};

ImageSrcSet.args = {
    imgUrl: faker.image.urlLoremFlickr({category: 'cats'}),
    size: 'xl',
    alt: 'Image with srcset',
    'aria-label': 'Random avatar',
};

export const ImageFallback: Story = {
    args: {
        imgUrl: 'random_link',
        fallbackImgUrl: imgUrl,
        alt: 'Fallbacked image',
        'aria-label': 'Fallback demonstration',
    },
};

export const Icon: Story = {
    args: {
        theme: 'brand',
        icon: FaceRobot,
        'aria-label': 'Icon',
    },
};

export const Text: Story = {
    args: {
        theme: 'brand',
        text: 'UI',
        'aria-label': 'UI',
    },
};

export const TextInitials: Story = {
    args: {
        theme: 'brand',
        text: 'Charles Darwin',
        'aria-label': 'CD',
    },
};

export const WithBorder: Story = {
    args: {
        imgUrl,
        borderColor: 'var(--g-color-line-misc)',
        alt: 'Sample image',
        'aria-label': 'Image with border',
    },
};

export const AvatarShowcase: Story = {
    name: 'Showcase',
    render: () => {
        return (
            <React.Fragment>
                <Showcase title="Image">
                    <ShowcaseItem title="xs">
                        <Avatar
                            {...imageProps}
                            size="xs"
                            alt={'Sample image'}
                            aria-label={'Avatar with XS size'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="s">
                        <Avatar
                            {...imageProps}
                            size="s"
                            alt={'Sample image'}
                            aria-label={'Avatar with S size'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="m">
                        <Avatar
                            {...imageProps}
                            size="m"
                            alt={'Sample image'}
                            aria-label={'Avatar with M size'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="l">
                        <Avatar
                            {...imageProps}
                            size="l"
                            alt={'Sample image'}
                            aria-label={'Avatar with L size'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="xl">
                        <Avatar
                            {...imageProps}
                            size="xl"
                            alt={'Sample image'}
                            aria-label={'Avatar with XL size'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="xs">
                        <Avatar
                            {...imageProps}
                            size="xs"
                            borderColor={BORDER_COLOR}
                            alt={'Sample image'}
                            aria-label={'Avatar with XS size and border'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="s">
                        <Avatar
                            {...imageProps}
                            size="s"
                            borderColor={BORDER_COLOR}
                            alt={'Sample image'}
                            aria-label={'Avatar with S size and border'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="m">
                        <Avatar
                            {...imageProps}
                            size="m"
                            borderColor={BORDER_COLOR}
                            alt={'Sample image'}
                            aria-label={'Avatar with M size and border'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="l">
                        <Avatar
                            {...imageProps}
                            size="l"
                            borderColor={BORDER_COLOR}
                            alt={'Sample image'}
                            aria-label={'Avatar with L size and border'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="xl">
                        <Avatar
                            {...imageProps}
                            size="xl"
                            borderColor={BORDER_COLOR}
                            alt={'Sample image'}
                            aria-label={'Avatar with XL size and border'}
                        />
                    </ShowcaseItem>
                </Showcase>
                <Showcase title="Icon">
                    <ShowcaseItem title="xs">
                        <Avatar {...iconProps} size="xs" aria-label={'Sample icon'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="s">
                        <Avatar {...iconProps} size="s" aria-label={'Sample icon'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="m">
                        <Avatar {...iconProps} size="m" aria-label={'Sample icon'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="l">
                        <Avatar {...iconProps} size="l" aria-label={'Sample icon'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="xl">
                        <Avatar {...iconProps} size="xl" aria-label={'Sample icon'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="xs">
                        <Avatar
                            {...iconProps}
                            size="xs"
                            borderColor={BORDER_COLOR}
                            aria-label={'Sample icon'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="s">
                        <Avatar
                            {...iconProps}
                            size="s"
                            borderColor={BORDER_COLOR}
                            aria-label={'Sample icon'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="m">
                        <Avatar
                            {...iconProps}
                            size="m"
                            borderColor={BORDER_COLOR}
                            aria-label={'Sample icon'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="l">
                        <Avatar
                            {...iconProps}
                            size="l"
                            borderColor={BORDER_COLOR}
                            aria-label={'Sample icon'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="xl">
                        <Avatar
                            {...iconProps}
                            size="xl"
                            borderColor={BORDER_COLOR}
                            aria-label={'Sample icon'}
                        />
                    </ShowcaseItem>
                </Showcase>
                <Showcase title="Text">
                    <ShowcaseItem title="xs">
                        <Avatar {...textProps} size="xs" aria-label={'CD'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="s">
                        <Avatar {...textProps} size="s" aria-label={'CD'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="m">
                        <Avatar {...textProps} size="m" aria-label={'CD'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="l">
                        <Avatar {...textProps} size="l" aria-label={'CD'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="xl">
                        <Avatar {...textProps} size="xl" aria-label={'CD'} />
                    </ShowcaseItem>
                    <ShowcaseItem title="xs">
                        <Avatar
                            {...textProps}
                            size="xs"
                            borderColor={BORDER_COLOR}
                            aria-label={'CD'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="s">
                        <Avatar
                            {...textProps}
                            size="s"
                            borderColor={BORDER_COLOR}
                            aria-label={'CD'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="m">
                        <Avatar
                            {...textProps}
                            size="m"
                            borderColor={BORDER_COLOR}
                            aria-label={'CD'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="l">
                        <Avatar
                            {...textProps}
                            size="l"
                            borderColor={BORDER_COLOR}
                            aria-label={'CD'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="xl">
                        <Avatar
                            {...textProps}
                            size="xl"
                            borderColor={BORDER_COLOR}
                            aria-label={'CD'}
                        />
                    </ShowcaseItem>
                </Showcase>
                <Showcase title="Theme / view icon">
                    <ShowcaseItem title="normal / filled icon">
                        <Avatar
                            theme="normal"
                            view="filled"
                            size="l"
                            icon={FaceRobot}
                            aria-label={'Sample icon'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="brand / filled icon">
                        <Avatar
                            theme="brand"
                            view="filled"
                            size="l"
                            icon={FaceRobot}
                            aria-label={'Sample icon'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="normal / outlined icon">
                        <Avatar
                            theme="normal"
                            view="outlined"
                            size="l"
                            icon={FaceRobot}
                            aria-label={'Sample icon'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="brand / outlined icon">
                        <Avatar
                            theme="brand"
                            view="outlined"
                            size="l"
                            icon={FaceRobot}
                            aria-label={'Sample icon'}
                        />
                    </ShowcaseItem>
                </Showcase>
                <Showcase title="Theme / view text">
                    <ShowcaseItem title="normal / filled icon">
                        <Avatar
                            theme="normal"
                            view="filled"
                            size="l"
                            text="Charles Darwin"
                            aria-label={'CD'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="brand / filled icon">
                        <Avatar
                            theme="brand"
                            view="filled"
                            size="l"
                            text="Charles Darwin"
                            aria-label={'CD'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="normal / outlined icon">
                        <Avatar
                            theme="normal"
                            view="outlined"
                            size="l"
                            text="Charles Darwin"
                            aria-label={'CD'}
                        />
                    </ShowcaseItem>
                    <ShowcaseItem title="brand / outlined icon">
                        <Avatar
                            theme="brand"
                            view="outlined"
                            size="l"
                            text="Charles Darwin"
                            aria-label={'CD'}
                        />
                    </ShowcaseItem>
                </Showcase>
            </React.Fragment>
        );
    },
};
