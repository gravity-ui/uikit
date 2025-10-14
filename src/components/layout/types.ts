export type ColSize =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12;

export type Space =
    | '0'
    | '0.5'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | 0
    | 0.5
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10;

export type MediaProps<T> = {
    xs: T;
    s: T;
    m: T;
    l: T;
    xl: T;
    xxl: T;
    xxxl: T;
};

// TODO BREAKING CHANGE: xxl -> 2xl, xxxl -> 3xl
export type MediaType = keyof MediaProps<string>;

export type AdaptiveProp<T> = T | MediaPartial<T>;

export type MediaPartial<T> = Partial<MediaProps<T>>;

export type WithMedia<T extends {}> = T & {media?: MediaPartial<Partial<T>>};

export type CommonProps = Partial<{
    space: Space;
    spaceRow: Space;
}>;

export type ContainerConfigProps = Partial<{
    gutters: Space;
    spaceRow: Space;
}>;

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

interface ComponentProps {
    container: WithMedia<ContainerConfigProps>;
}

export interface LayoutTheme {
    /**
     * Override default breakpoints values.
     */
    breakpoints: MediaProps<number>;
    /**
     * Base space unit size.
     *
     * **Don't forget to override corresponding css custom property `--g-spacing-base` at project level,
     * if you will change this value in theme**
     */
    spaceBaseSize: number;
    /**
     * Components props build in into the theme. You can describe the props depending on the current media expression
     */
    components: ComponentProps;
}

export interface IsMediaActive {
    (toCheck: MediaType): boolean;
}

export interface LayoutProps {
    /** When used in a flex layout, specifies how the element will grow or shrink to fit the space available. */
    flex?: AdaptiveProp<React.CSSProperties['flex']>;
    /** When used in a flex layout, specifies how the element will grow to fit the space available. */
    flexGrow?: AdaptiveProp<React.CSSProperties['flexGrow']>;
    /** When used in a flex layout, specifies the initial main size of the element. */
    flexBasis?: AdaptiveProp<React.CSSProperties['flexBasis']>;
    /** When used in a flex layout, specifies how the element will shrink to fit the space available. */
    flexShrink?: AdaptiveProp<React.CSSProperties['flexShrink']>;
    /** Specifies how the element is aligned inside a flex or grid container. */
    alignSelf?: AdaptiveProp<React.CSSProperties['alignSelf']>;
    /** Specifies how the element is justified inside a flex or grid container. */
    justifySelf?: AdaptiveProp<React.CSSProperties['justifySelf']>;
    /** Specifies how the element is aligned in both direction inside a flex or grid container. */
    placeSelf?: AdaptiveProp<React.CSSProperties['placeSelf']>;
    /** The layout order for the element within a flex or grid container. */
    order?: AdaptiveProp<number>;

    /** When used in a grid layout, specifies the named grid area that the element should be placed in within the grid. */
    gridArea?: AdaptiveProp<React.CSSProperties['gridArea']>;
    /** When used in a grid layout, specifies the column the element should be placed in within the grid. */
    gridColumn?: AdaptiveProp<React.CSSProperties['gridColumn']>;
    /** When used in a grid layout, specifies the row the element should be placed in within the grid. */
    gridRow?: AdaptiveProp<React.CSSProperties['gridRow']>;
    /** When used in a grid layout, specifies the starting column to span within the grid. */
    gridColumnStart?: AdaptiveProp<React.CSSProperties['gridColumnStart']>;
    /** When used in a grid layout, specifies the ending column to span within the grid. */
    gridColumnEnd?: AdaptiveProp<React.CSSProperties['gridColumnEnd']>;
    /** When used in a grid layout, specifies the starting row to span within the grid. */
    gridRowStart?: AdaptiveProp<React.CSSProperties['gridRowStart']>;
    /** When used in a grid layout, specifies the ending row to span within the grid. */
    gridRowEnd?: AdaptiveProp<React.CSSProperties['gridRowEnd']>;

    /** Species what to do when the element's content is too long to fit its size. */
    overflow?: AdaptiveProp<'hidden' | 'x' | 'y' | 'auto'>;
}

export interface SizingProps {
    /** The width of the element */
    width?: AdaptiveProp<React.CSSProperties['width'] | SpacingValue>;
    /** The minimum width of the element */
    minWidth?: AdaptiveProp<React.CSSProperties['minWidth'] | SpacingValue>;
    /** The maximum width of the element */
    maxWidth?: AdaptiveProp<React.CSSProperties['maxWidth'] | SpacingValue>;
    /** The height of the element */
    height?: AdaptiveProp<React.CSSProperties['height'] | SpacingValue>;
    /** The minimum height of the element */
    minHeight?: AdaptiveProp<React.CSSProperties['minHeight'] | SpacingValue>;
    /** The maximum height of the element */
    maxHeight?: AdaptiveProp<React.CSSProperties['maxHeight'] | SpacingValue>;
}

export type SpacingValue =
    | `spacing-${'half' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`
    | (string & {})
    | (number & {});

export interface SpacingProps {
    /** The margin for all four sides of the element. */
    margin?: AdaptiveProp<React.CSSProperties['margin'] | SpacingValue>;
    /** The margin for both the left and right sides of the element. */
    marginInline?: AdaptiveProp<React.CSSProperties['marginInline'] | SpacingValue>;
    /** The margin for the logical start side of the element. */
    marginStart?: AdaptiveProp<React.CSSProperties['marginInlineStart'] | SpacingValue>;
    /** The margin for the logical end side of the element. */
    marginEnd?: AdaptiveProp<React.CSSProperties['marginInlineEnd'] | SpacingValue>;
    /** The margin for both the top and bottom sides of the element. */
    marginBlock?: AdaptiveProp<React.CSSProperties['marginBlock'] | SpacingValue>;
    /** The margin for the logical top side of the element. */
    marginTop?: AdaptiveProp<React.CSSProperties['marginBlockStart'] | SpacingValue>;
    /** The margin for for the logical bottom side of the element. */
    marginBottom?: AdaptiveProp<React.CSSProperties['marginBlockEnd'] | SpacingValue>;
    /** The padding for all four sides of the element. */
    padding?: AdaptiveProp<React.CSSProperties['padding'] | SpacingValue>;
    /** The padding for both the left and right sides of the element. */
    paddingInline?: AdaptiveProp<React.CSSProperties['paddingInline'] | SpacingValue>;
    /** The padding for the logical start side of the element. */
    paddingStart?: AdaptiveProp<React.CSSProperties['paddingInlineStart'] | SpacingValue>;
    /** The padding for the logical end side of the element. */
    paddingEnd?: AdaptiveProp<React.CSSProperties['paddingInlineEnd'] | SpacingValue>;
    /** The padding for both the top and bottom sides of the element. */
    paddingBlock?: AdaptiveProp<React.CSSProperties['paddingInline'] | SpacingValue>;
    /** The padding for the logical top side of the element. */
    paddingTop?: AdaptiveProp<React.CSSProperties['paddingBlockStart'] | SpacingValue>;
    /** The padding for for the logical bottom side of the element. */
    paddingBottom?: AdaptiveProp<React.CSSProperties['paddingBlockEnd'] | SpacingValue>;
}

export interface PositioningProps {
    /** Specifies how the element is positioned. */
    position?: AdaptiveProp<React.CSSProperties['position']>;
    /** The position for all four sides of the element. */
    inset?: AdaptiveProp<React.CSSProperties['inset'] | SpacingValue>;
    /** The top position for the element. */
    top?: AdaptiveProp<React.CSSProperties['insetBlockStart'] | SpacingValue>;
    /** The bottom position for the element. */
    bottom?: AdaptiveProp<React.CSSProperties['insetBlockEnd'] | SpacingValue>;
    /** The logical start position for the element. */
    start?: AdaptiveProp<React.CSSProperties['insetInlineStart'] | SpacingValue>;
    /** The logical end position for the element. */
    end?: AdaptiveProp<React.CSSProperties['insetInlineEnd'] | SpacingValue>;
    /** The stacking order for the element. */
    zIndex?: AdaptiveProp<React.CSSProperties['zIndex']>;
}

export interface BoxAlignmentStyleProps {
    /** The distribution of space around child items along the cross axis. */
    alignContent?: AdaptiveProp<React.CSSProperties['alignContent']>;
    /** The alignment of children within their container. */
    alignItems?: AdaptiveProp<React.CSSProperties['alignItems']>;
    /** The distribution of space around items along the main axis. */
    justifyContent?: AdaptiveProp<React.CSSProperties['justifyContent']>;
    /** Defines the default `justifySelf` for all items. */
    justifyItems?: AdaptiveProp<React.CSSProperties['justifyItems']>;
    /** Allows to align content along both the block and inline directions at once. */
    placeContent?: AdaptiveProp<React.CSSProperties['placeContent']>;
    /** Allows to align items along both the block and inline directions at once */
    placeItems?: AdaptiveProp<React.CSSProperties['placeItems']>;
    /** The space to display between both rows and columns. */
    gap?: AdaptiveProp<React.CSSProperties['gap'] | SpacingValue>;
    /** The space to display between columns. */
    columnGap?: AdaptiveProp<React.CSSProperties['columnGap'] | SpacingValue>;
    /** The space to display between rows. */
    rowGap?: AdaptiveProp<React.CSSProperties['rowGap'] | SpacingValue>;
}

export type BackgroundColorValue =
    | 'background'
    | 'generic'
    | 'generic-hover'
    | 'generic-medium'
    | 'generic-medium-hover'
    | 'generic-accent'
    | 'generic-accent-disabled'
    | 'generic-ultralight'
    | 'simple-hover'
    | 'simple-hover-solid'
    | 'brand'
    | 'brand-hover'
    | 'selection'
    | 'selection-hover'
    | 'info-light'
    | 'info-light-hover'
    | 'info-medium'
    | 'info-medium-hover'
    | 'info-heavy'
    | 'info-heavy-hover'
    | 'positive-light'
    | 'positive-light-hover'
    | 'positive-medium'
    | 'positive-medium-hover'
    | 'positive-heavy'
    | 'positive-heavy-hover'
    | 'warning-light'
    | 'warning-light-hover'
    | 'warning-medium'
    | 'warning-medium-hover'
    | 'warning-heavy'
    | 'warning-heavy-hover'
    | 'danger-light'
    | 'danger-light-hover'
    | 'danger-medium'
    | 'danger-medium-hover'
    | 'danger-heavy'
    | 'danger-heavy-hover'
    | 'utility-light'
    | 'utility-light-hover'
    | 'utility-medium'
    | 'utility-medium-hover'
    | 'utility-heavy'
    | 'utility-heavy-hover'
    | 'neutral-light'
    | 'neutral-light-hover'
    | 'neutral-medium'
    | 'neutral-medium-hover'
    | 'neutral-heavy'
    | 'neutral-heavy-hover'
    | 'misc-light'
    | 'misc-light-hover'
    | 'misc-medium'
    | 'misc-medium-hover'
    | 'misc-heavy'
    | 'misc-heavy-hover'
    | 'light'
    | 'light-hover'
    | 'light-simple-hover'
    | 'light-disabled'
    | 'light-accent-disabled'
    | 'float'
    | 'float-hover'
    | 'float-medium'
    | 'float-heavy'
    | 'float-accent'
    | 'float-accent-hover'
    | 'float-announcement'
    | 'modal';

export type LineColorValue =
    | 'generic'
    | 'generic-hover'
    | 'generic-active'
    | 'generic-accent'
    | 'generic-accent-hover'
    | 'generic-solid'
    | 'brand'
    | 'focus'
    | 'light'
    | 'info'
    | 'positive'
    | 'warning'
    | 'danger'
    | 'utility'
    | 'misc';

export type BorderRadiusValue = 'xs' | 's' | 'm' | 'l' | 'xl' | 'focus';

export interface StylingProps {
    /** The background color for the element. */
    backgroundColor?: AdaptiveProp<BackgroundColorValue>;

    borderWidth?: AdaptiveProp<React.CSSProperties['borderWidth']>;
    borderInlineWidth?: AdaptiveProp<React.CSSProperties['borderInlineWidth']>;
    borderBlockWidth?: AdaptiveProp<React.CSSProperties['borderBlockWidth']>;
    borderStartWidth?: AdaptiveProp<React.CSSProperties['borderInlineStartWidth']>;
    borderEndWidth?: AdaptiveProp<React.CSSProperties['borderInlineEndWidth']>;
    borderTopWidth?: AdaptiveProp<React.CSSProperties['borderBlockStartWidth']>;
    borderBottomWidth?: AdaptiveProp<React.CSSProperties['borderBlockEndWidth']>;

    borderColor?: AdaptiveProp<LineColorValue>;
    borderInlineColor?: AdaptiveProp<LineColorValue>;
    borderBlockColor?: AdaptiveProp<LineColorValue>;
    borderStartColor?: AdaptiveProp<LineColorValue>;
    borderEndColor?: AdaptiveProp<LineColorValue>;
    borderTopColor?: AdaptiveProp<LineColorValue>;
    borderBottomColor?: AdaptiveProp<LineColorValue>;

    borderRadius?: AdaptiveProp<BorderRadiusValue>;
    borderTopStartRadius?: AdaptiveProp<BorderRadiusValue>;
    borderTopEndRadius?: AdaptiveProp<BorderRadiusValue>;
    borderBottomStartRadius?: AdaptiveProp<BorderRadiusValue>;
    borderBottomEndRadius?: AdaptiveProp<BorderRadiusValue>;
}

export type LayoutComponentProps<T extends React.ElementType, P = {}> = P &
    Omit<React.ComponentPropsWithRef<T>, keyof P>;
