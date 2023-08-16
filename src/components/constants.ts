export enum EKeyCode {
    BACKSPACE = 'BACKSPACE',
    ENTER = 'ENTER',
    TAB = 'TAB',
    SPACEBAR = 'SPACEBAR',
    SPACEBAR_OLD = 'SPACEBAR_OLD',
    ESCAPE = 'ESCAPE',
}
export const KeyCode: Record<EKeyCode, string> = {
    BACKSPACE: 'Backspace',
    ENTER: 'Enter',
    TAB: 'Tab',
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#whitespace_keys
    SPACEBAR: ' ',
    SPACEBAR_OLD: 'Spacebar',
    ESCAPE: 'Escape',
};
