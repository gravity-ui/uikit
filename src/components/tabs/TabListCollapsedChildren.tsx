import * as React from 'react';

import {useElementChildrenCollapse} from '../../hooks/useElementChildrenCollapse';

import {Tab} from './Tab';
import {TabsDropdownMenu} from './TabListDropdownMenu';
import {bTab} from './constants';
import {TabContext} from './contexts/TabContext';
import type {TabListCollapsedChildrenProps} from './types';

const getTabWidth = (el?: HTMLElement) => {
    if (!el) {
        return 0;
    }

    return el.offsetWidth + parseInt(getComputedStyle(el).marginRight, 10);
};

const isTabElement = (el: HTMLElement) => {
    return el.classList.contains(bTab());
};

export const TabListCollapsedChildren = ({
    children,
    tabsListContainerRef,
}: TabListCollapsedChildrenProps) => {
    const tabContext = React.useContext(TabContext);

    const {visibleChildrenCount} = useElementChildrenCollapse(children, tabsListContainerRef, {
        recalculateDeps: [tabContext?.value],
        isChildDOMElementCollapsible: (el) => isTabElement(el) && el.ariaSelected !== 'true',
        getChildDOMElementWidth: (el) => {
            if (isTabElement(el)) {
                return getTabWidth(el);
            }

            return el.offsetWidth;
        },
    });

    const isReactChildNodeCollapsible = React.useCallback(
        (child: React.ReactNode) =>
            React.isValidElement(child) &&
            child.type === Tab &&
            tabContext?.value !== child.props['value'],
        [tabContext?.value],
    );

    const childrenList = React.Children.map(children, (child) => child) || [];

    const shownChildren: typeof childrenList = [];
    const collapsedChildren: typeof childrenList = [];

    const notCollapsibleChildren = childrenList.filter(
        (child) => !isReactChildNodeCollapsible(child),
    );

    let reservedShownChildrenCount = notCollapsibleChildren.length;

    childrenList.forEach((child) => {
        if (!isReactChildNodeCollapsible(child)) {
            shownChildren.push(child);
            reservedShownChildrenCount--;
            return;
        }

        if (shownChildren.length < visibleChildrenCount - reservedShownChildrenCount + 1) {
            shownChildren.push(child);
        } else {
            collapsedChildren.push(child);
        }
    });

    return (
        <React.Fragment>
            {shownChildren}

            <TabsDropdownMenu data-breadcrumbs-menu-item={true}>
                {collapsedChildren}
            </TabsDropdownMenu>
        </React.Fragment>
    );
};
