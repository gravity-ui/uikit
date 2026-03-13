import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {OverlayProps} from '../Overlay';

export const backgroundCases: Cases<OverlayProps['background']> = ['base', 'float'];
export const visibleCases: Cases<OverlayProps['visible']> = [false];
