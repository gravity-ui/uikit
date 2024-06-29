import type {Cases} from '../../../stories/tests-factory/models';
import type {ButtonProps} from '../Button';

export const defaultProps: ButtonProps = {
    children: 'Text',
};

export const sizeCases: Cases<ButtonProps['size']> = [
    ['xs', 'xs'],
    ['s', 's'],
    ['m', 'm'],
    ['l', 'l'],
    ['xl', 'xl'],
];

export const selectedCases: Cases<ButtonProps['selected']> = [['selected', true]];

export const disabledCases: Cases<ButtonProps['disabled']> = [['disabled', true]];

export const loadingCases: Cases<ButtonProps['loading']> = [['loading', true]];

export const viewsCases: Cases<ButtonProps['view']> = [
    ['normal', 'normal'],
    ['action', 'action'],
    ['outlined', 'outlined'],
    ['outlined-info', 'outlined-info'],
    ['outlined-success', 'outlined-success'],
    ['outlined-warning', 'outlined-warning'],
    ['outlined-danger', 'outlined-danger'],
    ['outlined-utility', 'outlined-utility'],
    ['outlined-action', 'outlined-action'],
    ['raised', 'raised'],
    ['flat', 'flat'],
    ['flat-secondary', 'flat-secondary'],
    ['flat-info', 'flat-info'],
    ['flat-success', 'flat-success'],
    ['flat-warning', 'flat-warning'],
    ['flat-danger', 'flat-danger'],
    ['flat-utility', 'flat-utility'],
    ['flat-action', 'flat-action'],
    ['normal-contrast', 'normal-contrast'],
    ['outlined-contrast', 'outlined-contrast'],
    ['flat-contrast', 'flat-contrast'],
];

export const pinsCases: Cases<ButtonProps['pin']> = [
    ['round-round', 'round-round'],
    ['brick-brick', 'brick-brick'],
    ['clear-clear', 'clear-clear'],
    ['circle-circle', 'circle-circle'],
    ['round-brick', 'round-brick'],
    ['brick-round', 'brick-round'],
    ['round-clear', 'round-clear'],
    ['clear-round', 'clear-round'],
    ['brick-clear', 'brick-clear'],
    ['clear-brick', 'clear-brick'],
    ['circle-brick', 'circle-brick'],
    ['brick-circle', 'brick-circle'],
    ['circle-clear', 'circle-clear'],
    ['clear-circle', 'clear-circle'],
];
