import * as React from 'react';

import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Menu, MenuItem} from '../../lab/Menu';
import {Flex} from '../../layout';
import {bTabListCollapseItem} from '../constants';
import type {TabListCollapseItemProps} from '../types';

import './TabListCollapseItem.scss';

export const TabListCollapseItem = React.forwardRef<HTMLButtonElement, TabListCollapseItemProps>(
    ({children}: TabListCollapseItemProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
        const childrenCount = React.Children.count(children);

        if (!childrenCount) {
            return null;
        }

        return (
            <Menu
                placement={['bottom-start', 'bottom-end']}
                trigger={
                    <Flex
                        ref={ref}
                        as="button"
                        alignItems="center"
                        gap="2"
                        className={bTabListCollapseItem()}
                    >
                        <Text variant="inherit" className={bTabListCollapseItem('text')}>
                            More
                        </Text>
                        <Text variant="inherit" className={bTabListCollapseItem('count')}>
                            {childrenCount}
                        </Text>
                        <Icon data={ChevronDown} />
                    </Flex>
                }
            >
                {React.Children.map(children, (child, index) => (
                    <MenuItem
                        key={index}
                        component="div"
                        className={bTabListCollapseItem('menu-item')}
                    >
                        {child}
                    </MenuItem>
                ))}
            </Menu>
        );
    },
);

TabListCollapseItem.displayName = 'TabListCollapseItem';
