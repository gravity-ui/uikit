import type {Cases} from '../../../stories/tests-factory/models';
import type {SelectProps} from '../types';

export const sizeCases: Cases<SelectProps<string>['size']> = ['s', 'm', 'l', 'xl'];

export const viewCases: Cases<SelectProps<string>['view']> = ['normal', 'clear'];

export const pinCases: Cases<SelectProps<string>['pin']> = [
    'round-round',
    'brick-brick',
    'clear-clear',
    'round-brick',
    'brick-round',
    'round-clear',
    'clear-round',
    'brick-clear',
    'clear-brick',
];

export const widthCases: Cases<SelectProps<string>['width']> = ['auto', 'max', 200];

export const labelCases: Cases<SelectProps<string>['label']> = ['Test label'];

export const placeholderLabelCases: Cases<SelectProps<string>['placeholder']> = ['Placeholder'];

export const errorPlacementCases: Cases<SelectProps<string>['errorPlacement']> = [
    'outside',
    'inside',
];

export const popupWidthCases: Cases<SelectProps<string>['popupWidth']> = ['fit', 200];

export const popupPlacementCases: Cases<SelectProps<string>['popupPlacement']> = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
];

export const validationStateCases: Cases<SelectProps<string>['validationState']> = ['invalid'];

export const hasCounterCases: Cases<SelectProps<string>['hasCounter']> = [true];

export const filterPlaceholderCases: Cases<SelectProps<string>['filterPlaceholder']> = [
    'Filter placeholder',
];
