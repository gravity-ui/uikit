'use client';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../Button';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {block} from '../utils/cn';

import {CollapseActions} from './components/CollapseActions';
import i18n from './i18n';
import type {ActionsPanelProps} from './types';

import './ActionsPanel.scss';

const b = block('actions-panel');

export const ActionsPanel = ({
    className,
    actions,
    onClose,
    renderNote,
    noteClassName,
    qa,
    maxRowActions,
}: ActionsPanelProps) => {
    const {t} = i18n.useTranslation();
    return (
        <div className={b(null, className)} data-qa={qa}>
            {typeof renderNote === 'function' && (
                <Text
                    className={b('note-wrapper', noteClassName)}
                    as="div"
                    color="light-primary"
                    variant="subheader-2"
                    ellipsis={true}
                >
                    {renderNote()}
                </Text>
            )}
            <CollapseActions actions={actions} maxRowActions={maxRowActions} />
            {typeof onClose === 'function' && (
                <Button
                    view="flat-contrast"
                    size="m"
                    onClick={onClose}
                    className={b('button-close')}
                    aria-label={t('label_close')}
                >
                    <Icon key="icon" data={Xmark} />
                </Button>
            )}
        </div>
    );
};
