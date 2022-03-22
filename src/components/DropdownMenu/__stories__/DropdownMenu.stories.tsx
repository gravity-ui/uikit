import React from 'react';
import block from 'bem-cn-lite';
import {Meta, Story} from '@storybook/react';
import {DropdownMenu, DropdownMenuItem} from '../DropdownMenu';
import {Label, LabelProps} from '../../Label';
import {Icon} from '../../Icon';
import {GearIcon} from '../../icons/GearIcon';
import {options, optionsWithGroups, optionsAssorted} from './options';
import './DropdownMenu.stories.scss';

const b = block('dropdown-menu-stories');

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
    icon: <Icon data={GearIcon} />,
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
            popupClassName={b('label-switcher-menu')}
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
            text: 'In Work',
            style: 'info',
        },
        {
            text: 'Need info',
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
        description: {story: 'Свитчер в виде Label'},
    },
};

LabelSwitcher.storyName = 'Компонент смены статуса';

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
    defaultMenuProps: {size: 'l'},
};
