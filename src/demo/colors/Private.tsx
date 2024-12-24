import {Showcase} from '../Showcase';

import {ColorTable} from './ColorTable';

interface RenderPrivateProps {
    theme?: string;
}

export function RenderPrivate({theme = 'light'}: RenderPrivateProps) {
    return (
        <Showcase
            title="Basic colors"
            description="Private palette: colors are not for usage in services and components."
        >
            <ColorTable theme={theme} />
        </Showcase>
    );
}
