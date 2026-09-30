import {CircleExclamation, Link, TrashBin} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {MobileProvider} from '../../mobile';
import {FilePreview} from '../FilePreview';

const actions = [
    {icon: <Icon data={Link} size={16} />, title: 'Copy link'},
    {icon: <Icon data={CircleExclamation} size={16} />, title: 'Report a problem'},
    {icon: <Icon data={TrashBin} size={16} />, title: 'Delete'},
];

export const MobileFilePreview = () => (
    <MobileProvider mobile>
        <FilePreview file={{name: 'Some file name', type: 'image/png'} as File} actions={actions} />
    </MobileProvider>
);
