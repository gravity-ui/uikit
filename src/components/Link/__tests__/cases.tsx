import type {Cases} from '../../../stories/tests-factory/models';
import type {LinkProps} from '../Link';

export const underlineCases: Cases<LinkProps['underline']> = [true];
export const visitableCases: Cases<LinkProps['visitable']> = [true];
export const viewCases: Cases<LinkProps['view']> = ['normal', 'primary', 'secondary'];
