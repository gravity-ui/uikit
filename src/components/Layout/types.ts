export type ColSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type Space = 'none' | 'micro' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type MediaType = 'mobile' | 'tabletH' | 'laptopS' | 'laptopM' | 'desktop';

export type MediaProps<T> = Record<MediaType, T>;

export type MediaPartial<T> = Partial<MediaProps<T>>;

export type LayoutProps = Partial<{
    space: Space;
    spaceRow: Space;
    gutters: Space;
}>;

export type LayoutTheme = {
    /**
     * Override default breakpoints values.
     *
     * @important **you mast override corresponding scss variables**
     */
    breakpoints: MediaProps<number>;
    /**
     * Default props
     */
    default: LayoutProps;
    /**
     * Override default props in different screen media type
     */
    mediasOverrides: Partial<MediaProps<LayoutProps | undefined>>;
};

export type PartialLayoutTheme = {
    /**
     * Override default breakpoints values.
     *
     * @important **you mast override corresponding scss variables**
     */
    breakpoints?: Partial<MediaProps<number>>;
    /**
     * Default props
     */
    default?: LayoutProps;
    /**
     * Override default props in different screen media type
     */
    mediasOverrides?: Partial<MediaProps<LayoutProps | undefined>>;
};
