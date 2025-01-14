import type {TextProps} from '../Text';
import {Text} from '../Text';

export const TestText = (props: Partial<TextProps>) => {
    return (
        <Text
            // eslint-disable-next-line react/no-children-prop
            children={<span>Text</span>}
            {...props}
        />
    );
};
