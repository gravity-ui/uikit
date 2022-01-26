import {PopupPlacement} from '../../Popup';
import {SelectProps, SelectOption, SelectOptgroup} from '../types';
import {FlattenOption} from './types';

const SIZE_TO_ITEM_HEIGHT: Record<NonNullable<SelectProps['size']>, number> = {
    s: 28,
    m: 28,
    l: 32,
    xl: 36,
};
const GROUP_ITEM_MARGIN_TOP = 5;
const CONTAINER_VERTICAL_MARGIN = 4;

export const getFlattenOptions = <T extends unknown>(
    options: (SelectOption<T> | SelectOptgroup<T>)[],
): FlattenOption<T>[] => {
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

export const getListboxItemHeight = <T extends unknown>(args: {
    getOptionHeight?: SelectProps<T>['getOptionHeight'];
    size: NonNullable<SelectProps<T>['size']>;
    option: FlattenOption<T>;
    index: number;
}) => {
    const {getOptionHeight, size, option, index} = args;

    if ('groupTitle' in option) {
        const marginTop = index === 0 ? 0 : GROUP_ITEM_MARGIN_TOP;
        return SIZE_TO_ITEM_HEIGHT[size] + marginTop;
    }

    return getOptionHeight ? getOptionHeight(option) : SIZE_TO_ITEM_HEIGHT[size];
};

export const getListboxHeight = <T extends unknown>(args: {
    getOptionHeight?: SelectProps<T>['getOptionHeight'];
    size: NonNullable<SelectProps<T>['size']>;
    options: FlattenOption<T>[];
}) => {
    const {getOptionHeight, size, options} = args;
    return options.reduce((height, option, index) => {
        return height + getListboxItemHeight({getOptionHeight, size, option, index});
    }, 0);
};

export const getPopupVerticalOffset = (args: {listboxHeight: number; controlRect?: DOMRect}) => {
    const {listboxHeight, controlRect} = args;

    if (!controlRect) {
        return 0;
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

    let offset = 0;

    if (containerHeight > screenOffset) {
        offset = (containerHeight - screenOffset) * -1 - heigth5vh - CONTAINER_VERTICAL_MARGIN;
    }

    return offset;
};
