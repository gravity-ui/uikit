export const PopoverBehavior = {
    Immediate: 'immediate',
    Delayed: 'delayed',
    DelayedClosing: 'delayedClosing',
} as const;
export type PopoverBehavior = (typeof PopoverBehavior)[keyof typeof PopoverBehavior];

export const delayByBehavior = {
    [PopoverBehavior.Immediate]: [0, 0],
    [PopoverBehavior.Delayed]: [300, 300],
    [PopoverBehavior.DelayedClosing]: [0, 300],
};
