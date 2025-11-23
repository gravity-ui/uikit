import {KeyCode} from '../../constants';
import {useFocusWithin} from '../../hooks/useFocusWithin/useFocusWithin';
import {useDirection} from '../theme/useDirection';

export interface PaletteGridProps {
    disabled?: boolean;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    whenFocused?: {
        selectItem: () => void;
        nextItem: () => void;
        previousItem: () => void;
        nextRow: () => void;
        previousRow: () => void;
    };
}

export function usePaletteGrid(props: PaletteGridProps): React.HTMLAttributes<HTMLElement> {
    const direction = useDirection();

    const {focusWithinProps} = useFocusWithin({
        onFocusWithin: (event) => props.onFocus?.(event),
        onBlurWithin: (event) => props.onBlur?.(event),
    });

    const whenFocused = props.whenFocused;

    const base: React.ButtonHTMLAttributes<HTMLDivElement> = {
        role: 'grid',
        'aria-disabled': props.disabled,
        'aria-readonly': props.disabled,
        tabIndex: whenFocused ? -1 : 0,
        ...focusWithinProps,
    };

    if (!whenFocused) {
        return base;
    }

    return {
        ...base,
        onKeyDown: (event) => {
            if (event.code === KeyCode.ARROW_RIGHT) {
                event.preventDefault();
                if (direction === 'ltr') {
                    whenFocused.nextItem();
                } else {
                    whenFocused.previousItem();
                }
            } else if (event.code === KeyCode.ARROW_LEFT) {
                event.preventDefault();
                if (direction === 'ltr') {
                    whenFocused.previousItem();
                } else {
                    whenFocused.nextItem();
                }
            } else if (event.code === KeyCode.ARROW_DOWN) {
                event.preventDefault();
                whenFocused.nextRow();
            } else if (event.code === KeyCode.ARROW_UP) {
                event.preventDefault();
                whenFocused.previousRow();
            } else if (event.code === KeyCode.SPACE || event.code === KeyCode.ENTER) {
                event.preventDefault();
                whenFocused.selectItem();
            }
        },
    };
}
