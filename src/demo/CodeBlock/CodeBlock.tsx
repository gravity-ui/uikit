import {ClipboardButton} from '../../components';
import {cn} from '../../components/utils/cn';

import './CodeBlock.scss';

interface CodeBlockProps {
    code: string;
    className?: string;
}

const b = cn('code-block');

export function CodeBlock({code, className}: CodeBlockProps) {
    return (
        <div className={b(null, className)}>
            <pre className={b('code')}>{code}</pre>
            <ClipboardButton text={code} view="flat" size="xs" className={b('copy-button')} />
        </div>
    );
}
