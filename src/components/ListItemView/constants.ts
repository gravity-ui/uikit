import type {ListItemViewProps} from './ListItemView';

/** The `min-height` of a row per size: `$height-s`…`$height-xl` of components/variables.scss */
export const LIST_ITEM_VIEW_MIN_HEIGHT: Record<NonNullable<ListItemViewProps['size']>, number> = {
    s: 24,
    m: 28,
    l: 36,
    xl: 44,
};
