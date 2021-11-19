import React from 'react';
import {Meta, Story} from '@storybook/react';
import {DropdownMenu} from '../DropdownMenu';
import {Icon} from '../../Icon';
import gearIcon from '../../../../assets/icons/gear.svg';
import {options, optionsWithGroups, optionsAssorted} from './options';

export default {
    title: 'Components/DropdownMenu',
    component: DropdownMenu,
    args: {
        ...DropdownMenu.defaultProps, // без этого компонент в defaultProps отображается как строка
    },
} as Meta;

const DefaultTemplate: Story = (args) => <DropdownMenu {...args} />;
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
// WithIcons.storyName = 'Опции с иконками';

// ----------------------------------------
const WithGroupsTemplate: Story = (args) => <DropdownMenu {...args} />;
export const WithGroups = WithGroupsTemplate.bind({});
WithGroups.args = {
    items: optionsWithGroups,
};
WithGroups.storyName = 'Опции с группами';

// ----------------------------------------
const AssortedTemplate: Story = (args) => <DropdownMenu {...args} />;
export const Assorted = AssortedTemplate.bind({});
Assorted.args = {
    items: optionsAssorted,
};
Assorted.storyName = 'Разные опции для пунктов';

// ----------------------------------------
const DisabledTemplate: Story = (args) => <DropdownMenu {...args} />;
export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
    items: options,
    disabled: true,
};

// ----------------------------------------
const CustomIconTemplate: Story = (args) => <DropdownMenu {...args} />;
export const CustomIcon = CustomIconTemplate.bind({});
CustomIcon.args = {
    items: options,
    icon: <Icon data={gearIcon} />,
};
CustomIcon.storyName = 'Переопределённая иконка';

// ----------------------------------------
const SwitcherThemeTemplate: Story = (args) => <DropdownMenu {...args} />;
export const SwitcherTheme = SwitcherThemeTemplate.bind({});
SwitcherTheme.args = {
    items: options,
    defaultSwitcherProps: {theme: 'action'},
};
SwitcherTheme.storyName = 'Тема иконки';

// ----------------------------------------
const TextSwitcherTemplate: Story = (args) => <DropdownMenu {...args} />;
export const TextSwitcher = TextSwitcherTemplate.bind({});
TextSwitcher.args = {
    items: options,
    switcher: <div style={{cursor: 'pointer', fontWeight: 'bold'}}>&nbsp;Иван Иванов&nbsp;</div>,
};
TextSwitcher.parameters = {
    docs: {
        description: {story: 'Свитчер не обязательно должен быть иконкой'},
    },
};
TextSwitcher.storyName = 'Переопределённый свитчер';
