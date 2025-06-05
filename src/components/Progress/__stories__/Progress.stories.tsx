import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Progress} from '../Progress';
import type {ProgressTheme} from '../types';

export default {
    title: 'Components/Feedback/Progress',
    component: Progress,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

const Template: StoryFn<typeof Progress> = (args) => <Progress {...args} {...args} />;

export const Default = Template.bind({value: 50});

const ThemeTemplate: StoryFn<typeof Progress> = (args) => {
    return (
        <React.Fragment>
            <Progress {...args} value={50} theme="default" text="default" />
            <br />
            <Progress {...args} value={50} theme="success" text="success" />
            <br />
            <Progress {...args} value={50} theme="warning" text="warning" />
            <br />
            <Progress {...args} value={50} theme="danger" text="danger" />
            <br />
            <Progress {...args} value={50} theme="info" text="info" />
            <br />
            <Progress {...args} value={50} theme="misc" text="misc" />
        </React.Fragment>
    );
};

export const Theme = ThemeTemplate.bind({});

export const Custom: StoryFn<typeof Progress> = (args) => {
    return (
        <React.Fragment>
            <style>
                {`.g-root {
                    --g-progress-empty-text-color: var(--g-color-text-primary);
                    --g-progress-filled-text-color:  var(--g-color-text-light-primary);
                    --g-progress-empty-background-color: var(--branding-base-selection, rgba(82, 130, 255, 0.15));
                    --g-progress-filled-background-color: #5282FF;
                }`}
            </style>
            <Progress {...args} value={50} text="custom" />
        </React.Fragment>
    );
};

const StackTemplate: StoryFn<typeof Progress> = (args) => {
    return (
        <React.Fragment>
            <Progress
                {...args}
                stack={[
                    {value: 20, theme: 'default'},
                    {value: 20, theme: 'success'},
                    {value: 20, theme: 'warning'},
                    {value: 20, theme: 'danger'},
                    {value: 20, theme: 'info'},
                ]}
            />
            <br />
            <Progress
                {...args}
                stack={[
                    {value: 100 / 3, color: 'red'},
                    {value: 100 / 3, color: 'green'},
                    {value: 100 / 3, color: 'pink'},
                ]}
                text="Progress with custom colors"
            />
            <br />
            <Progress
                {...args}
                stack={[
                    {value: 25, theme: 'default', content: 'First'},
                    {value: 25, theme: 'success', content: 'Second'},
                    {value: 25, theme: 'warning', content: 'Third'},
                    {value: 25, theme: 'danger', content: 'Fourth'},
                ]}
            />
            <br />
        </React.Fragment>
    );
};

export const Stack = StackTemplate.bind({});

const SizeTemplate: StoryFn<typeof Progress> = (args) => {
    return (
        <React.Fragment>
            <Progress {...args} value={80} theme="success" size="m" />
            <br />
            <Progress {...args} value={60} theme="warning" size="s" />
            <br />
            <Progress {...args} value={70} theme="danger" size="xs" />
        </React.Fragment>
    );
};

export const Size = SizeTemplate.bind({});

const defaultState: {value: number; theme: ProgressTheme} = {value: 40, theme: 'info'};

const AnimationTemplate: StoryFn<typeof Progress> = (args) => {
    const [progressState, setProgressState] = React.useState(defaultState);

    React.useEffect(() => {
        let timerId: number;

        function next(timeout = 2000) {
            timerId = window.setTimeout(() => {
                setProgressState(({value: prevValue, theme: prevTheme}) => {
                    if (prevValue === 100) {
                        return defaultState;
                    }

                    const value = Math.min(prevValue + 20, 100);
                    const theme = value === 100 ? 'success' : prevTheme;

                    return {value, theme};
                });
                next();
            }, timeout);
        }

        next();

        return () => window.clearTimeout(timerId);
    }, []);

    return <Progress {...args} {...progressState} text={`${progressState.value}/100`} />;
};

export const Animation = AnimationTemplate.bind({});
