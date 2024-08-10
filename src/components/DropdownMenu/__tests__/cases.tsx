import React from 'react';

import {Bars} from '@gravity-ui/icons';

import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import {Icon} from '../../Icon';
import type {DropdownMenuProps} from '../DropdownMenu';

export type ItemData = {};

/* eslint-disable react/jsx-key */

export const sizeCases: Cases<DropdownMenuProps<ItemData>['size']> = ['m', 'l', 'xl'];
export const iconCases: CasesWithName<DropdownMenuProps<ItemData>['icon']> = [
    ['', <Icon data={Bars} />],
];
export const disabledCases: Cases<DropdownMenuProps<ItemData>['disabled']> = [true];
export const customSwitcherCases: CasesWithName<DropdownMenuProps<ItemData>['renderSwitcher']> = [
    ['', () => <div>Custom switcher</div>],
];

/* eslint-enable react/jsx-key */
