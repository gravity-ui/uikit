import type {CSSProperties, DOMProps} from '../../types';
import type {
    LayoutProps,
    PositioningProps,
    SizingProps,
    SpacingProps,
    StylingProps,
} from '../types';
import type {GetClosestMediaProps} from '../utils';

import {useLayoutContext} from './useLayoutContext';

type CSSKey = keyof React.CSSProperties;

type StyleName = CSSKey | CSSKey[];
type StyleHandler = (value: unknown) => string | undefined;
export type StyleHandlers<T extends keyof any = string> = {
    [key in T]: [StyleName, StyleHandler?];
};

export interface BaseStyleProps
    extends LayoutProps,
        SizingProps,
        SpacingProps,
        PositioningProps,
        StylingProps {}

export const baseStyleHandlers: StyleHandlers<keyof BaseStyleProps> = {
    flex: ['flex', getFlexValue],
    flexGrow: ['flexGrow'],
    flexBasis: ['flexBasis'],
    flexShrink: ['flexShrink'],
    alignSelf: ['alignSelf'],
    justifySelf: ['justifySelf'],
    placeSelf: ['placeSelf'],
    order: ['order'],
    gridArea: ['gridArea'],
    gridColumn: ['gridColumn'],
    gridRow: ['gridRow'],
    gridColumnStart: ['gridColumnStart'],
    gridColumnEnd: ['gridColumnEnd'],
    gridRowStart: ['gridRowStart'],
    gridRowEnd: ['gridRowEnd'],
    overflow: ['overflow', getOverflowValue],
    inlineSize: ['inlineSize', getSpacingValue],
    minInlineSize: ['minInlineSize', getSpacingValue],
    maxInlineSize: ['maxInlineSize', getSpacingValue],
    blockSize: ['blockSize', getSpacingValue],
    minBlockSize: ['minBlockSize', getSpacingValue],
    maxBlockSize: ['maxBlockSize', getSpacingValue],
    position: ['position'],
    inset: ['inset', getSpacingValue],
    insetBlock: ['insetBlock', getSpacingValue],
    insetBlockStart: ['insetBlockStart', getSpacingValue],
    insetBlockEnd: ['insetBlockEnd', getSpacingValue],
    insetInline: ['insetInline', getSpacingValue],
    insetInlineStart: ['insetInlineStart', getSpacingValue],
    insetInlineEnd: ['insetInlineEnd', getSpacingValue],
    zIndex: ['zIndex'],
    margin: ['margin', getSpacingValue],
    marginInline: ['marginInline', getSpacingValue],
    marginInlineStart: ['marginInlineStart', getSpacingValue],
    marginInlineEnd: ['marginInlineEnd', getSpacingValue],
    marginBlock: ['marginBlock', getSpacingValue],
    marginBlockStart: ['marginBlockStart', getSpacingValue],
    marginBlockEnd: ['marginBlockEnd', getSpacingValue],
    padding: ['padding', getSpacingValue],
    paddingInline: ['paddingInline', getSpacingValue],
    paddingInlineStart: ['paddingInlineStart', getSpacingValue],
    paddingInlineEnd: ['paddingInlineEnd', getSpacingValue],
    paddingBlock: ['paddingBlock', getSpacingValue],
    paddingBlockStart: ['paddingBlockStart', getSpacingValue],
    paddingBlockEnd: ['paddingBlockEnd', getSpacingValue],

    backgroundColor: ['backgroundColor', getBackgroundColorValue],
    borderWidth: ['borderWidth'],
    borderInlineWidth: ['borderInlineWidth'],
    borderBlockWidth: ['borderBlockWidth'],
    borderInlineStartWidth: ['borderInlineStartWidth'],
    borderInlineEndWidth: ['borderInlineEndWidth'],
    borderBlockStartWidth: ['borderBlockStartWidth'],
    borderBlockEndWidth: ['borderBlockEndWidth'],
    borderColor: ['borderColor', getLineColorValue],
    borderInlineColor: ['borderInlineColor', getLineColorValue],
    borderBlockColor: ['borderBlockColor', getLineColorValue],
    borderInlineStartColor: ['borderInlineStartColor', getLineColorValue],
    borderInlineEndColor: ['borderInlineEndColor', getLineColorValue],
    borderBlockStartColor: ['borderBlockStartColor', getLineColorValue],
    borderBlockEndColor: ['borderBlockEndColor', getLineColorValue],
    borderRadius: ['borderRadius', getRadiusValue],
    borderStartStartRadius: ['borderStartStartRadius', getRadiusValue],
    borderStartEndRadius: ['borderStartEndRadius', getRadiusValue],
    borderEndStartRadius: ['borderEndStartRadius', getRadiusValue],
    borderEndEndRadius: ['borderEndEndRadius', getRadiusValue],
};

const borderStyleProps = {
    borderWidth: 'borderStyle',
    borderInlineWidth: 'borderInlineStyle',
    borderInlineStartWidth: 'borderInlineStartStyle',
    borderInlineEndWidth: 'borderInlineEndStyle',
    borderBlockWidth: 'borderBlockStyle',
    borderBlockStartWidth: 'borderBlockStartStyle',
    borderBlockEndWidth: 'borderBlockEndStyle',
} as const;

export function convertStyleProps<T extends DOMProps, S extends StyleHandlers>(
    props: T,
    handlers: S,
    getClosestMediaProps: GetClosestMediaProps,
): {style: CSSProperties} & Omit<T, keyof S> {
    const style: CSSProperties = {};
    const otherProps: Record<string, any> = {};
    for (const [key, value] of Object.entries(props)) {
        const styleProp = handlers[key as keyof typeof handlers];
        if (!styleProp) {
            otherProps[key] = value;
            continue;
        }
        if (value === undefined || value === null) {
            continue;
        }

        const prop = getClosestMediaProps(value);
        const [name, convert] = styleProp;
        const v = typeof convert === 'function' ? convert(prop) : prop;
        if (Array.isArray(name)) {
            for (const n of name) {
                style[n] = v;
            }
        } else {
            style[name] = v;
        }
    }

    for (const [key, value] of Object.entries(borderStyleProps)) {
        if (style[key as keyof typeof borderStyleProps]) {
            style[value] = 'solid';
            style.boxSizing = 'border-box';
        }
    }

    return {
        ...(otherProps as Omit<T, keyof S>),
        style: {...props.style, ...style},
    };
}

export function useStyleProps<
    T extends DOMProps,
    S extends StyleHandlers = typeof baseStyleHandlers,
>(props: T, handlers?: S): {style: CSSProperties} & Omit<T, keyof S> {
    const {getClosestMediaProps} = useLayoutContext();
    const styleHandlers = handlers ?? (baseStyleHandlers as S);

    return convertStyleProps(props, styleHandlers, getClosestMediaProps);
}

function getOverflowValue(v: unknown) {
    switch (v) {
        case 'hidden': {
            return 'hidden';
        }
        case 'x': {
            return 'hidden auto';
        }
        case 'y': {
            return 'auto hidden';
        }
        case 'auto': {
            return 'auto';
        }
    }

    return `${v}`;
}

function getBackgroundColorValue(value: unknown) {
    return `var(--g-color-base-${value})`;
}

function getLineColorValue(value: unknown) {
    return `var(--g-color-line-${value})`;
}

function getRadiusValue(value: unknown) {
    if (value === 'focus') {
        return 'var(--g-focus-border-radius)';
    }
    return `var(--g-border-radius-${value})`;
}

const spacingRe = /^spacing-(\d+|half)$/;
export function getSpacingValue(value: unknown) {
    if (typeof value === 'string' && spacingRe.test(value)) {
        const v = value.slice('spacing-'.length);
        const n = v === 'half' ? 0.5 : Number(v);
        return `calc(var(--g-spacing-base) * ${n})`;
    }

    if (typeof value === 'number') {
        return `${value}px`;
    }

    return `${value}`;
}

function getFlexValue(value: unknown): string | undefined {
    if (typeof value === 'boolean') {
        return value ? '1' : undefined;
    }

    return `${value}`;
}
