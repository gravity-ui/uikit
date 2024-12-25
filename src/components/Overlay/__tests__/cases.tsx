import type {Cases} from '../../../stories/tests-factory/models';
import type {OverlayProps} from '../Overlay';

export const backgroundCases: Cases<OverlayProps['background']> = ['base', 'float'];
export const visibleCases: Cases<OverlayProps['visible']> = [false];
