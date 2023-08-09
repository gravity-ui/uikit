export type PersonaText = string | {value: string; view: React.ReactNode};

export type PersonaProps = {
    /** Visible text node */
    text: string | {value: string; view: React.ReactNode};
    /** Image source */
    image?: string;
    /**
     * Visual appearance (with or without border)
     * @deprecated Use `hasBorder` prop instead
     */
    theme?: 'default' | 'clear';
    /** Display border */
    hasBorder?: boolean;
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
    style?: React.CSSProperties;
};
