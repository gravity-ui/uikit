export interface PersonaProps {
    /** Visible text */
    text: string;
    /** Image source */
    image?: string;
    /** Visual appearance (with or without border) */
    theme?: 'default' | 'clear';
    /** Avatar appearance */
    type?: 'person' | 'email' | 'empty';
    /** Text size */
    size?: 's' | 'n';
    /** Handle click on button with cross */
    onClose?: (text: string) => void;
    /** Handle click on component itself */
    onClick?: (text: string) => void;
    /** Custom CSS class for root element */
    className?: string;
}
