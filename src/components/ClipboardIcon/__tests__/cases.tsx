import type {Cases} from '../../../stories/tests-factory/models';
import type {ClipboardIconProps} from '../ClipboardIcon';

export const sizeCases: Array<ClipboardIconProps['size']> = [10, 20, 30];

export const statusCases: Cases<ClipboardIconProps['status']> = ['pending', 'success', 'error'];
