import type {ButtonProps} from '../Button';
import type {MenuItemProps} from '../Menu';
import type {QAProps} from '../types';

export interface ActionsPanelItem {
    /** Uniq action id */
    id: string;
    /** If true, then always inside the overflow menu */
    collapsed?: boolean;
    /** Settings for the overflow menu action */
    menu: {
        item: MenuItemProps;
        group?: string;
    };
    /** Settings for button action */
    button: {
        props: ButtonProps;
    };
}

export interface ActionsPanelProps extends QAProps {
    /** Array of actions ActionsPanelItem[] */
    actions: ActionsPanelItem[];
    /** ClassName of element */
    className?: string;
    /** Close button click handler */
    onClose?: () => void;
    /** Render-prop for displaying the content of a note */
    renderNote?: () => React.ReactNode;
    /** ClassName of note */
    noteClassName?: string;
    /** Maximum number of actions in a row */
    maxRowActions?: number;
}
