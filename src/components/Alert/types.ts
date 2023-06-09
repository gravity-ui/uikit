export type AlertTypes = 'normal' | 'info' | 'positive' | 'warning' | 'danger';
export type AlertView = 'filled' | 'outlined';

export interface AlertProps {
    title?: React.ReactNode;
    message?: React.ReactNode;
    theme?: 'normal' | 'info' | 'positive' | 'warning' | 'danger';
    /**
     * Override default icons
     */
    icon?: React.ReactNode;
    /**
     * Zero border radius in card
     */
    squared?: boolean;
    /**
     * Override actions position
     *
     * variants:
     * - `vertical` - bottom (default);
     * - `horizontal` - right;
     */
    layout?: 'vertical' | 'horizontal';
    view?: AlertView;
    /**
     * Define function and close button will be appear
     */
    hasClose?: boolean;
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
     */
    contentCenter?: true;
    style?: React.CSSProperties;
    className?: string;
}

export interface AlertAction {
    text: string;
    handler?: () => void;
}

export interface AlertIconProps {
    type: AlertTypes;
    view?: AlertView;
    size?: number;
    className?: string;
}

export interface AlertActionsProps {
    items?: AlertAction[];
    children?: React.ReactNode | React.ReactNode[];
    parentLayout?: 'vertical' | 'horizontal';
}
export interface AlertTitleProps {
    text: string;
}
