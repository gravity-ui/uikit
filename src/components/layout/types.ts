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

export type MediaType = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export type MediaProps<T> = Record<MediaType, T>;

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
     *
     * @important **you mast override corresponding scss variables**
     */
    breakpoints: MediaProps<number>;
    /**
     * Base space unit size.
     *
     * **Don't forget to override corresponding css custom property `--yc-space-base` at project level,
     * if you will change this value in theme**
     */
    spaceBaseSize: number;
    /**
     * Common props, that can you all layout components
     */
    common: WithMedia<CommonProps>;
    /**
     * Components props build in into the theme. You can describe the props depending on the current media expression
     */
    components: ComponentProps;
}

export interface IsMediaActive {
    (toCheck: MediaType): boolean;
}
