import {useCallback, useEffect} from 'react';
import type {Dispatch, SetStateAction} from 'react';

import {useConditionallyControlledState} from '../../utils/useConditionallyControlledState';

export function usePopupVisibility(
    visible?: boolean,
    onChangeVisibility?: Dispatch<SetStateAction<boolean>> | ((visible: boolean) => void),
    disabled?: boolean,
) {
    const [isPopupShown, setPopupShown] = useConditionallyControlledState<boolean>(
        visible,
        onChangeVisibility,
        false,
    );

    const togglePopup = useCallback(
        (open?: boolean) => {
            setPopupShown((isShown) => {
                if (typeof open === 'boolean') {
                    return open;
                }

                return !isShown;
            });
        },
        [setPopupShown],
    );

    const closePopup = useCallback(() => {
        setPopupShown(false);
    }, [setPopupShown]);

    useEffect(() => {
        if (disabled && isPopupShown) {
            closePopup();
        }
    }, [closePopup, disabled, isPopupShown]);

    return {
        isPopupShown,
        togglePopup,
        closePopup,
    };
}
