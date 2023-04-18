import type {ButtonProps} from '../Button';

export type PersonaButtonProps = Omit<ButtonProps, 'view' | 'pin' | 'children'>;
