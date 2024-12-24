import type {Cases} from '../../../stories/tests-factory/models';
import type {PaletteProps} from '../Palette';

export const sizeCases: Cases<PaletteProps['size']> = ['xs', 's', 'm', 'l', 'xl'];
export const columnsCases: Cases<PaletteProps['columns']> = [2];
