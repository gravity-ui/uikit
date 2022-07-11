import {useHover} from './useHover';
import {useTimeout} from './useTimeout';

interface UseCloseOnTimeoutProps {
    onClose: VoidFunction;
    timeout?: number;
}

/**
 * Invokes callback after given amount of time unless mouse is on the element
 *
 * @param onClose
 * @param timeout
 */
export function useCloseOnTimeout<T = Element>({onClose, timeout}: UseCloseOnTimeoutProps) {
    const [onMouseOver, onMouseLeave, isHovering] = useHover<T>();

    useTimeout(onClose, isHovering ? null : timeout);

    return {onMouseOver, onMouseLeave};
}
