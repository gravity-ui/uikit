import {FileArrowDown} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Icon, Text} from '../../../../components';
import type {FileRejection} from '../types';
import {useDropZone} from '../useDropZone';

export default {title: 'Hooks/useDropZone'} as Meta;

const ACCEPT = ['image/*'];

const DefaultTemplate: StoryFn = () => {
    const handleDrop = (items: DataTransferItem[]) => {
        for (const item of items) {
            if (item.kind === 'string') {
                item.getAsString((text) => {
                    alert(`String: ${text}`);
                });
            }

            if (item.kind === 'file') {
                const file = item.getAsFile();

                alert(`File: name: ${file?.name}, size: ${file?.size}, type: ${file?.type}`);
            }
        }
    };

    const handleDropReject = (items: FileRejection[]) => {
        for (const fileRejection of items) {
            const {item, reasons} = fileRejection;
            if (item.kind === 'file') {
                const file = item.getAsFile();

                alert(
                    `File rejected with reasons ${reasons.join(', ')}: name: ${file?.name}, size: ${file?.size}, type: ${file?.type}`,
                );
            }
        }
    };

    const {isDraggingOver, isInvalidDrag, getDroppableProps} = useDropZone({
        accept: ACCEPT,
        multiple: true,
        maxFilesCount: 3,
        onDropAccepted: handleDrop,
        onDropRejected: handleDropReject,
    });
    const getBorder = () => {
        if (isInvalidDrag) {
            return '4px dashed var(--g-color-line-danger)';
        }
        return isDraggingOver
            ? '4px dashed var(--g-color-line-info)'
            : '4px dashed var(--g-color-line-misc)';
    };
    return (
        <div
            style={{
                width: '400px',
                height: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '16px',
                border: getBorder(),
            }}
            {...getDroppableProps()}
        >
            <Text color={isDraggingOver ? 'primary' : 'secondary'}>Drop Something Here</Text>
            <Icon size="32" data={FileArrowDown} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
