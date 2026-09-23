import type * as React from 'react';

import type {UseOpenProps} from '../../../../../../../hooks/useSelect/types';
import type {PopupPlacement} from '../../../../../../Popup';
import type {SelectPopupProps} from '../../../../../../Select/components/SelectPopup/types';
import type {TreeListProps, TreeListRenderContainer, TreeListRenderItem} from '../TreeList/types';
import type {ListItemId} from '../types';

export type TreeSelectRenderControlProps = {
    toggleOpen(): void;
};

export type TreeSelectRenderItem<T, P extends {} = {}> = TreeListRenderItem<T, P>;
export type TreeSelectRenderContainer<T> = TreeListRenderContainer<T>;

export interface TreeSelectProps<T, P extends {} = {}>
    extends Pick<TreeListProps<T, P>, 'renderItem' | 'mapItemDataToContentProps'>,
        Pick<UseOpenProps, 'open' | 'onOpenChange'> {
    className?: string;
    items: T[];
    value: ListItemId[];
    onUpdate(value: ListItemId[]): void;
    popupWidth?: SelectPopupProps['width'];
    placement?: PopupPlacement;
    slotBeforeListBody?: React.ReactNode;
    renderControl(props: TreeSelectRenderControlProps): React.JSX.Element;
    renderContainer: TreeSelectRenderContainer<T>;
}
