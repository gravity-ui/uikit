import {ClipboardButton} from '../../components';
import {cn} from '../../components/utils/cn';

import './CodeBlock.scss';

interface CodeBlockProps {
    code: string;
}

const b = cn('code-block');

export function CodeBlock({code}: CodeBlockProps) {
    return (
        <div className={b()}>
            <pre className={b('code')}>{code}</pre>
            <ClipboardButton text={code} view="flat" size="xs" />
        </div>
    );
}
