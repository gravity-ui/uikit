import type * as React from 'react';

import {ListSectionHeader} from '../../List/SectionHeader';
import {ListItemView} from '../ListItemView';

const SIZES = ['s', 'm', 'l', 'xl'] as const;

export function CssApiRows() {
    return (
        <div
            style={
                {
                    '--g-list-item-view-min-height': '48px',
                    '--g-list-item-view-padding-inline': '20px',
                    '--g-list-item-view-padding-block': '3px',
                    '--g-list-item-view-border-radius': '0px',
                } as React.CSSProperties
            }
        >
            {SIZES.map((size) => (
                <ListItemView key={size} size={size} data-qa={`row-${size}`}>
                    {size}
                </ListItemView>
            ))}
            <ListItemView data-qa="row-default">default</ListItemView>
            <ListSectionHeader qa="header" data-first-row="">
                header
            </ListSectionHeader>
        </div>
    );
}

export function MinHeightRows() {
    return (
        <div style={{'--g-list-item-view-min-height': '48px'} as React.CSSProperties}>
            {SIZES.map((size) => (
                <ListItemView key={size} size={size} data-qa={`row-${size}`}>
                    {size}
                </ListItemView>
            ))}
        </div>
    );
}

export function SizeRows() {
    return (
        <div style={{width: 300}}>
            {SIZES.map((size) => (
                <ListItemView key={size} size={size} data-qa={`row-${size}`}>
                    <span data-qa={`text-${size}`}>{size}</span>
                </ListItemView>
            ))}
            {SIZES.map((size) => (
                <ListItemView
                    key={size}
                    size={size}
                    description="Description"
                    data-qa={`described-${size}`}
                >
                    {size}
                </ListItemView>
            ))}
            <ListItemView data-qa="row-default">default</ListItemView>
            <ListItemView isContainer data-qa="row-container">
                container
            </ListItemView>
        </div>
    );
}
