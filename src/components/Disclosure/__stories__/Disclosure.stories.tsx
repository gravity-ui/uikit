import {Check} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Label} from '../../Label';
import {Flex} from '../../layout/index';
import type {DisclosureProps} from '../index';
import {Disclosure} from '../index';

import './Disclosure.stories.scss';

export default {
    title: 'Components/Data Display/Disclosure',
    component: Disclosure,
    args: {
        children: 'Default content',
        summary: 'Default summary',
        size: 'm',
        disabled: false,
        arrowPosition: 'start',
        qa: 'disclosure',
    },
} as Meta;

const DefaultTemplate: StoryFn<DisclosureProps> = (args) => <Disclosure {...args} />;

export const Default = DefaultTemplate.bind({});

const SizeTemplate: StoryFn<DisclosureProps> = (args) => {
    return (
        <div className="disclosure-stories">
            <Disclosure {...args} size="m">
                m
            </Disclosure>
            <Disclosure {...args} size="l">
                l
            </Disclosure>
            <Disclosure {...args} size="xl">
                xl
            </Disclosure>
        </div>
    );
};

export const Size = SizeTemplate.bind({});

const ArrowPositionTemplate: StoryFn<DisclosureProps> = (args) => {
    return (
        <div className="disclosure-stories">
            <Disclosure {...args} arrowPosition="start" />
            <Disclosure {...args} arrowPosition="end" />
        </div>
    );
};

export const ArrowPosition = ArrowPositionTemplate.bind({});

const CustomTemplate: StoryFn<DisclosureProps> = (args) => {
    return (
        <div className="disclosure-stories">
            <Disclosure {...args}>
                <Disclosure.Summary>
                    {(props) => (
                        <Button {...props}>
                            <Icon data={Check} size={14} />
                            Custom summary
                            <Icon data={Check} size={14} />
                        </Button>
                    )}
                </Disclosure.Summary>
                <div>Custom details</div>
                <div>More custom details</div>
            </Disclosure>
            <Disclosure {...args}>
                <Disclosure.Summary>
                    {(props) => <Button {...props}>Without content</Button>}
                </Disclosure.Summary>
            </Disclosure>
            <Disclosure {...args}>
                <Disclosure.Summary>
                    {(_props, defaultButton) => (
                        <Flex gap={4}>
                            {defaultButton}
                            <Icon data={Check} size={14} />
                        </Flex>
                    )}
                </Disclosure.Summary>
                Details
            </Disclosure>
            <Disclosure {...args} summary={<Label>Default node summary</Label>} />
        </div>
    );
};

export const Custom = CustomTemplate.bind({});
