import type {PersonaWrapProps} from '../PersonaWrap';

export type PersonaProps = Pick<PersonaWrapProps, 'size' | 'theme' | 'className'> & {
    /** Visible text */
    text: string;
    /** Image source */
    image?: string;
    /** Avatar appearance */
    type?: 'person' | 'email' | 'empty';
    /** Handle click on button with cross */
    onClose?: (text: string) => void;
    /** Handle click on component itself */
    onClick?: (text: string) => void;
};
