import type {CSSProperties, DOMProps} from '../../types';
import type {
    LayoutProps,
    PositioningProps,
    SizingProps,
    SpacingProps,
    StylingProps,
} from '../types';

import {useLayoutContext} from './useLayoutContext';

type CSSKey = keyof React.CSSProperties;

type StyleName = CSSKey | CSSKey[];
type StyleHandler = (value: unknown) => string | undefined;
export type StyleHandlers<T extends keyof any = string> = {
    [key in T]: [StyleName, StyleHandler?];
};

type BaseStyleProperties =
    | keyof LayoutProps
    | keyof SizingProps
    | keyof SpacingProps
    | keyof PositioningProps
    | keyof StylingProps;

const baseStyleHandlers: StyleHandlers<BaseStyleProperties> = {
    flex: ['flex'],
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
    width: ['width', getSpacingValue],
    minWidth: ['minWidth', getSpacingValue],
    maxWidth: ['maxWidth', getSpacingValue],
    height: ['height', getSpacingValue],
    minHeight: ['minHeight', getSpacingValue],
    maxHeight: ['maxHeight', getSpacingValue],
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
    borderStartWidth: 'borderInlineStartStyle',
    borderEndWidth: 'borderInlineEndStyle',
    borderTopWidth: 'borderBlockStartStyle',
    borderBottomWidth: 'borderBlockEndStyle',
} as const;

export function useStyleProps<
    T extends DOMProps,
    S extends StyleHandlers = typeof baseStyleHandlers,
>(props: T, handlers?: S): {style: CSSProperties} & Omit<T, keyof S> {
    const {getClosestMediaProps} = useLayoutContext();
    const styleHandlers = handlers ?? baseStyleHandlers;

    const style: CSSProperties = {};
    const otherProps: Record<string, any> = {};
    for (const [key, value] of Object.entries(props)) {
        const styleProp = styleHandlers[key as keyof typeof styleHandlers];
        if (!styleProp) {
            otherProps[key] = value;
        }
        if (!styleProp || value === undefined || value === null) {
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
        if (style[key as CSSKey]) {
            style[value] = 'solid';
            style.boxSizing = 'border-box';
        }
    }

    return {
        ...(otherProps as Omit<T, keyof S>),
        style: {...props.style, ...style},
    };
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
