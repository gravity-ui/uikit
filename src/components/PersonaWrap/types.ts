import type {MouseEvent, ReactNode} from 'react';
import type {ButtonProps} from '../Button';

export interface PersonaWrapProps {
    avatar: ReactNode;
    children?: ReactNode;
    isEmpty?: boolean;
    /** Visual appearance (with or without border) */
    theme?: 'default' | 'clear';
    /** Text size */
    size?: 's' | 'n';
    /** @deprecated Use `renderButton` prop to render custom button */
    onClose?: (event: MouseEvent) => void;
    onClick?: (event: MouseEvent) => void;
    className?: string;
    renderButton?: () => ReactNode;
}

export type PersonaButtonProps = Omit<ButtonProps, 'view' | 'pin' | 'children'>;
