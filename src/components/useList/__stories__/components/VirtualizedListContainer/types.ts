import type {VariableSizeListProps} from 'react-window';

export interface ListContainerRenderProps<T>
    extends Omit<
        VariableSizeListProps,
        'children' | 'itemData' | 'itemCount' | 'width' | 'height'
    > {
    items: T[];
    children(props: T, index: number): React.ReactNode;
}
