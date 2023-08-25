export type AlertTheme = 'normal' | 'info' | 'positive' | 'warning' | 'danger';
export type AlertView = 'filled' | 'outlined';
export type AlertCorners = 'rounded' | 'square';

export interface AlertProps {
    title?: React.ReactNode;
    message?: React.ReactNode;
    theme?: AlertTheme;
    /**
     * Override default icons
     */
    icon?: React.ReactNode;
    /**
     * @default - normal
     */
    corners?: AlertCorners;
    /**
     * Override actions position
     *
     * variants:
     * - `vertical` - bottom (default);
     * - `horizontal` - right;
     */
    layout?: 'vertical' | 'horizontal';
    view?: AlertView;
    onClose?: () => void;
    /**
     * Add you Actions to alert component:
     * - by declaration:
     * ```tsx
     * actions: [{text: '...', handler: () => {}}]
     * ```
     * - custom component with predicted way:
     * ```tsx
     * actions: (
     *  <Alert.Actions>
     *      <Button onClick={...}>...</Button>
     *  </Alert.Actions>
     * )
     * ```
     * - full custom:
     * ```tsx
     * actions: (
     *  <Flex>
     *      <img src={...} />
     *      <Text>...</Text>
     *  </Flex>
     * )
     * ```
     */
    actions?: React.ReactNode | AlertAction[];
    /**
     * Center all content in vertical direction,
     * useful if for some reason you actions takes more space then text
     * or needed icon to be on the middle of the card
     *
     * @default - 'baseline'
     */
    align?: 'center' | 'baseline';
    style?: React.CSSProperties;
    className?: string;
}

export interface AlertAction {
    text: string;
    handler?: () => void;
}

export interface AlertIconProps {
    theme: AlertTheme;
    view?: AlertView;
    size?: number;
    className?: string;
}

export interface AlertActionsProps {
    className?: string;
    items?: AlertAction[];
    children?: React.ReactNode | React.ReactNode[];
    parentLayout?: 'vertical' | 'horizontal';
}
export interface AlertTitleProps {
    className?: string;
    text: string;
}
