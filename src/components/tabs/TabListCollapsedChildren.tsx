import * as React from 'react';

import {useCollapseElementVisibleChildrenCount} from '../../hooks/private/useCollapseElementVisibleChildrenCount';

import {Tab} from './Tab';
import {TabsDropdownMenu} from './TabListDropdownMenu';
import {bTabListDropdownMenu} from './constants';
import {TabContext} from './contexts/TabContext';
import type {TabListCollapsedChildrenProps} from './types';

const getTabWidth = (el?: HTMLElement) => {
    if (!el) {
        return 0;
    }

    return el.offsetWidth + parseInt(getComputedStyle(el).marginRight, 10);
};

export const TabListCollapsedChildren = ({
    children,
    tabsListContainerRef,
}: TabListCollapsedChildrenProps) => {
    const tabContext = React.useContext(TabContext);

    const {visibleChildrenCount} = useCollapseElementVisibleChildrenCount({
        children: children,
        elementRef: tabsListContainerRef,
        recalculateDeps: [tabContext?.value],
        calculateVisibleChildrenCount: () => {
            const listEl = tabsListContainerRef.current;

            if (!listEl) {
                return 0;
            }

            const childrenList = Array.from(listEl.children) as Array<HTMLElement>;

            let selectElementWidth = 0;

            if (childrenList.at(-1)?.classList.contains(bTabListDropdownMenu())) {
                const selectItem = childrenList.pop();
                selectElementWidth = selectItem?.offsetWidth || 0;
            }

            const listWidth = listEl.offsetWidth - selectElementWidth;

            const selectedEl = childrenList.find((item) => item.ariaSelected === 'true');
            const selectedElWidth = getTabWidth(selectedEl);

            let visibleElements = 1;
            let summaryVisibleElementsWidth = selectedElWidth;

            for (let index = 0; index < childrenList.length; index++) {
                const el = childrenList[index];

                if (el === selectedEl) {
                    continue;
                }

                const currentElWidth = getTabWidth(el);

                if (summaryVisibleElementsWidth + currentElWidth > listWidth) {
                    break;
                }

                visibleElements++;
                summaryVisibleElementsWidth += currentElWidth;
            }

            return visibleElements;
        },
    });

    const childrenList = React.Children.map(children, (child) => child) || [];

    let selectedRendered = false;
    const shownChildrenList: typeof childrenList = [];
    const collapseChildrenList: typeof childrenList = [];

    for (let index = 0; index < childrenList.length; index++) {
        const child = childrenList[index];

        if (!React.isValidElement(child) || child.type !== Tab) {
            shownChildrenList.push(child);
            continue;
        }

        const elementValue = child.props['value'];

        if (tabContext?.value === elementValue) {
            shownChildrenList.push(child);
            selectedRendered = true;
            continue;
        }

        if (index < visibleChildrenCount - Number(!selectedRendered)) {
            shownChildrenList.push(child);
        } else {
            collapseChildrenList.push(child);
        }
    }

    return (
        <React.Fragment>
            {shownChildrenList}

            <TabsDropdownMenu data-breadcrumbs-menu-item={true}>
                {collapseChildrenList}
            </TabsDropdownMenu>
        </React.Fragment>
    );
};
