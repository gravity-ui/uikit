import * as React from 'react';

import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Menu} from '../../lab/Menu';
import {Flex} from '../../layout';
import {Tab} from '../Tab';
import {TabContent} from '../TabContent';
import {bTabListCollapseItem} from '../constants';
import i18n from '../i18n';
import type {TabListCollapseItemProps, TabProps} from '../types';
import {getTabNodePropsFromReactNode} from '../utils';

import './TabListCollapseItem.scss';

const CHEVRON_SIZE: Record<NonNullable<TabListCollapseItemProps['size']>, number> = {
    m: 16,
    l: 16,
    xl: 20,
};

export const TabListCollapseItem = React.forwardRef<HTMLButtonElement, TabListCollapseItemProps>(
    (
        {children, triggerChild, moreLabel, size = 'm'}: TabListCollapseItemProps,
        ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
        const {t} = i18n.useTranslation();
        const childrenCount = React.Children.count(children);

        if (!childrenCount && !triggerChild) {
            return null;
        }

        const triggerChildTabProps = triggerChild
            ? getTabNodePropsFromReactNode(triggerChild)
            : undefined;

        const trigger = (
            <Flex
                ref={ref}
                as="button"
                alignItems="center"
                gap="2"
                className={[
                    bTabListCollapseItem({lone: Boolean(triggerChildTabProps)}),
                    triggerChildTabProps ? 'g-tab_active' : undefined,
                ]
                    .filter(Boolean)
                    .join(' ')}
            >
                {triggerChildTabProps ? (
                    <TabContent {...triggerChildTabProps} />
                ) : (
                    <Text variant="inherit" className={bTabListCollapseItem('text')}>
                        {moreLabel === undefined ? t('label_more') : moreLabel}
                    </Text>
                )}
                <Text variant="inherit" className={bTabListCollapseItem('count')}>
                    {childrenCount}
                </Text>
                <Icon
                    data={ChevronDown}
                    size={CHEVRON_SIZE[size]}
                    className={bTabListCollapseItem('chevron')}
                />
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
