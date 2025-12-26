import * as React from 'react';

import {block} from '../utils/cn';

import './Popup.scss';

const b = block('popup');

interface PopupArrowProps {
    styles: React.CSSProperties;
}

export const PopupArrow = React.forwardRef<HTMLDivElement, PopupArrowProps>(function PopupArrow(
    {styles},
    ref,
) {
    return <div ref={ref} className={b('arrow')} style={styles} />;
});
