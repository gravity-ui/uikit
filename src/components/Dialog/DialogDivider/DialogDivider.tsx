import {block} from '../../utils/cn';

import './DialogDivider.scss';

const b = block('dialog-divider');

export interface DialogDividerProps {
    className?: string;
}

export function DialogDivider({className}: DialogDividerProps) {
    return <div className={b(null, className)} />;
}
