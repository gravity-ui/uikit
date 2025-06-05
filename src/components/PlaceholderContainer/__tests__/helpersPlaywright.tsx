import {composeStories} from '@storybook/react-webpack5';

import {PlaceholderContainer} from '../PlaceholderContainer';
import * as stories from '../__stories__/PlaceholderContainer.stories';
import type {PlaceholderContainerProps} from '../types';

export const PlaceholderContainerStories = composeStories(stories);

export type TestPlaceholderContainerProps = Omit<PlaceholderContainerProps, 'image'>;

const TestImageComponent = () => {
    return (
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#DDDDDD" height="100%" transform="matrix(1 0 0 1 0 0)" width="100%" />
        </svg>
    );
};

export const TestPlaceholderContainerWithImage = (props: TestPlaceholderContainerProps) => {
    return <PlaceholderContainer image={<TestImageComponent />} {...props} />;
};
