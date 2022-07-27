import React from 'react';

import {block} from '../utils/cn';
import {Dialog, DialogProps} from '../Dialog';
import {Link} from '../Link';
import {Icon} from '../Icon';
import {ExternalLinkIcon} from '../icons/ExternalLinkIcon';
import {ChangelogItem, OnStoryClick} from './types';
import {Item} from './components/Item/Item';
import i18n from './i18n';

import './ChangelogDialog.scss';

const b = block('changelog-dialog');

export interface ChangelogDialogProps {
    open: boolean;
    title?: string;
    fullListLink?: string;
    items: ChangelogItem[];
    disableBodyScrollLock?: boolean;
    disableOutsideClick?: boolean;
    onClose?: DialogProps['onClose'];
    onStoryClick?: OnStoryClick;
}

export function ChangelogDialog({
    open,
    title = i18n('title'),
    fullListLink,
    items,
    disableBodyScrollLock = true,
    disableOutsideClick,
    onClose,
    onStoryClick,
}: ChangelogDialogProps) {
    const handleClose = React.useCallback<NonNullable<ChangelogDialogProps['onClose']>>(
        (event, reason) => {
            onClose?.(event, reason);
        },
        [onClose],
    );

    return (
        <Dialog
            className={b()}
            open={open}
            onClose={handleClose}
            disableBodyScrollLock={disableBodyScrollLock}
            disableOutsideClick={disableOutsideClick}
        >
            <Dialog.Header caption={title} />
            {fullListLink ? (
                <Dialog.Body>
                    <Link href={fullListLink} target="_blank">
                        <span>{i18n('link_full_list')}</span>
                        <span className={b('full-list-link-icon')}>
                            <Icon data={ExternalLinkIcon} size={14} />
                        </span>
                    </Link>
                </Dialog.Body>
            ) : null}
            <div className={b('items-container')}>
                <Dialog.Body>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <Item
                                key={index}
                                className={b('item')}
                                data={item}
                                onStoryClick={onStoryClick}
                            />
                        ))
                    ) : (
                        <div className={b('empty-placeholder')}>{i18n('label_empty')}</div>
                    )}
                </Dialog.Body>
            </div>
        </Dialog>
    );
}
