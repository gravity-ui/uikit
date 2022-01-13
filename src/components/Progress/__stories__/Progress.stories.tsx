import React, {useEffect} from 'react';
import {Meta, Story} from '@storybook/react';
import {Progress, ProgressProps} from '../Progress';

export default {
    title: 'Components/Progress',
    component: Progress,
} as Meta;

const Template: Story<ProgressProps> = (args: any) => <Progress {...args} {...args} />;

export const Default = Template.bind({value: 50});

const ThemeTemplate: Story<ProgressProps> = (args: any) => {
    return (
        <>
            <Progress {...args} value={80} theme="default" text="default" />
            <br />
            <Progress {...args} value={90} theme="success" text="success" />
            <br />
            <Progress {...args} value={70} theme="warning" text="warning" />
            <br />
            <Progress {...args} value={80} theme="danger" text="danger" />
            <br />
            <Progress {...args} value={90} theme="info" text="info" />
            <br />
            <Progress {...args} value={60} theme="misc" text="misc" />
        </>
    );
};

export const Theme = ThemeTemplate.bind({});

const StackTemplate: Story<ProgressProps> = (args: any) => {
    return (
        <>
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
        </>
    );
};

export const Stack = StackTemplate.bind({});

const ViewTemplate: Story<ProgressProps> = (args: any) => {
    return (
        <>
            <Progress {...args} value={80} theme="success" view="normal" />
            <br />
            <Progress {...args} value={60} theme="warning" view="thin" />
            <br />
            <Progress {...args} value={70} theme="danger" view="thinnest" />
        </>
    );
};

export const View = ViewTemplate.bind({});

const defaultState = {value: 40, theme: 'info'};

const AnimationTemplate: Story<ProgressProps> = (args: any) => {
    const [progressState, setProgressState] = React.useState(defaultState);

    useEffect(() => {
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

    return (
        <>
            <Progress {...args} {...progressState} text={`${progressState.value}/100`} />
        </>
    );
};

export const Animation = AnimationTemplate.bind({});
