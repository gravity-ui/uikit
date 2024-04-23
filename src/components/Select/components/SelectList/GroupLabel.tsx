import React from 'react';

import {Text} from '../../../Text';
import {block} from '../../../utils/cn';
import type {GroupTitleItem} from '../../utils';

const b = block('select-list');

type GroupLabelProps = {
    option: GroupTitleItem;
    newListNew?: boolean;
    renderOptionGroup?: (option: GroupTitleItem) => React.ReactElement;
};

export const GroupLabel = ({option, renderOptionGroup, newListNew}: GroupLabelProps) => {
    if (renderOptionGroup) {
        return <div className={b('group-label-custom')}>{renderOptionGroup(option)}</div>;
    } else if (newListNew) {
        return (
            <Text variant="subheader-1" ellipsis>
                {option.label}
            </Text>
        );
    } else {
        return (
            <div className={b('group-label', {empty: option.label === ''})}>
                <div className={b('group-label-content')}>{option.label}</div>
            </div>
        );
    }
};
