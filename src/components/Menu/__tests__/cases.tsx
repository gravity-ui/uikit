import type {Cases} from '../../../stories/tests-factory/models';
import type {MenuItemProps, MenuProps} from '../Menu';

export const sizeCases: Cases<MenuProps['size']> = ['s', 'm', 'l', 'xl'];

export const disabledCases: Cases<MenuItemProps['disabled']> = [true];
export const activeCases: Cases<MenuItemProps['active']> = [true];
export const selectedCases: Cases<MenuItemProps['selected']> = [true];
export const themeCases: Cases<MenuItemProps['theme']> = ['normal', 'danger'];
