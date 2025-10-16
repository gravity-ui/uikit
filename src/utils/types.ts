// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

/**
 * The final type is string but IDE will suggest values from T
 * Use (string & {}) for better autocomplete https://github.com/Microsoft/TypeScript/issues/29729#issuecomment-505826972
 *
 * @example
 * ```
 * type Lang = StringWithSuggest<'en' | 'rs'>;
 *
 * const lang: Lang = '';
 * // Start typing in your TypeScript-enabled IDE.
 * // You **will** get auto-completion for `en` and `rs` literals.
 * ```
 */
export type StringWithSuggest<T extends string> = `${T}` | (string & {});

/* DeepPartial with depth limitation up to 9 */
export type DeepPartial<T, N extends number = 9> = N extends 0
    ? T
    : Partial<{[P in keyof T]: DeepPartial<T[P], [never, 0, 1, 2, 3, 4, 5, 6, 7, 8][N]>}>;
