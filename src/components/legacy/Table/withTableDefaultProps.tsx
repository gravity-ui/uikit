import * as React from 'react';

import {useDefaultProps} from '../../theme/useDefaultProps';
import {getComponentName} from '../../utils/getComponentName';

import type {TableProps} from './Table';

// Applied to Table and to every HOC layer: HOCs compute row ids from their own props.
export function withTableDefaultProps<P extends TableProps<any>>(
    Component: React.ComponentType<P>,
) {
    function TableWithDefaultProps(rawProps: P) {
        const props = useDefaultProps('Table', rawProps);
        return <Component {...props} />;
    }
    TableWithDefaultProps.displayName = getComponentName(Component);

    return TableWithDefaultProps;
}
