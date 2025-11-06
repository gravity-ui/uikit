import {FileArrowDown} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Icon, Text} from '../../../components';
import {useDropZone} from '../useDropZone';
import type {UseDropZoneParams} from '../useDropZone';

export default {title: 'Hooks/useDropZone'} as Meta;

const ACCEPT = ['text/plain', 'image/*'];

const DefaultTemplate: StoryFn = () => {
    const handleDrop: UseDropZoneParams['onDrop'] = (items) => {
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

    const {isDraggingOver, getDroppableProps} = useDropZone({
        accept: ACCEPT,
        onDrop: handleDrop,
    });

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
                border: isDraggingOver
                    ? '4px dashed var(--g-color-line-info)'
                    : '4px dashed var(--g-color-line-misc)',
            }}
            {...getDroppableProps()}
        >
            <Text color={isDraggingOver ? 'primary' : 'secondary'}>Drop Something Here</Text>
            <Icon size="32" data={FileArrowDown} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
