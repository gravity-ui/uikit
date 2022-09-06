export enum PopoverBehavior {
    Immediate = 'immediate',
    Delayed = 'delayed',
    DelayedClosing = 'delayedClosing',
}

export const delayByBehavior = {
    [PopoverBehavior.Immediate]: [0, 0],
    [PopoverBehavior.Delayed]: [300, 300],
    [PopoverBehavior.DelayedClosing]: [0, 300],
};
