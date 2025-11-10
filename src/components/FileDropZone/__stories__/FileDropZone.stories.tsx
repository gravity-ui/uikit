import {DatabaseFill, FolderOpenFill, HeartCrack} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Text} from '../..';
import {FileDropZone} from '../FileDropZone';
import type {FileDropZoneProps} from '../FileDropZone';

export default {
    title: 'Components/Inputs/FileDropZone',
    component: FileDropZone,
    args: {},
    argTypes: {
        states: {table: {disable: true}},
    },
} as Meta;

const handleAdd = (files: File[]) => {
    const msg = `Files: ${files.map(({name}) => name).join(', ')}`;

    alert(msg);
};

const BASE_ARGS = {
    accept: ['image/*'],
    onAdd: handleAdd,
};

const DefaultTemplate: StoryFn<typeof FileDropZone> = (args) => {
    return <FileDropZone {...args} />;
};

export const Default: StoryFn<typeof FileDropZone> = DefaultTemplate.bind({});
Default.args = BASE_ARGS;

export const CustomTexts: StoryFn<typeof FileDropZone> = DefaultTemplate.bind({});
CustomTexts.args = {
    ...BASE_ARGS,
    title: 'Lorem ipsum dolor sit amet',
    description: 'Duis consequat commodo eros sit',
    buttonText: 'Upload',
};

export const Disabled: StoryFn<typeof FileDropZone> = DefaultTemplate.bind({});
Disabled.args = {
    ...BASE_ARGS,
    disabled: true,
};

const MultipleStatesTemplate = ({
    states,
    ...props
}: FileDropZoneProps & {states: {title: string; itemProps: Partial<FileDropZoneProps>}[]}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
            {states.map(({title, itemProps}) => (
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}} key={title}>
                    <Text variant="subheader-2">{title}</Text>
                    <FileDropZone {...props} {...itemProps} />
                </div>
            ))}
        </div>
    );
};

export const Errors: StoryFn<typeof MultipleStatesTemplate> = MultipleStatesTemplate.bind({});
Errors.args = {
    ...BASE_ARGS,
    states: [
        {
            title: 'With Error Message',
            itemProps: {errorMessage: 'Unknown error has occurred'},
        },
        {
            title: 'With Validation State Error',
            itemProps: {validationState: 'invalid'},
        },
    ],
};

export const Icons: StoryFn<typeof MultipleStatesTemplate> = MultipleStatesTemplate.bind({});
Icons.args = {
    ...BASE_ARGS,
    states: [
        {
            title: 'No Icon',
            itemProps: {icon: null},
        },
        {
            title: 'Custom Icon',
            itemProps: {icon: DatabaseFill},
        },
        {
            title: 'No Error Icon',
            itemProps: {errorIcon: null, errorMessage: 'Unknown error has occurred'},
        },
        {
            title: 'Custom Error Icon',
            itemProps: {errorIcon: HeartCrack, errorMessage: 'Unknown error has occurred'},
        },
    ],
};

const CustomLayoutTemplate: StoryFn<typeof FileDropZone> = (args) => {
    return (
        <FileDropZone {...args}>
            <div
                style={{
                    flexGrow: '1',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '32px',
                    }}
                >
                    <FileDropZone.Icon />
                    <div
                        style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}
                    >
                        <FileDropZone.Title />
                        <FileDropZone.Description />
                    </div>
                </div>
                <div style={{marginLeft: '16px'}}>
                    <FileDropZone.Button />
                </div>
            </div>
        </FileDropZone>
    );
};
export const CustomLayout = CustomLayoutTemplate.bind({});
CustomLayout.args = {
    ...BASE_ARGS,
    title: 'Lorem ipsum dolor sit amet',
    description: 'Duis consequat commodo eros sit',
    buttonText: 'Upload',
    icon: FolderOpenFill,
};
