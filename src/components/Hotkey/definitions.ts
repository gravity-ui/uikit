import type {Platform, PlatformDefs} from './types';

type KnownKeys = {
    up: 'up';
    down: 'down';
    right: 'right';
    left: 'left';

    arrowup: 'arrowup';
    arrowdown: 'arrowdown';
    arrowright: 'arrowright';
    arrowleft: 'arrowleft';

    esc: 'esc';
    escape: 'escape';

    plus: 'plus';
    minus: 'minus';

    shift: 'shift';
    tab: 'tab';

    backspace: 'backspace';

    enter: 'enter';
    return: 'return';

    mod: 'mod';

    ctrl: 'ctrl';
    control: 'control';

    alt: 'alt';
    opt: 'opt';
    option: 'option';

    cmd: 'cmd';
    command: 'command';
};

type CommonKeys = keyof Pick<
    KnownKeys,
    'up' | 'down' | 'right' | 'left' | 'escape' | 'plus' | 'minus' | 'shift' | 'tab' | 'backspace'
>;

type PcKeys = keyof Pick<KnownKeys, CommonKeys | 'enter' | 'ctrl' | 'alt'>;

type MacKeys = keyof Pick<KnownKeys, CommonKeys | 'return' | 'control' | 'option' | 'command'>;

const PcNormalizeMap: Record<Exclude<keyof KnownKeys, PcKeys>, PcKeys> = {
    arrowup: 'up',
    arrowdown: 'down',
    arrowleft: 'left',
    arrowright: 'right',
    esc: 'escape',

    return: 'enter',
    mod: 'ctrl',
    control: 'ctrl',
    opt: 'alt',
    option: 'alt',
    cmd: 'ctrl',
    command: 'ctrl',
};

const MacNormalizeMap: Record<Exclude<keyof KnownKeys, MacKeys>, MacKeys> = {
    arrowup: 'up',
    arrowdown: 'down',
    arrowleft: 'left',
    arrowright: 'right',
    esc: 'escape',

    enter: 'return',
    mod: 'command',
    ctrl: 'control',
    alt: 'option',
    opt: 'option',
    cmd: 'command',
};

const PcDisplayName: Record<PcKeys, string> = {
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
    escape: 'Esc',

    plus: '＋',
    minus: '－',

    enter: 'Enter',
    ctrl: 'Ctrl',
    alt: 'Alt',
    shift: 'Shift',
    tab: 'Tab',
    backspace: 'Backspace',
};

const MacDisplayName: Record<MacKeys, string> = {
    up: '▲',
    down: '▼',
    left: '◀',
    right: '▶',
    escape: 'esc',

    plus: '＋',
    minus: '－',

    return: '⏎',
    command: '⌘',
    option: '⌥',
    control: '⌃',
    shift: '⇧',
    backspace: '⌫',
    tab: '⇥',
};

const PcKeyPriority: Partial<Record<PcKeys, number>> = {
    shift: 200,
    alt: 300,
    ctrl: 400,
};

const MacKeyPriority: Partial<Record<MacKeys, number>> = {
    command: 100,
    shift: 200,
    option: 300,
    control: 400,
};

export const defsByPlatform: Record<Platform, PlatformDefs> = {
    pc: {
        NormalizeMap: PcNormalizeMap,
        Priority: PcKeyPriority,
        DisplayName: PcDisplayName,
    },
    mac: {
        NormalizeMap: MacNormalizeMap,
        Priority: MacKeyPriority,
        DisplayName: MacDisplayName,
    },
};
