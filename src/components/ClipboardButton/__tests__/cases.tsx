import type {CasesWithName} from '../../../stories/tests-factory/models';
import {
    sizeCases as buttonSizeCases,
    viewsCases as buttonViewsCases,
} from '../../Button/__tests__/cases';
import type {ClipboardButtonProps} from '../ClipboardButton';

export const sizeCases: CasesWithName<ClipboardButtonProps['size']> = buttonSizeCases;
export const viewCases: CasesWithName<ClipboardButtonProps['view']> = buttonViewsCases;
