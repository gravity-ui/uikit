import * as React from 'react';

import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Menu} from '../../lab/Menu';
import {Flex} from '../../layout';
import {Tab} from '../Tab';
import {TabContent} from '../TabContent';
import {bTabListCollapseItem} from '../constants';
import type {TabListCollapseItemProps, TabProps} from '../types';
import {getTabNodePropsFromReactNode} from '../utils';

import './TabListCollapseItem.scss';

export const TabListCollapseItem = React.forwardRef<HTMLButtonElement, TabListCollapseItemProps>(
    (
        {children, selectedChild}: TabListCollapseItemProps,
        ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
        const childrenCount = React.Children.count(children);

        if (!childrenCount && !selectedChild) {
            return null;
        }

        const selectedTabProps = selectedChild
            ? getTabNodePropsFromReactNode(selectedChild)
            : undefined;

        const trigger = (
            <Flex
                ref={ref}
                as="button"
                alignItems="center"
                gap="2"
                className={bTabListCollapseItem({lone: Boolean(selectedTabProps)})}
            >
                {selectedTabProps ? (
                    <TabContent
                        icon={selectedTabProps.icon}
                        value={selectedTabProps.value}
                        counter={selectedTabProps.counter}
                        label={selectedTabProps.label}
                    >
                        {selectedTabProps.children}
                    </TabContent>
                ) : (
                    <Text variant="inherit" className={bTabListCollapseItem('text')}>
                        More
                    </Text>
                )}
                <Text variant="inherit" className={bTabListCollapseItem('count')}>
                    {childrenCount}
                </Text>
                <Icon data={ChevronDown} className={bTabListCollapseItem('chevron')} />
            </Flex>
        );

        return (
            <Menu placement={['bottom-start', 'bottom-end']} trigger={trigger}>
                {React.Children.map(children, (child, index) => {
                    if (!React.isValidElement<TabProps>(child)) {
                        return null;
                    }

                    const key = child.key ?? index;
                    const isMenuItem = true;
                    const className = [bTabListCollapseItem('menu-item'), child.props.className]
                        .filter(Boolean)
                        .join(' ');

                    if (child.type === Tab) {
                        return React.cloneElement(child, {key, isMenuItem, className});
                    }

                    const tabProps = getTabNodePropsFromReactNode(child);

                    if (!tabProps) {
                        return null;
                    }

                    return (
                        <Tab
                            {...tabProps}
                            key={key}
                            isMenuItem={isMenuItem}
                            className={className}
                        />
                    );
                })}
            </Menu>
        );
    },
);

TabListCollapseItem.displayName = 'TabListCollapseItem';
