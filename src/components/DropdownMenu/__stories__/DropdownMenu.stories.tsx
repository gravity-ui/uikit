import React from 'react';

import {Bars} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react';

import {Icon} from '../../Icon';
import {Label} from '../../Label';
import type {LabelProps} from '../../Label';
import {cn} from '../../utils/cn';
import {DropdownMenu} from '../DropdownMenu';
import type {DropdownMenuItem} from '../DropdownMenu';

import {options, optionsAssorted, optionsWithGroups, optionsWithSubItems} from './options';

import './DropdownMenu.stories.scss';

const b = cn('dropdown-menu-stories');

export default {
    title: 'Components/Overlays/DropdownMenu',
    component: DropdownMenu,
    args: {},
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: false,
                        selector: '.g-dropdown-menu__switcher-button',
                    },
                ],
            },
            options: {},
            // manual: true,
        },
    },
} as Meta;

const DefaultTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const Default: StoryFn<typeof DropdownMenu> = DefaultTemplate.bind({});
Default.args = {
    items: options,
};

// ----------------------------------------
// const WithIconsTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
// export const WithIcons = WithIconsTemplate.bind({});
// WithIcons.args = {
//     items: optionsWithIcons,
// };
// WithIcons.storyName = 'Options with icons';

// ----------------------------------------
const WithGroupsTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const WithGroups = WithGroupsTemplate.bind({});
WithGroups.args = {
    items: optionsWithGroups,
};
WithGroups.storyName = 'Options with groups';

const WithSubmenuTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const WithSubmenu = WithSubmenuTemplate.bind({});
WithSubmenu.args = {
    items: optionsWithSubItems,
};
WithSubmenu.storyName = 'Submenu';

// ----------------------------------------
const AssortedTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const Assorted = AssortedTemplate.bind({});
Assorted.args = {
    items: optionsAssorted,
};
Assorted.storyName = 'Different options for each action';

// ----------------------------------------
const DisabledTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
    items: options,
    disabled: true,
};

// ----------------------------------------
const CustomIconTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const CustomIcon = CustomIconTemplate.bind({});
CustomIcon.args = {
    items: options,
    icon: <Icon data={Bars} />,
};
CustomIcon.storyName = 'Non-standard icon';

// ----------------------------------------
const SwitcherThemeTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const SwitcherTheme = SwitcherThemeTemplate.bind({});
SwitcherTheme.args = {
    items: options,
    defaultSwitcherProps: {theme: 'action'},
};
SwitcherTheme.storyName = 'Icon theme';

// ----------------------------------------
const TextSwitcherTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const TextSwitcher = TextSwitcherTemplate.bind({});
TextSwitcher.args = {
    items: options,
    switcher: <div style={{cursor: 'pointer', fontWeight: 'bold'}}>&nbsp;John Doe&nbsp;</div>,
};
TextSwitcher.parameters = {
    docs: {
        description: {story: "Switcher doesn't have to be an icon"},
    },
};
TextSwitcher.storyName = 'Overwritten switcher';

// ----------------------------------------
const LabelSwitcherTemplate: StoryFn<{statuses: {text: string; style: LabelProps['theme']}[]}> = (
    args,
) => {
    const [status, setStatus] = React.useState<{text: string; style: LabelProps['theme']}>(
        args.statuses[0],
    );

    const items = React.useMemo<DropdownMenuItem<unknown>[]>(() => {
        return args.statuses.map((item) => ({
            action: () => setStatus(item),
            text: item.text,
        }));
    }, [args.statuses, setStatus]);

    return (
        <DropdownMenu
            items={items}
            renderSwitcher={({onClick}) => (
                <Label
                    theme={status.style}
                    className={b('label-switcher-switcher')}
                    onClick={onClick}
                >
                    {status.text}
                </Label>
            )}
            popupProps={{className: b('label-switcher-menu')}}
        />
    );
};

export const LabelSwitcher = LabelSwitcherTemplate.bind({});

LabelSwitcher.args = {
    statuses: [
        {
            text: 'Open',
            style: 'normal',
        },
        {
            text: 'In progress',
            style: 'info',
        },
        {
            text: 'Needs info',
            style: 'warning',
        },
        {
            text: 'Success',
            style: 'success',
        },
        {
            text: 'Approval',
            style: 'danger',
        },
    ],
};

LabelSwitcher.parameters = {
    docs: {
        description: {story: 'Label-style switcher'},
    },
};

LabelSwitcher.storyName = 'Status switch component';

// ----------------------------------------
const SizeTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const Size = SizeTemplate.bind({});
Size.args = {
    items: options,
    size: 'xl',
};

// ----------------------------------------
const MenuSizeTemplate: StoryFn = (args) => <DropdownMenu {...args} />;
export const MenuSize = MenuSizeTemplate.bind({});
MenuSize.args = {
    items: options,
    menuProps: {size: 'l'},
};
