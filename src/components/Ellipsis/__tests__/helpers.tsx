import {Ellipsis} from '../Ellipsis';
import type {EllipsisProps} from '../Ellipsis';

const wrapDivStyles = {width: '200px'} as const;

const DEFAULT_TEXT = 'a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz';

export const TestEllipsis = ({children = DEFAULT_TEXT, ...props}: Partial<EllipsisProps>) => {
    return (
        <div style={wrapDivStyles}>
            <Ellipsis {...props} style={{width: '100%'}}>
                {children}
            </Ellipsis>
        </div>
    );
};
