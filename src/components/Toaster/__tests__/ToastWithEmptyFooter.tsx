import type * as React from 'react';

import {ToastStories} from './helpersPlaywright';

export function ToastWithEmptyFooter({padding, title}: {padding: string; title: string}) {
    return (
        <div style={{'--g-toaster-item-padding': padding} as React.CSSProperties}>
            <ToastStories.ToastPlayground
                title={title}
                content={undefined}
                actions={undefined}
                theme="normal"
                isClosable={false}
                renderFooter={() => null}
            />
        </div>
    );
}
