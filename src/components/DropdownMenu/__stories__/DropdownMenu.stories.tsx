import React from 'react';
import block from 'bem-cn-lite';
import {Meta, Story} from '@storybook/react';
import {DropdownMenu, DropdownMenuItem} from '../DropdownMenu';
import {Label, LabelProps} from '../../Label';
import {Icon} from '../../Icon';
import {GearIcon} from '../../icons/GearIcon';
import {options, optionsWithGroups, optionsWithSubItems, optionsAssorted} from './options';
import './DropdownMenu.stories.scss';

const b = block('dropdown-menu-stories');

export default {
    title: 'Components/DropdownMenu',
    component: DropdownMenu,
    args: {},
} as Meta;

const DefaultTemplate: Story = (args) => <DropdownMenu {...args} rowActionsSize="xl" />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    items: options,
};

// ----------------------------------------
// const WithIconsTemplate: Story = (args) => <DropdownMenu {...args} />;
// export const WithIcons = WithIconsTemplate.bind({});
// WithIcons.args = {
//     items: optionsWithIcons,
// };
// WithIcons.storyName = 'Options with icons';

// ----------------------------------------
const WithGroupsTemplate: Story = (args) => <DropdownMenu {...args} rowActionsSize="l" />;
export const WithGroups = WithGroupsTemplate.bind({});
WithGroups.args = {
    items: optionsWithGroups,
};
WithGroups.storyName = 'Options with groups';

const WithSubmenuTemplate: Story = (args) => <DropdownMenu {...args} rowActionsSize="m" />;
export const WithSubmenu = WithSubmenuTemplate.bind({});
WithSubmenu.args = {
    items: optionsWithSubItems,
};
WithSubmenu.storyName = 'Submenu';

// ----------------------------------------
const AssortedTemplate: Story = (args) => <DropdownMenu {...args} rowActionsSize="s" />;
export const Assorted = AssortedTemplate.bind({});
Assorted.args = {
    items: optionsAssorted,
};
Assorted.storyName = 'Different options for each action';

// ----------------------------------------
const DisabledTemplate: Story = (args) => <DropdownMenu {...args} rowActionsSize="m" />;
export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
    items: options,
    disabled: true,
};

// ----------------------------------------
const CustomIconTemplate: Story = (args) => <DropdownMenu {...args} rowActionsSize="l" />;
export const CustomIcon = CustomIconTemplate.bind({});
CustomIcon.args = {
    items: options,
    icon: <Icon data={GearIcon} />,
};
CustomIcon.storyName = 'Non-standard icon';

// ----------------------------------------
const SwitcherThemeTemplate: Story = (args) => <DropdownMenu {...args} rowActionsSize="xl" />;
export const SwitcherTheme = SwitcherThemeTemplate.bind({});
SwitcherTheme.args = {
    items: options,
    defaultSwitcherProps: {theme: 'action'},
};
SwitcherTheme.storyName = 'Icon theme';

// ----------------------------------------
const TextSwitcherTemplate: Story = (args) => <DropdownMenu {...args} />;
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
const LabelSwitcherTemplate: Story<{statuses: {text: string; style: LabelProps['theme']}[]}> = (
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
            switcher={
                <Label theme={status.style} className={b('label-switcher-switcher')}>
                    {status.text}
                </Label>
            }
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
const SizeTemplate: Story = (args) => <DropdownMenu {...args} />;
export const Size = SizeTemplate.bind({});
Size.args = {
    items: options,
    size: 'xl',
};

// ----------------------------------------
const MenuSizeTemplate: Story = (args) => <DropdownMenu {...args} />;
export const MenuSize = MenuSizeTemplate.bind({});
MenuSize.args = {
    items: options,
    menuProps: {size: 'l'},
};
