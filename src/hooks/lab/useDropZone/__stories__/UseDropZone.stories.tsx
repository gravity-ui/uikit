import {FileArrowDown} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Icon, Text} from '../../../../components';
import {useDropZone} from '../useDropZone';

export default {title: 'Hooks/useDropZone'} as Meta;

const DefaultTemplate: StoryFn = () => {
    const handleDrop = (event: DragEvent) => {
        for (const item of Array.from(event.dataTransfer?.items || [])) {
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

    const {isDraggingOver, getDroppableProps} = useDropZone({onDrop: handleDrop});
    const getBorder = () => {
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
