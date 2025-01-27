import * as React from 'react';

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
            <button ref={observerRef} onClick={handleClick}>
                {'Target'}
            </button>
            <div>{'Outside'}</div>
        </div>
    );
};
