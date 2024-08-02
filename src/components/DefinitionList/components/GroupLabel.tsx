import React from 'react';

import {Text} from '../../Text';
import {b} from '../utils';

interface GroupLabelProps {
    label: React.ReactNode;
}

export function GroupLabel({label}: GroupLabelProps) {
    return (
        <div className={b('group-title')}>
            <Text variant="subheader-1" color="complementary">
                {label}
            </Text>
        </div>
    );
}
