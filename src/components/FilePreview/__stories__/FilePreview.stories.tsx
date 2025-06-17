import {CircleExclamation, Link, Xmark} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Flex} from '../../layout/Flex/Flex';
import type {FilePreviewProps} from '../FilePreview';
import {FilePreview} from '../FilePreview';
import {FILE_TYPES} from '../types';

import {CompactMenuWithActionsShowcase} from './CompactFilePreviewWithActionsShowcase/CompactFilePreviewWithActionsShowcase';

export default {
    title: 'Components/Data Display/FilePreview',
    component: FilePreview,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta<typeof FilePreview>;

const DefaultTemplate: StoryFn<FilePreviewProps> = (args) => {
    return <FilePreview {...args} />;
};

export const Default = DefaultTemplate.bind({});
Default.args = {
    file: {name: 'my-file.docs', type: 'text/docs'} as File,
    onClick: () => action('onClick'),
    actions: [
        {
            icon: <Link width={14} height={14} />,
            onClick: () => action('onLink'),
            title: 'Link',
        },
        {
            icon: <Xmark width={14} height={14} />,
            onClick: () => action('onClose'),
            title: 'Close',
        },
    ],
};

const CollageTemplate: StoryFn<FilePreviewProps> = () => {
    const items = FILE_TYPES.map((fileType) => (
        <FilePreview
            key={fileType}
            file={{name: fileType, type: fileType} as File}
            onClick={() => action('onClick')}
            actions={[
                {
                    icon: <Link width={14} height={14} />,
                    title: 'open on drive',
                    onClick: () => action('onLink'),
                },
                {
                    icon: <Icon data={Xmark} width={14} height={14} />,
                    title: 'delete a file',
                    onClick: () => action('onClose'),
                },
            ]}
        />
    ));

    items.splice(
        4,
        0,
        <FilePreview
            file={{name: 'my-image-from-thailand.jpg', type: 'image/png'} as File}
            imageSrc="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png"
            actions={[
                {
                    icon: <CircleExclamation width={14} height={14} />,
                    title: 'some hint',
                    onClick: () => action('onHint'),
                },
                {
                    icon: <Xmark width={14} height={14} />,
                    onClick: () => action('onClose'),
                    title: 'Close',
                },
            ]}
        />,
    );

    return (
        <div
            style={{
                display: 'grid',
                justifyItems: 'center',
                alignItems: 'center',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridGap: 8,
                width: 400,
            }}
        >
            {items}
        </div>
    );
};

export const Collage = CollageTemplate.bind({});

const noClickableTemplateActions = [
    {
        icon: <Xmark width={14} height={14} />,
        onClick: () => action('Are you sure you want to delete the file?'),
        title: 'Close',
    },
];

const NoClickableTemplate: StoryFn<Omit<FilePreviewProps, 'actions'>> = () => {
    return (
        <Flex gap={4}>
            <FilePreview file={{name: 'No clickable', type: 'text/docs'} as File} />
            <FilePreview
                file={{name: 'No clickable with actions', type: 'text/docs'} as File}
                actions={noClickableTemplateActions}
            />
            <FilePreview
                file={{name: 'Clickable with actions', type: 'text/docs'} as File}
                onClick={() => action('onClick')}
                actions={noClickableTemplateActions}
            />
        </Flex>
    );
};

export const NoClickable = NoClickableTemplate.bind({});

const SelectedTemplate: StoryFn<Omit<FilePreviewProps, 'actions'>> = () => {
    return (
        <div
            style={{
                display: 'grid',
                justifyItems: 'center',
                alignItems: 'center',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridGap: 8,
                width: 400,
            }}
        >
            <Text>File</Text>
            <FilePreview selected file={{name: 'file', type: 'text/docs'} as File} />
            <FilePreview
                selected
                view="compact"
                file={{name: 'Size s file', type: 'text/docs'} as File}
            />
            <Text>Image</Text>
            <FilePreview
                selected
                file={{name: 'image', type: 'image/png'} as File}
                imageSrc="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png"
            />
            <FilePreview
                selected
                view="compact"
                file={{name: 'image', type: 'image/png'} as File}
                imageSrc="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png"
            />
        </div>
    );
};

export const Selected = SelectedTemplate.bind({});

const withoutActionTooltipTemplateActions = [
    {
        icon: <Xmark width={14} height={14} />,
        onClick: () => action('onClose'),
        title: 'Close',
        tooltipExtraProps: {
            disabled: true,
        },
    },
];

const WithoutActionTooltipTemplate: StoryFn<Omit<FilePreviewProps, 'actions'>> = () => {
    return (
        <Flex gap={4}>
            <FilePreview
                file={{name: 'Clicable without tooltip', type: 'text/docs'} as File}
                onClick={() => action('onClick')}
                actions={withoutActionTooltipTemplateActions}
            />
        </Flex>
    );
};

export const WithoutActionTooltip = WithoutActionTooltipTemplate.bind({});

const ViewTemplate: StoryFn<Omit<FilePreviewProps, 'actions'>> = () => {
    return (
        <div
            style={{
                display: 'grid',
                justifyItems: 'center',
                alignItems: 'center',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridGap: 8,
                width: 400,
            }}
        >
            <Text>Default</Text>
            <FilePreview file={{name: 'file', type: 'text/docs'} as File} />
            <FilePreview
                file={{name: 'image', type: 'image/png'} as File}
                imageSrc="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png"
            />
            <Text>Compact</Text>
            <FilePreview view="compact" file={{name: 'Size s file', type: 'text/docs'} as File} />
            <FilePreview
                view="compact"
                file={{name: 'image', type: 'image/png'} as File}
                imageSrc="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png"
            />
        </div>
    );
};

export const View = ViewTemplate.bind({});

const compactMenuActions = [
    {
        iconStart: <Link width={14} height={14} />,
        text: 'open on drive',
        action: () => action('onLink'),
    },
    {
        iconStart: <Icon data={Xmark} width={14} height={14} />,
        text: 'delete a file',
        action: () => action('onClose'),
    },
];

const CustomMenuInDesktopCompactModeTemplate: StoryFn<Omit<FilePreviewProps, 'actions'>> = () => {
    return (
        <CompactMenuWithActionsShowcase
            file={{name: 'image with actions', type: 'image/png'} as File}
            imageSrc="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png"
            actions={compactMenuActions}
        />
    );
};

export const CustomMenuInDesktopCompactMode = CustomMenuInDesktopCompactModeTemplate.bind({});
