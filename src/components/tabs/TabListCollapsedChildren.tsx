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

const isChildDOMElementCollapsible = (el: HTMLElement) => {
    return isTabElement(el) && el.ariaSelected !== 'true';
};

const getChildDOMElementWidth = (el: HTMLElement) => {
    if (isTabElement(el)) {
        return getTabWidth(el);
    }

    return el.offsetWidth;
};

export const TabListCollapsedChildren = ({
    children,
    tabsListContainerRef,
}: TabListCollapsedChildrenProps) => {
    const tabContext = React.useContext(TabContext);

    const isReactChildNodeCollapsible = React.useCallback(
        (child: React.ReactNode) =>
            React.isValidElement(child) &&
            child.type === Tab &&
            tabContext?.value !== child.props['value'],
        [tabContext?.value],
    );

    const {shownChildren, collapsedChildren} = useElementChildrenCollapse(
        children,
        tabsListContainerRef,
        {
            recalculateDeps: [tabContext?.value],
            isReactChildNodeCollapsible,
            isChildDOMElementCollapsible,
            getChildDOMElementWidth,
        },
    );

    return (
        <React.Fragment>
            {shownChildren}

            <TabsDropdownMenu data-breadcrumbs-menu-item={true}>
                {collapsedChildren}
            </TabsDropdownMenu>
        </React.Fragment>
    );
};
