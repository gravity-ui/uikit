import {ClipboardButton} from '../../ClipboardButton';
import {b} from '../constants';
import type {DefinitionListItemProps} from '../types';

interface DefinitionProps extends Pick<DefinitionListItemProps, 'copyText' | 'children'> {}

export function DefinitionContent({copyText, children}: DefinitionProps) {
    const definitionContent = children ?? '—';

    return copyText ? (
        <div className={b('copy-container')}>
            {definitionContent}
            <ClipboardButton
                size="s"
                text={copyText}
                className={b('copy-button')}
                view={'flat-secondary'}
            />
        </div>
    ) : (
        definitionContent
    );
}
