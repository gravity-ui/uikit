export type AlertTypes = 'normal' | 'info' | 'positive' | 'warning' | 'danger';
export type AlertView = 'filled' | 'outlined';

export type AlertProps = {
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
     * Override actions position (default bottom)
     *
     * variants:
     * - `vertical` - bottom (by default);
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
    style?: React.CSSProperties;
    className?: string;
} & ( // only `title` or `message` is required
    | {message: React.ReactNode; title?: React.ReactNode}
    | {title: React.ReactNode; message?: React.ReactNode}
);

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
