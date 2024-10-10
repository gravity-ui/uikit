import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {PersonaWrapProps} from '../PersonaWrap';

export const themeCases: Cases<PersonaWrapProps['theme']> = ['default', 'clear'];
export const sizeCases: Cases<PersonaWrapProps['size']> = ['s', 'n'];
export const isEmptyCases: Cases<PersonaWrapProps['isEmpty']> = [true];
export const closableCases: CasesWithName<PersonaWrapProps['onClose']> = [['closable', () => {}]];
export const clickableCases: CasesWithName<PersonaWrapProps['onClick']> = [['clickable', () => {}]];
