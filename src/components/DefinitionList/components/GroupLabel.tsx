import React from 'react';

import {Text} from '../../Text';
import {b} from '../utils';

interface GroupLabelProps {
    label: React.ReactNode;
    className?: string;
}

export function GroupLabel({label, className}: GroupLabelProps) {
    return (
        <div className={b('group-title', className)}>
            <Text variant="subheader-1" color="complementary">
                {label}
            </Text>
        </div>
    );
}
