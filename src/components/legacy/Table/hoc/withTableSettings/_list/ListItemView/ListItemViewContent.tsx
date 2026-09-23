import {Check} from '@gravity-ui/icons';

import {Icon} from '../../../../../../Icon';
import {Text, colorText} from '../../../../../../Text';
import {Flex} from '../../../../../../layout';
import type {FlexProps} from '../../../../../../layout';
import type {ListItemViewContentType} from '../types';

import {b} from './styles';

const ListItemViewSlot = ({children, className, ...props}: FlexProps) => {
    return (
        <Flex width={16} className={b('slot', className)} {...props}>
            {children}
        </Flex>
    );
};

interface ListItemViewContentProps extends ListItemViewContentType {
    selected?: boolean;
    /**
     * Show selected icon if selected and reserve space for this icon
     */
    hasSelectionIcon: boolean;
}

export const ListItemViewContent = ({
    startSlot,
    endSlot,
    hasSelectionIcon,
    selected,
    title,
}: ListItemViewContentProps) => {
    return (
        <Flex alignItems="center" justifyContent="space-between" gap="4" className={b('content')}>
            <Flex gap="2" alignItems="center" grow>
                {hasSelectionIcon && (
                    <ListItemViewSlot // reserve space
                    >
                        {selected ? (
                            <Icon data={Check} size={16} className={colorText({color: 'info'})} />
                        ) : null}
                    </ListItemViewSlot>
                )}

                {startSlot}

                <div className={b('main-content')}>
                    {typeof title === 'string' ? <Text ellipsis>{title}</Text> : title}
                </div>
            </Flex>

            <Flex gap="2">{endSlot}</Flex>
        </Flex>
    );
};
