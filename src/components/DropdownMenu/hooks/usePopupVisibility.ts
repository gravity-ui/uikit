import * as React from 'react';

import {useConditionallyControlledState} from '../../../hooks/private';

export function usePopupVisibility(
    visible?: boolean,
    onChangeVisibility?:
        | React.Dispatch<React.SetStateAction<boolean>>
        | ((visible: boolean) => void),
    disabled?: boolean,
) {
    const [isPopupShown, setPopupShown] = useConditionallyControlledState<boolean>(
        visible,
        onChangeVisibility,
        false,
    );

    const togglePopup = React.useCallback(
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

    const closePopup = React.useCallback(() => {
        setPopupShown(false);
    }, [setPopupShown]);

    React.useEffect(() => {
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
