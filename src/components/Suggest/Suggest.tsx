import * as React from 'react';

import {KeyCode} from '../../constants';
import {useForkRef} from '../../hooks';
import type {ListItemData, ListProps} from '../List';
import {List} from '../List';
import type {PopupProps} from '../Popup';
import {Popup} from '../Popup';
import type {TextInputProps} from '../controls';
import {TextInput} from '../controls';
import {Flex} from '../layout';

type FragmentProps<T> = {
    listProps?: Partial<ListProps<T>>;
    popupProps?: Partial<PopupProps>;
    textInputProps?: Partial<TextInputProps>;
};

export type SuggestProps<T> = {
    filter?: string;
    fragmentProps?: FragmentProps<T>;
    items?: ListItemData<T>[];
    onFilterUpdate?: (filter: string) => void;
    onItemClick?: ListProps<T>['onItemClick'];
    popupWidth?: 'fit' | 'auto' | number;
    renderItem?: ListProps<T>['renderItem'];
    renderPopupContent?: (props: {list: React.ReactNode}) => React.ReactNode;
};

export const Suggest = React.forwardRef(SuggestInner) as <T>(
    props: SuggestProps<T> & React.RefAttributes<HTMLSpanElement>,
) => React.ReactElement;

function SuggestInner<T>(
    {
        filter,
        fragmentProps,
        items,
        onFilterUpdate,
        onItemClick,
        renderItem,
        popupWidth = 'fit',
        renderPopupContent = defaultRenderPopupContent,
    }: SuggestProps<T>,
    ref: React.Ref<HTMLSpanElement>,
) {
    const listRef = React.useRef<List<T>>(null);
    const [open, setOpen] = React.useState(false);
    const [inputElement, setInputElement] = React.useState<HTMLSpanElement | null>(null);

    const handleInputRef = React.useCallback((node: HTMLSpanElement | null) => {
        setInputElement(node);
    }, []);
    const handleRef = useForkRef(ref, handleInputRef);

    const getPopupWidth: React.CSSProperties = React.useMemo(() => {
        if (popupWidth === 'fit') {
            return inputElement ? {width: inputElement.offsetWidth} : {};
        }
        if (popupWidth === 'auto') {
            return {width: 'auto'};
        }
        if (typeof popupWidth === 'number' && Number.isFinite(popupWidth) && popupWidth > 0) {
            return {width: popupWidth};
        }

        return {};
    }, [inputElement, popupWidth]);

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLInputElement>) => {
            setOpen(true);
            fragmentProps?.textInputProps?.controlProps?.onClick?.(event);
        },
        [fragmentProps?.textInputProps],
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (!open) {
                setOpen(true);
                return;
            }
            if ([KeyCode.ARROW_DOWN, KeyCode.ARROW_UP, KeyCode.ENTER].includes(event.key)) {
                listRef?.current?.onKeyDown(event);
            }

            fragmentProps?.textInputProps?.onKeyDown?.(event);
        },
        [fragmentProps?.textInputProps, open],
    );

    const handleItemClick = React.useCallback(
        (...args: Parameters<NonNullable<ListProps<T>['onItemClick']>>) => {
            onItemClick?.(...args);
            setOpen(false);
        },
        [onItemClick],
    );

    return (
        <React.Fragment>
            <TextInput
                autoComplete={false}
                controlProps={{onClick: handleClick}}
                onKeyDown={handleKeyDown}
                onUpdate={onFilterUpdate}
                ref={handleRef}
                value={filter}
                {...fragmentProps?.textInputProps}
            />
            <Popup
                anchorElement={inputElement}
                onOpenChange={(nextOpen) => setOpen(nextOpen)}
                open={open}
                style={getPopupWidth}
                {...fragmentProps?.popupProps}
            >
                {renderPopupContent({
                    list: (
                        <Flex spacing={{px: 2, py: 1}}>
                            <List<T>
                                filterable={false}
                                items={items}
                                onItemClick={handleItemClick}
                                ref={listRef}
                                renderItem={renderItem}
                                virtualized={false}
                                {...fragmentProps?.listProps}
                            />
                        </Flex>
                    ),
                })}
            </Popup>
        </React.Fragment>
    );
}

function defaultRenderPopupContent(props: {list: React.ReactNode}) {
    return props.list;
}
