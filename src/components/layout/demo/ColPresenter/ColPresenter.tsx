import {Text} from '../../../Text/Text';
import {Col} from '../../Col/Col';
import type {ColProps} from '../../Col/Col';
import type {ColSize, MediaPartial} from '../../types';
import {Box} from '../Box/Box';

const renderTitle = (size: ColProps['size']) => {
    let defaultSize: ColSize | undefined;
    let mediaConfig: MediaPartial<ColSize> | undefined;

    if (Array.isArray(size)) {
        [defaultSize, mediaConfig] = size;
    } else if (typeof size === 'object') {
        mediaConfig = size;
    } else {
        defaultSize = size;
    }

    let title = defaultSize || 'auto';

    if (mediaConfig) {
        const mediaPart = Object.entries(mediaConfig)
            .reduce<string[]>((acc, [media, value]) => {
                if (value) {
                    acc.push(`${media}=${value}`);
                }
                return acc;
            }, [])
            .join(' ');
        title = `${title} [${mediaPart}]`;
    }

    return title;
};

export const ColPresenter = ({size, ...props}: ColProps) => (
    <Col size={size} {...props}>
        <Box style={{height: '100%'}}>
            <Text variant="code-1" color="complementary">
                {renderTitle(size)}
            </Text>
        </Box>
    </Col>
);
