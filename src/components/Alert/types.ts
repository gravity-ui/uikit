import type * as React from 'react';

import type {ButtonProps} from '../Button';
import type {QAProps} from '../types';

export type AlertTheme = 'clear' | 'normal' | 'info' | 'success' | 'warning' | 'danger' | 'utility';
export type AlertView = 'filled' | 'outlined';
export type AlertLayout = 'vertical' | 'horizontal';
export type AlertCorners = 'rounded' | 'square';

export type AlertContextType = {
    /**
     * Override actions position
     *
     * variants:
     * - `vertical` - bottom (default);
     * - `horizontal` - right;
     */
    layout: AlertLayout;
    view: AlertView;
};

export type AlertContextProviderProps = React.PropsWithChildren<AlertContextType>;

export interface AlertProps extends QAProps, Partial<AlertContextType> {
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
     *      <Alert.Action onClick={...}>...</Alert.Action>
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
}
export type AlertActionProps = ButtonProps;
export interface AlertTitleProps {
    className?: string;
    text: string;
}
