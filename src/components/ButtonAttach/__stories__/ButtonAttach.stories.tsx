import React, {useState} from 'react';
import type {ReactEventHandler, FC} from 'react';
import {Meta, Story} from '@storybook/react';
import {ButtonAttach, ButtonAttachProps} from '../ButtonAttach';
import {Table} from '../../Table/Table';

interface FileData {
    img: File;
    name: string;
    size: string;
    type: string;
}

const handleRevokeImageSrc: ReactEventHandler<HTMLImageElement> = ({currentTarget}) =>
    URL.revokeObjectURL(currentTarget.src);

const DEFAULT_PREVIEW_SIZE_LIMIT = 1024 * 1024 * 10;

const ImgPreview: FC<{file: File}> = ({file}) => {
    if (file.size > DEFAULT_PREVIEW_SIZE_LIMIT || !file.type.startsWith('image/')) {
        return null;
    }
    const url = URL.createObjectURL(file);
    return (
        <img
            onLoad={handleRevokeImageSrc}
            style={{
                width: 175,
                height: 100,
                objectFit: 'cover',
            }}
            src={url}
            alt={file.name}
        />
    );
};

const columns = [
    {
        id: 'img',
        name: 'Img prewiew (for img)',
        template: (row: FileData) => <ImgPreview file={row.img} />,
    },
    {id: 'name', name: 'Name'},
    {id: 'size', name: 'Size'},
    {id: 'type', name: 'Type'},
];

export default {
    title: 'Components/ButtonAttach',
    component: ButtonAttach,
} as Meta;

const size = (bytes: number) => {
    const k = Math.floor(Math.log2(bytes) / 10);
    const ext = ['bytes', 'KB', 'MB', 'GB', 'TB'][k];
    return `${new Intl.NumberFormat('ru').format(
        Math.floor((bytes / Math.pow(1024, k)) * 100) / 100,
    )}${ext}`;
};

const DefaultTemplate: Story<ButtonAttachProps> = (args) => {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <>
            <ButtonAttach {...args} onUpdate={setFiles}>
                Choose file
            </ButtonAttach>

            {Boolean(files.length) && (
                <div>
                    <h2>Selected files</h2>
                    <Table
                        data={files.map((file) => ({
                            img: file,
                            name: file.name,
                            size: size(file.size),
                            type: file.type,
                        }))}
                        columns={columns}
                    />
                </div>
            )}
        </>
    );
};

const ShowcaseTemplate: Story<ButtonAttachProps> = (args) => {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <div>
            <ButtonAttach {...args} onUpdate={setFiles}>
                You can choose file of any type (configurate at controls)
            </ButtonAttach>
            <br />
            <br />
            <ButtonAttach {...args} onUpdate={setFiles} accept="image/jpeg,image/png,image/gif">
                You can choose only image
            </ButtonAttach>
            <br />
            <br />
            <ButtonAttach {...args} onUpdate={setFiles} multiple>
                You can select multiple files
            </ButtonAttach>
            {Boolean(files.length) && (
                <div>
                    <h2>Selected files</h2>
                    <Table
                        data={files.map((file) => ({
                            img: file,
                            name: file.name,
                            size: size(file.size),
                            type: file.type,
                        }))}
                        columns={columns}
                    />
                </div>
            )}
        </div>
    );
};
export const Default = DefaultTemplate.bind({});

export const Showcase = ShowcaseTemplate.bind({});
