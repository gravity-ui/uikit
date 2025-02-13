import {CircleExclamation, Link, Xmark} from '@gravity-ui/icons';
import {action} from '@storybook/addon-actions';
import type {Meta, StoryFn} from '@storybook/react';

import {Icon} from '../../Icon';
import {Flex} from '../../layout/Flex/Flex';
import type {FilePreviewProps} from '../FilePreview';
import {FilePreview} from '../FilePreview';
import {FILE_TYPES} from '../types';

export default {
    title: 'Components/Data Display/FilePreview',
    component: FilePreview,
    parameters: {
        a11y: {
            element: '#storybook-root',
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
