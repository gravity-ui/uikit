import * as React from 'react';

import type {ListItemData} from '../../List';
import type {PopupProps} from '../../Popup';
import type {TextInputPin, TextInputSize} from '../../controls';
import {Suggest} from '../Suggest';

import {VisualTestQA} from './constants';

export type TestSuggestProps = {
    size?: TextInputSize;
    pin?: TextInputPin;
    disabled?: boolean;
    hasClear?: boolean;
    popupWidth?: 'fit' | 'auto' | number;
    customPopup?: boolean;
};

type Item = {
    value: string;
    content: string;
    description?: string;
    separator?: boolean;
};

const ITEMS: Array<ListItemData<Item>> = [
    {value: 'sep-fruits', content: 'Fruits', separator: true, disabled: true},
    {value: 'apple', content: 'Apple', description: 'Crisp & sweet'},
    {value: 'banana', content: 'Banana', description: 'Ripe, high-potassium'},
    {value: 'strawberry', content: 'Strawberry', description: 'Seasonal berries'},
    {value: 'durian', content: 'Durian', description: 'Very polarizing aroma', disabled: true},
    {value: 'sep-vegetables', content: 'Vegetables', separator: true, disabled: true},
    {value: 'carrot', content: 'Carrot', description: 'Great for roasting'},
    {value: 'broccoli', content: 'Broccoli', description: 'Steam or stir-fry'},
    {value: 'eggplant', content: 'Eggplant', description: 'Best grilled'},
    {value: 'sep-herbs', content: 'Herbs', separator: true, disabled: true},
    {value: 'basil', content: 'Basil', description: 'Pairs with tomato'},
    {value: 'mint', content: 'Mint', description: 'Cold drinks, desserts'},
];

export function TestSuggest(props: TestSuggestProps) {
    const {size = 'm', pin = 'round-round', disabled, hasClear, popupWidth, customPopup} = props;
    const [filter, setFilter] = React.useState('');

    const popupProps: PopupProps = {
        qa: VisualTestQA.popup,
        placement: 'bottom-start',
    };

    return (
        <div style={{width: 320, padding: 8}}>
            <Suggest<Item>
                filter={filter}
                onFilterUpdate={setFilter}
                items={ITEMS}
                popupWidth={popupWidth}
                fragmentProps={{
                    propsTextInput: {
                        qa: VisualTestQA.input,
                        placeholder: 'Search fruits & vegetables…',
                        size,
                        pin,
                        disabled,
                        hasClear,
                    },
                    popupProps,
                    listProps: {
                        qa: VisualTestQA.list,
                        id: 'suggest-list',
                        role: 'listbox',
                        items: ITEMS,
                        itemHeight: (item) => (item.separator ? 32 : 44),
                    },
                }}
                renderItem={(item, isActive) => {
                    if (item.separator) {
                        return (
                            <div style={{fontSize: 12, opacity: 0.7, fontWeight: 600}}>
                                {item.content}
                            </div>
                        );
                    }

                    return (
                        <div
                            style={{
                                color: item.disabled ? 'gray' : 'inherit',
                                fontWeight: isActive ? 600 : undefined,
                            }}
                        >
                            <div>{item.content}</div>
                            {item.description ? (
                                <div style={{opacity: 0.7, fontSize: 12}}>{item.description}</div>
                            ) : null}
                        </div>
                    );
                }}
                renderPopupContent={
                    customPopup
                        ? ({list}) => (
                              <div style={{padding: 8}}>
                                  <div style={{marginBottom: 8}}>Before list</div>
                                  {list}
                                  <div style={{marginTop: 8}}>After list</div>
                              </div>
                          )
                        : undefined
                }
            />
        </div>
    );
}
