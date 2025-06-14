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

// TODO BREAKING CHANGE: xxl -> 2xl, xxxl -> 3xl
export type MediaType = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export type MediaProps<T> = Record<MediaType, T>;

export type AdaptiveProp<T extends keyof React.CSSProperties> =
    | React.CSSProperties[T]
    | MediaPartial<React.CSSProperties[T]>;

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
