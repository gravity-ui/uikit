import {FileArrowDown} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Icon, Text} from '../../../../components';
import {useDropZone} from '../useDropZone';

export default {title: 'Hooks/useDropZone'} as Meta;

const ACCEPT = ['image/*'];

const DefaultTemplate: StoryFn = () => {
    const getHandler =
        (rejected: boolean) => (items: DataTransferItemList | DataTransferItem[]) => {
            for (const item of items) {
                if (item.kind === 'string') {
                    item.getAsString((text) => {
                        alert(`String: ${text}`);
                    });
                }

                if (item.kind === 'file') {
                    const file = item.getAsFile();

                    alert(
                        `File${rejected ? ' REJECT' : ''}: name: ${file?.name}, size: ${file?.size}, type: ${file?.type}`,
                    );
                }
            }
        };

    const {isDraggingOver, isInvalidDrag, getDroppableProps} = useDropZone({
        accept: ACCEPT,
        onDrop: getHandler(false),
        onDropRejected: getHandler(true),
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
