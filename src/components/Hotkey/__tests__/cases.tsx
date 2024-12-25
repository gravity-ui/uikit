import type {Cases} from '../../../stories/tests-factory/models';
import type {HotkeyProps} from '../Hotkey';

export const valueCases: Cases<HotkeyProps['value']> = [
    'mod+a',
    'mod+a mod+c',
    'mod+a mod+c mod+v',
];

export const platformCases: Cases<HotkeyProps['platform']> = ['pc', 'mac'];
