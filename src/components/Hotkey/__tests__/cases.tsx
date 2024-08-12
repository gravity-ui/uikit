import type {Cases} from '../../../stories/tests-factory/models';
import type {HotkeyProps} from '../Hotkey';

export const viewCases: Cases<HotkeyProps['view']> = ['light', 'dark'];
export const platformCases: Cases<HotkeyProps['platform']> = ['pc', 'mac'];
