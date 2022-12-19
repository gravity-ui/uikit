export type ColSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type Space = 'none' | 'micro' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type MediaType = 'mobile' | 'tablH' | 'lptpS' | 'lptpM' | 'dsktp';

export type MediaProps<T> = {
    /**
     * 480px
     */
    mobile: T;
    /**
     * 1080px
     */
    tablH: T;
    /**
     * 1200px
     */
    lptpS: T;
    /**
     * 1400px
     */
    lptpM: T;
    /**
     * 1920px
     */
    dsktp: T;
};

export type MediaPartial<T> = Partial<MediaProps<T>>;

export type LayoutProps = Partial<{
    space: Space;
    spaceRow: Space;
    gutters: Space;
}>;

export type LayoutTheme = {
    /**
     * Common props
     */
    base?: LayoutProps;
    /**
     * Override common props in different screen media type
     */
    medias?: Partial<MediaProps<LayoutProps | undefined>>;
};
