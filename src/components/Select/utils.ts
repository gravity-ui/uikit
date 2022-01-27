import {PopupPlacement} from '../Popup';
import {SelectProps, SelectOption, SelectOptgroup} from './types';
import {
    BORDER_WIDTH,
    CONTAINER_VERTICAL_MARGIN,
    GROUP_ITEM_MARGIN_TOP,
    SIZE_TO_ITEM_HEIGHT,
} from './constants';

// "disable" property needs to deactivate group title item in List
type GroupTitleItem = {label: string; groupTitle: true; disabled: true};

export type FlattenOption = SelectOption | GroupTitleItem;

export const getFlattenOptions = (options: (SelectOption | SelectOptgroup)[]): FlattenOption[] => {
    return options.reduce((acc, option) => {
        if ('options' in option) {
            acc.push({label: option.label, groupTitle: true, disabled: true});
            acc.push(...option.options);
        } else {
            acc.push(option);
        }

        return acc;
    }, [] as FlattenOption[]);
};

export const getListboxItemHeight = (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    size: NonNullable<SelectProps['size']>;
    option: FlattenOption;
    index: number;
}) => {
    const {getOptionHeight, size, option, index} = args;

    if ('groupTitle' in option) {
        const marginTop = index === 0 ? 0 : GROUP_ITEM_MARGIN_TOP;
        return SIZE_TO_ITEM_HEIGHT[size] + marginTop;
    }

    return getOptionHeight ? getOptionHeight(option) : SIZE_TO_ITEM_HEIGHT[size];
};

export const getListboxHeight = (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    size: NonNullable<SelectProps['size']>;
    options: FlattenOption[];
}) => {
    const {getOptionHeight, size, options} = args;
    return options.reduce((height, option, index) => {
        return height + getListboxItemHeight({getOptionHeight, size, option, index});
    }, 0);
};

export const getPopupVerticalOffset = (args: {listboxHeight: number; controlRect?: DOMRect}) => {
    const {listboxHeight, controlRect} = args;

    if (!controlRect) {
        return BORDER_WIDTH;
    }

    const vh = window.innerHeight / 100;
    const heigth5vh = vh * 5;
    const heigth90vh = vh * 90;
    const containerHeight = heigth90vh < listboxHeight ? heigth90vh : listboxHeight;
    const popupPlacement: PopupPlacement =
        controlRect.y + controlRect.height / 2 < window.innerHeight / 2
            ? 'bottom-start'
            : 'top-start';
    const screenOffset =
        popupPlacement === 'bottom-start'
            ? window.innerHeight - controlRect.y - controlRect.height
            : controlRect.y;

    let offset = BORDER_WIDTH;

    if (containerHeight > screenOffset) {
        offset = (containerHeight - screenOffset) * -1 - heigth5vh - CONTAINER_VERTICAL_MARGIN;
    }

    return offset;
};
