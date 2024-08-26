import React from 'react';

import {Breadcrumbs} from '../Breadcrumbs';

import type {Props} from './cases';

export const TestBreadcrumbsWithCustomRenderers = (props: Props) => {
    return (
        <Breadcrumbs
            renderRootContent={(item, isCurrent) => {
                return (
                    <div style={isCurrent ? undefined : {border: '1px dotted tomato'}}>
                        ${item.text} [Custom]
                    </div>
                );
            }}
            renderItemContent={(item, isCurrent) => {
                return (
                    <div style={isCurrent ? undefined : {border: '1px dotted blue'}}>
                        ${item.text} [Custom]
                    </div>
                );
            }}
            renderItemDivider={() => {
                return <div style={{border: '1px dotted tomato'}}>[Divider]</div>;
            }}
            renderItem={({children, isCurrent}) => {
                return (
                    <div style={isCurrent ? undefined : {border: '1px dotted orange'}}>
                        {children}
                    </div>
                );
            }}
            {...props}
        />
    );
};
