import {Rocket} from '@gravity-ui/icons';

import type {IconProps} from '../Icon';
import {Icon} from '../Icon';

export const TestIcon = (props: Omit<IconProps, 'data'>) => {
    return <Icon data={Rocket} {...props} />;
};
