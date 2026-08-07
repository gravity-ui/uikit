import * as React from 'react';

import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {Menu} from '../lab/Menu';

import {TabInner} from './Tab';
import {TabContent} from './TabContent';
import {bTab, bTabMore} from './constants';
import i18n from './i18n';
import type {TabMoreProps, TabProps} from './types';
import {getTabNodePropsFromReactNode} from './utils';

import './TabMore.scss';

const CHEVRON_SIZE: Record<NonNullable<TabMoreProps['size']>, number> = {
    m: 16,
    l: 16,
    xl: 20,
};

export const TabMore = React.forwardRef<HTMLButtonElement, TabMoreProps>(
    (
        {children, triggerChild, moreLabel, size = 'm'}: TabMoreProps,
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
            <button
                ref={ref}
                type="button"
                className={bTab(
                    {active: Boolean(triggerChildTabProps)},
                    bTabMore({lone: Boolean(triggerChildTabProps)}),
                )}
            >
                {triggerChildTabProps ? (
                    <TabContent {...triggerChildTabProps} />
                ) : (
                    <TabContent value="">
                        {moreLabel === undefined ? t('label_more') : moreLabel}
                    </TabContent>
                )}
                <span className={bTabMore('count')}>{childrenCount}</span>
                <Icon
                    data={ChevronDown}
                    size={CHEVRON_SIZE[size]}
                    className={bTabMore('chevron')}
                />
            </button>
        );

        return (
            <Menu placement={['bottom-start', 'bottom-end']} trigger={trigger}>
                {React.Children.map(children, (child, index) => {
                    if (!React.isValidElement<TabProps>(child)) {
                        return null;
                    }

                    const tabProps = getTabNodePropsFromReactNode(child);

                    if (!tabProps) {
                        return null;
                    }

                    return <TabInner key={child.key ?? index} isMenuItem {...tabProps} />;
                })}
            </Menu>
        );
    },
);

TabMore.displayName = 'TabMore';
