import React from 'react';

import {Text} from '../../../Text';
import {block} from '../../../utils/cn';
import type {GroupTitleItem} from '../../utils';

const b = block('select-list');

type GroupLabelProps = {
    option: GroupTitleItem;
    renderOptionGroup?: (option: GroupTitleItem) => React.ReactElement;
};

export const GroupLabel = ({option, renderOptionGroup}: GroupLabelProps) => {
    if (renderOptionGroup) {
        return <div className={b('group-label-custom')}>{renderOptionGroup(option)}</div>;
    } else {
        return (
            <Text variant="subheader-1" ellipsis>
                {option.label}
            </Text>
        );
    }
};
