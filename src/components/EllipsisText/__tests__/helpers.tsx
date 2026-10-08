import {EllipsisText} from '../EllipsisText';
import type {EllipsisTextProps} from '../EllipsisText';

const wrapDivStyles = {width: '200px', display: 'grid'} as const;

const DEFAULT_TEXT = 'a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz';

export const TestEllipsisText = ({
    children = DEFAULT_TEXT,
    ...props
}: Partial<EllipsisTextProps>) => {
    return (
        <div style={wrapDivStyles}>
            <EllipsisText {...props}>{children}</EllipsisText>
        </div>
    );
};
