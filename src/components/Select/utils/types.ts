import {SelectOption} from '../types';

// "disable" property needs to deactivate group title item in List
type GroupTitleItem = {label: string; groupTitle: true; disabled: true};

export type FlattenOption<T = unknown> = SelectOption<T> | GroupTitleItem;
