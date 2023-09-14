/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import {useOutsideClick} from '../useOutsideClick';

export const Demo = () => {
    const observerRef = React.useRef(null);
    const [status, setStatus] = React.useState<1 | 0>(0);

    const handleOutsideClick = () => {
        setStatus(0);
    };

    const handleClick = () => {
        setStatus(1);
    };

    useOutsideClick({
        ref: observerRef,
        handler: handleOutsideClick,
    });

    return (
        <div>
            <h1>{status}</h1>
            <div ref={observerRef} onClick={handleClick}>
                {'Target'}
            </div>
            <div>{'Outside'}</div>
        </div>
    );
};
