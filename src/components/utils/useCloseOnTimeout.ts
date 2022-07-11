import {useHover} from './useHover';
import {useTimeout} from './useTimeout';

interface UseCloseOnTimeoutProps {
    onClose: VoidFunction;
    timeout?: number;
}

export function useCloseOnTimeout<T = Element>({onClose, timeout}: UseCloseOnTimeoutProps) {
    const [onMouseOver, onMouseLeave, isHovering] = useHover<T>();

    useTimeout(onClose, isHovering ? null : timeout);

    return {onMouseOver, onMouseLeave};
}
