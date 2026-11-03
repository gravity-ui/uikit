import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Button, Checkbox, Flex, Sheet, Text, TextInput} from '../../../..';
import type {SheetProps} from '../../../..';
import {cn} from '../../../utils/cn';

import './StickyHeaderShowcase.scss';

const b = cn('sheet-stories-sticky-header-showcase');
const DEFAULT_TITLE = 'Project directory';
const getTitleText = (title: SheetProps['title']) =>
    typeof title === 'string' ? title : DEFAULT_TITLE;

const PROJECTS = Array.from({length: 50}, (_, index) => `Project ${index + 1}`);

export default {
    title: 'Components/Overlays/Sheet',
    component: Sheet,
    argTypes: {title: {control: 'text'}},
    parameters: {
        a11y: {test: 'error'},
        docs: {
            description: {
                story: 'Pass a composed React node through title and enable stickyTitle to pin the heading, input, and extra content together. Use the checkbox to make the title taller than the visible area: it then scrolls with the content until it fits again.',
            },
        },
    },
} as Meta;

export const WithStickyTitleAndHeader: StoryFn<SheetProps> = (args) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [tallTitle, setTallTitle] = React.useState(false);
    const projects = PROJECTS.filter((project) =>
        project.toLowerCase().includes(search.trim().toLowerCase()),
    );

    const header = (
        <Flex
            direction="column"
            gap="spacing-3"
            className={b('header')}
            role="group"
            aria-label={getTitleText(args.title)}
        >
            <Flex alignItems="center" justifyContent="space-between" gap="spacing-3">
                <Text as="h2" variant="subheader-3" className={b('title')}>
                    {getTitleText(args.title)}
                </Text>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </Flex>
            <Text color="secondary">
                {tallTitle
                    ? 'The title is taller than the visible area, so it scrolls with the projects.'
                    : 'Scroll the projects below. This text and the input stay at the top.'}
            </Text>
            <TextInput
                size="l"
                placeholder="Search projects"
                controlProps={{'aria-label': 'Search projects'}}
                value={search}
                onUpdate={setSearch}
                hasClear
            />
            <Checkbox checked={tallTitle} onUpdate={setTallTitle}>
                Use an oversized title
            </Checkbox>
            {tallTitle && (
                <Flex
                    direction="column"
                    justifyContent="space-between"
                    className={b('extra-title-content')}
                >
                    <Text>
                        This additional title content makes the header taller than the viewport.
                    </Text>
                    <Text>End of the title. The project list is below.</Text>
                </Flex>
            )}
            <Text variant="caption-2" color="secondary">
                {projects.length} projects
            </Text>
        </Flex>
    );

    return (
        <React.Fragment>
            <Button onClick={() => setOpen(true)}>Open sheet with sticky header</Button>
            <Sheet {...args} title={header} open={open} onOpenChange={setOpen}>
                <ul className={b('projects')}>
                    {projects.map((project) => (
                        <Flex
                            as="li"
                            key={project}
                            direction="column"
                            gap="spacing-2"
                            className={b('project')}
                        >
                            <Text variant="subheader-1">{project}</Text>
                            <Text color="secondary">
                                Project details scroll underneath the sticky header.
                            </Text>
                        </Flex>
                    ))}
                </ul>
                {projects.length === 0 && (
                    <Text as="p" color="secondary">
                        No projects found. Try another search.
                    </Text>
                )}
            </Sheet>
        </React.Fragment>
    );
};

WithStickyTitleAndHeader.args = {stickyTitle: true};
